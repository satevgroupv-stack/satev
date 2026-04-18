import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";

/**
 * POST /api/payment/status
 * body: { txRef: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txRef } = body;

    if (!txRef) {
      return NextResponse.json(
        { error: "txRef is required" },
        { status: 400 }
      );
    }

    // 🔌 connect DB
    await connectDB();

    // 🔍 find order
    const order = await Order.findOne({ txRef });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 💰 check payment status
    const isSuccess = order.paymentStatus === "sucess";

    return NextResponse.json({
      txRef,
      paymentStatus: order.paymentStatus,
      isSuccess,
    });
  } catch (err) {
    console.error("Payment status error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}