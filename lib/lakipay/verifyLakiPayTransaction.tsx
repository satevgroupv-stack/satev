import Order from "@/models/Order";
import axios from "axios";
const LAKIPAY_API_KEY = process.env.LAKIPAY_API_KEY || "";

export default async function verifyLakiPayTransaction(txRef: string) {
  try {
     const order = await Order.findOne({ txRef });
      if(!order) {
        console.log("Order not found for txRef:", txRef);
        return false;
      }
      console.log("Order found for txRef:", txRef, "with paymentStatus:", order.paymentStatus);
      if(order.paymentStatus.includes("success")) {
        console.log("Order already marked as paid for txRef:", txRef);
        return true;
      }
      console.log("Verifying LakiPay transaction with ID:", order.lakipayTransactionId);
    
       const res =  await axios.get(`https://api.lakipay.co/api/v2/payment/transaction/${order.lakipayTransactionId}`,{
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': LAKIPAY_API_KEY
        }
      });
     

      console.log("Lakipay transaction verification response:", res.data);
      return res.data.status === "SUCCESS";
  } catch (error) {
    console.log("Error verifying LakiPay transaction:");
    if(axios.isAxiosError(error)) {
      console.log("Axios error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.log("Non-Axios error:", error);
    }
    return false;
  }

    }