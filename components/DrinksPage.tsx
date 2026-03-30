"use client";

import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  cart: Record<string, number>;
  addToCart: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  total: number;
  onCheckout: () => void;
  drinks: [] | any[];
}

export default function DrinksPage({
  cart,
  addToCart,
  updateQty,
  total,
  onCheckout,
  drinks = [],
}: Props) {
  let id : string | undefined = undefined;
  return (
    <div className="min-h-screen bg-[#0f172a] pb-40 p-6 max-w-2xl mx-auto">

      {/* <div className="bg-green-600 text-center py-3 rounded-xl mb-6">
        Machine verified! Happy shopping.
      </div> */}
  
      <h2 className="text-3xl font-bold text-[#D9D9D9] mb-6">
        AVAILABLE DRINKS
      </h2>

      <div className="grid gap-6 mb-60">
        {drinks.map((drink) => (
            <div
            key={drink.id}
            className="bg-[#1e2937] rounded-3xl p-4 flex gap-4 shadow-md border-2 border-[#ff7101]/10 hover:border-[#ff7101]/60 cursor-pointer transition-all duration-300"
            >
            <img src={drink.image} className="w-24 h-24 rounded-xl object-cover" />

            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#D9D9D9]">
              {drink.name} <span className="text-[#ff7101]">{drink.amharic}</span>
              </h3>
              <p className="text-[#ff7101] font-bold text-lg">
              ETB {drink.price}.00
              </p>

              <button
              onClick={() => {
                if(drink.id !== "coca") {
                  if(id !== undefined || id !== null || id !== ""){ 
                    toast.dismiss(id);
                  }
                  id = toast.error("Sorry, this drink is currently unavailable.");
                  return;
                }
                addToCart(drink.id)
              }}
              className="mt-3 bg-[#D9D9D9] text-black px-6 py-2 font-bold rounded-2xl font-semibold cursor-pointer hover:bg-[#bcbcbc] transition-colors duration-300"
              >
              ADD
              </button>
            </div>
            </div>
        ))}
        {drinks.length === 0 && (
            <div className="flex flex-col gap-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-[#1e2937] p-4 flex gap-4 rounded-3xl shadow-md animate-pulse">
        <div className="w-24 h-24 bg-[#374151] rounded-xl" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-6 bg-[#4b5563] rounded w-1/2" />
          <div className="h-6 bg-[#4b5563] rounded w-1/3" />
        </div>
      </div>
    ))}
  </div>
        )}
      </div>

      {/* REVIEW ORDER */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1e2937] p-6 border-t-4 border-[#ff7101] rounded-t-3xl max-w-2xl mx-auto transition-transform duration-300">

        <h3 className="text-xl font-bold text-[#ff7101] mb-4 ">REVIEW ORDER</h3>

        {Object.entries(cart).map(([id, qty]) => {
          const drink = drinks.find((d) => d.id === id);
          // console.log("Rendering cart item:", { id, qty, drinks,drink });
          return (
            <div key={id} className="flex items-center justify-between mb-3 transition-opacity duration-300 ">
              <span className="text-[#D9D9D9] font-semibold">
                {drink?.name} × {qty}
              </span>

              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(id, -1)} className="font-bold cursor-pointer hover:bg-[#374151] p-1 rounded">-</button>
                <button onClick={() => updateQty(id, 1)} className="font-bold cursor-pointer hover:bg-[#374151] p-1 rounded ">+</button>
                <Trash2
                  size={18}
                  className="text-red-500 cursor-pointer hover:bg-[#374151]  rounded"
                  onClick={() => updateQty(id, -qty)}
                />
              </div>
            </div>
          );
        })}

        <div className="flex justify-between font-bold text-lg text-[#D9D9D9] mt-4">
          <span>Total</span>
          <span className="text-[#ff7101]">ETB {total}.00</span>
        </div>

        <button
          onClick={onCheckout}
          disabled={total === 0}
          className="mt-4 w-full bg-[#D9D9D9] text-black py-4 rounded-3xl text-lg font-bold cursor-pointer transition-colors duration-300 hover:bg-[#ff7101]/70 hover:text-white">
          CHECKOUT & PAY
        </button>
      </div>
      <Toaster/>
    </div>
  );
}