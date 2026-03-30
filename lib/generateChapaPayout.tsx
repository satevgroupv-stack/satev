import { MAIN_URL } from "@/constants";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_API_KEY;
// console.log("Chapa API Key:", CHAPA_AUTH);


function generateTransactionReference() {
  return `tx_ref_${uuidv4()}`;
}


export default async function generateChapaPayout(
  amount: string,
  metaData: Record<string, any> | null = null,
  machineId: string 
) {
  const tx_ref = generateTransactionReference();
  const CHAPA_CALLBACK_URL = MAIN_URL + `/${machineId}` + "/payment-status/" + tx_ref; // Update this to your actual callback URL

  const data = {
    amount: `${amount}`,
    currency:"ETB",
    callback_url: CHAPA_CALLBACK_URL ,
    return_url: CHAPA_CALLBACK_URL,
    meta: metaData,
    tx_ref: tx_ref,
  };

  try {
    const chapaResponse = await axios.post(CHAPA_URL, data, {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
        "Content-Type": "application/json",
      },
    });
    return {chapaResponse:chapaResponse.data,tx_ref};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error initializing Chapa transaction:", error.response?.data?.message);
    } else {
      console.log("Error initializing Chapa transaction:", error);
    }
    console.log(error)
  }
}