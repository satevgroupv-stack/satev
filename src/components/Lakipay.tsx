"use client";
import { CHECKOUT_CART } from "@/constants";
import { Dialog } from "@headlessui/react";

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type PaymentMethod = "TELEBIRR" | "MPESA" | "CBE";

interface MethodItem {
  name: PaymentMethod;
  logo: string;
}
interface Props {
  id?: string;

}
export default function LakiPaymentPage({ id }: Props) {
      const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("TELEBIRR");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    




    const cartString = localStorage.getItem(CHECKOUT_CART); 
    console.log("Cart string:", cartString);
    if (!cartString) {
      console.log("No cart found");
      return;
    }
    const toastId = toast.loading("Processing payment with LAKIPAY...");
    const cartData = JSON.parse(cartString).cart;
    console.log("Cart data:", cartData);
    if(!cartData){
      toast.error("Cart is empty");
      return;
    }
    const payload = {
      method,
      phone,
    };
    
    const response = await axios.post("/api/buy", { cart: cartData,machine: id,method:"LAKIPAY", payload });
    const data = response.data;
    const message = data?.message || "Payment initiated successfully";
    console.log("Submitting:", payload);
    toast.dismiss(toastId);
    const sucessToastId = toast.success(message);
    setTimeout(() => {
      toast.dismiss(sucessToastId);
    }, 5000);

    // const verificationToastId = toast.loading("Waiting for payment confirmation...");
    setOpen(true)

    

  };

  const methods: MethodItem[] = [
    {
      name: "TELEBIRR",
      logo: "https://images.sftcdn.net/images/t_app-icon-s/p/6ef58b81-d4cb-4309-b7d9-0228be98241e/3255978048/telebirr-logo",
    },
    {
      name: "MPESA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg",
    },
    {
      name: "CBE",
      logo: "https://play-lh.googleusercontent.com/rcSKabjkP2GfX1_I_VXBfhQIPdn_HPXj5kbkDoL4cu5lpvcqPsGmCqfqxaRrSI9h5_A=w480-h960-rw",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div
        className="w-full max-w-md rounded-3xl shadow-2xl p-8 text-center border border-white/20"
        style={{ background: "#1e2937" }}
      >
        <h2 className="text-2xl font-bold text-[#D9D9D9] mb-6">
          Select Payment Method 
        </h2>

        {/* METHODS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {methods.map((m) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setMethod(m.name)}
              className={`p-4 rounded-2xl backdrop-blur-md transition border cursor-pointer ${
                method === m.name
                  ? "bg-[#ff7101]/20 border-[#ff7101]"
                  : "bg-white/20 border-white/20"
              }`}
            >
              <img
                src={m.logo}
                alt={m.name}
                className="h-11 mx-auto object-contain mb-2 rounded-md"
              />
              <span className="text-sm  text-white">
                {m.name}
              </span>
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-semibold text-[#D9D9D9] mb-1">
              {method} Phone Number
            </label>
            <input
              type="text"
              placeholder={method === "MPESA" ? "07XXXXXXXX" : "09XXXXXXXX"}
              value={phone}
              max={10}
              min={10}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(() => e.target.value)
              }
              className="w-full rounded-xl px-3 py-3 bg-black/30 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none placeholder:text-sm transition border border-white/20 focus:border-[#ff7101]"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#D9D9D9] text-black py-4 rounded-3xl text-lg font-bold cursor-pointer transition-colors duration-300 hover:bg-[#ff7101]/80 hover:text-white"
          >
            Pay Now
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-xs text-white/80">
          <span className="font-semibold">SATEV</span> Group
        </div>
      </div>
      <Toaster/>
      <Dialog open={open} onClose={setOpen} className="fixed z-50 inset-0">
        <div className="flex items-center justify-center min-h-screen bg-black/70">

          <Dialog.Panel className="bg-black/90 backdrop-blur-md p-8 rounded-2xl text-center">
            
            <div className="w-10 h-10 border-4 border-[#ff7101]/30 border-t-[#ff7101] rounded-full animate-spin mx-auto mb-4" />

            <Dialog.Title className="text-white font-semibold">
              Waiting for Payment...
            </Dialog.Title>
            <br/>
              <div>If you paid successfully, please don't leave this page.</div>
          </Dialog.Panel>

        </div>
      </Dialog>
    </div>
  );
}