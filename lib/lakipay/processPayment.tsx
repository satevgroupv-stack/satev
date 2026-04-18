import { MAIN_URL } from "@/constants";
import { LakipaySDK } from "lakipay-js-sdk";

import axios from "axios";
const LAKIPAY_API_KEY = process.env.LAKIPAY_API_KEY || "";

const callback_url = MAIN_URL + "/api/lakipay/webhook";


export default async function processLakipayPayment({redirect, amount, reference}: {redirect: string, amount: number, reference: string }) {
  const success = `${redirect}/success`;
  const failed = `${redirect}/failed`;

  try {
      const res =  await axios.post("https://api.lakipay.co/api/v2/payment/checkout",{
  amount: amount,
  currency: "ETB",
  description: "Payment for order #123",
  reference: reference,
  phone_number: "",
  callback_url: callback_url,
  redirects: {
    success,
    failed,
  },
  supported_mediums: ["MPESA", "TELEBIRR", "CBE"],
},{
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': LAKIPAY_API_KEY
        }
      });
      console.log("Lakipay API response:", res);
      const data = res.data;
      return data;
  } catch (error) {
    console.log("Error processing LakiPay payment:", error);
  }
}
