import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";





/**
 * ✅ Load key (NO formatting needed)
 */
const PUBLIC_KEY = process.env.LAKIPAY_PUBLIC_KEY;

if (!PUBLIC_KEY ) {
  throw new Error("LAKIPAY_PUBLIC_KEY is missing");
}

/**
 * ✅ Convert PEM → DER → KeyObject (bypasses OpenSSL bug)
 */
function getKeyObject(pem: string) {
  const cleaned = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s+/g, "");

  const der = Buffer.from(cleaned, "base64");

  return crypto.createPublicKey({
    key: der,
    format: "der",
    type: "spki",
  });
}

/**
 * ✅ FINAL verify function (this will work)
 */
function verifyWebhook(
  canonical: string,
  signature: string
): boolean {
  try {
    const keyObject = getKeyObject(PUBLIC_KEY as string);

    const verify = crypto.createVerify("RSA-SHA256");
    verify.update(canonical, "utf8");
    verify.end();

    return verify.verify(keyObject, signature.trim(), "base64");
  } catch (err) {
    console.error("Verification error:", err);
    return false;
  }
}


/**
 * Webhook handler
 */

export async function POST(req: NextRequest) {
  try {
    // 1. Get raw body
    const rawBody = await req.text();

    // 2. Parse JSON
    const body = JSON.parse(rawBody);

    console.log("Body:", body);

    // 3. Extract signature
    const signature = body.signature;

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // 4. Build canonical string (IMPORTANT: exclude signature)
    const canonical = Object.keys(body)
      .filter((key) => key !== "signature")
      .sort()
      .map((key) => {
        const value = body[key];

        // ensure consistent serialization
        return `${key}=${typeof value === "object" ? JSON.stringify(value) : value}`;
      })
      .join("&");

    // 5. VERIFY SIGNATURE
    const isValid = verifyWebhook(canonical, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    console.log("✅ Verified webhook");

    // 6. Extract correct fields (MATCH YOUR PAYLOAD)
    const {
      event,
      status,
      amount,
      providerTxId,
      referenceId,
      userId,
      timestamp,
    } = body;

    // 7. Handle successful deposit only
    if (event === "DEPOSIT" && status === "SUCCESS") {
      await connectDB();

      const updatedOrder = await Order.updateOne(
        { txRef: referenceId }, // FIXED: referenceId (not reference)
        {
          $set: {
            paymentStatus: "success",
            transactionId: providerTxId, // FIXED
            amount: Number(amount),
            userId,
            updatedAt: new Date(timestamp),
          },
        }
      );

      console.log("💰 Order updated:", updatedOrder);

      return NextResponse.json({ received: true });
    }

    // Always acknowledge webhook
    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("Webhook error:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}