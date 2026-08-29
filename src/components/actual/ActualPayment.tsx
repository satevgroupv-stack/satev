"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

const CART_KEY = "CHECKOUT_CART_SATEV_VENDING_MACHINE";
const drinks = [
  { id: "coca", price: 70 },
  { id: "water", price: 30 },
  { id: "juice", price: 80 },
];

type PaymentMethod = "LAKIPAY" | "CHAPA";

export function ActualPayment({ machineId }: { machineId: string }) {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [method, setMethod] = useState<PaymentMethod>("LAKIPAY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) setCart(JSON.parse(saved).cart ?? {});
  }, []);
  const total = useMemo(
    () =>
      Object.entries(cart).reduce(
        (sum, [id, quantity]) =>
          sum +
          (drinks.find((drink) => drink.id === id)?.price ?? 0) * quantity,
        0,
      ),
    [cart],
  );
  const pay = async () => {
    if (!total) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, machine: machineId, method }),
      });
      const data = await response.json();
      if (!response.ok || !data.checkOut)
        throw new Error(data.error ?? "Payment could not be started.");
      window.location.assign(data.checkOut);
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Payment could not be started.",
      );
      setLoading(false);
    }
  };
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-[#d9d9d9]/70 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> See orders
      </button>
      <h1 className="mt-8 text-3xl font-extrabold text-[#d9d9d9]">
        Select payment method
      </h1>
      <p className="mt-2 text-[#d9d9d9]/60">
        Choose how you want to pay for your order.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(["LAKIPAY", "CHAPA"] as PaymentMethod[]).map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => setMethod(option)}
            className={`rounded-2xl border-2 p-5 text-left font-bold transition ${method === option ? "border-[#ff7101] bg-[#ff7101]/10 text-[#ff8a2a]" : "border-white/10 bg-[#18264c] text-[#d9d9d9]"}`}
          >
            {option}
            <span className="mt-2 block text-sm font-normal text-[#d9d9d9]/60">
              Secure local payment
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#18264c] p-5">
        <div className="flex justify-between text-lg font-bold text-[#d9d9d9]">
          <span>Total</span>
          <span className="text-[#ff8a2a]">ETB {total}.00</span>
        </div>
        <button
          type="button"
          onClick={pay}
          disabled={loading || !total}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d9d9d9] py-4 font-bold text-black disabled:opacity-40"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />} Pay with{" "}
          {method}
        </button>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
      </div>
    </main>
  );
}
