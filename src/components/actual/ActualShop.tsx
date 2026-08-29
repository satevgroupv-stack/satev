"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

const CART_KEY = "CHECKOUT_CART_SATEV_VENDING_MACHINE";

type Drink = {
  id: string;
  name: string;
  amharic?: string;
  price: number;
  image?: string;
};

export function ActualShop({ machineId }: { machineId: string }) {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        setCart(JSON.parse(saved).cart ?? {});
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
    fetch(`/api/products?id=${encodeURIComponent(machineId)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load drinks.");
        const data = await response.json();
        setDrinks(data.products ?? []);
      })
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load drinks.",
        );
      })
      .finally(() => setLoading(false));
  }, [machineId]);
  const update = (id: string, delta: number) => {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] ?? 0) + delta };
      if (next[id] <= 0) delete next[id];
      localStorage.setItem(
        CART_KEY,
        JSON.stringify({ cart: next, timestamp: Date.now() }),
      );
      return next;
    });
  };
  const total = useMemo(
    () =>
      Object.entries(cart).reduce(
        (sum, [id, quantity]) =>
          sum +
          (drinks.find((drink) => drink.id === id)?.price ?? 0) * quantity,
        0,
      ),
    [cart, drinks],
  );
  return (
    <ActualShopContent
      cart={cart}
      drinks={drinks}
      loading={loading}
      error={error}
      total={total}
      update={update}
      onCheckout={() =>
        router.push("/mch_sk_4740ed6ce010137901ba3580ff6cd85e/payment")
      }
    />
  );
}

function ActualShopContent({
  cart,
  drinks,
  loading,
  error,
  total,
  update,
  onCheckout,
}: {
  cart: Record<string, number>;
  drinks: Drink[];
  loading: boolean;
  error: string;
  total: number;
  update: (id: string, delta: number) => void;
  onCheckout: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 pb-52">
      <p className="text-sm font-semibold tracking-widest text-[#ff8a2a]">
        MACHINE VERIFIED
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#d9d9d9]">
        Available drinks
      </h1>
      {error && (
        <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
          <p>{error}</p>
          <p className="mt-2 text-red-200/70">
            Verify that the root project has the same MONGODB_URI as satev-main.
          </p>
        </div>
      )}
      <div className="mt-8 space-y-4">
        {loading && <p className="text-[#d9d9d9]/70">Loading drinks...</p>}
        {drinks.map((drink) => (
          <article
            key={drink.id}
            className="flex gap-4 rounded-2xl border border-white/10 bg-[#18264c] p-4 shadow-lg"
          >
            <img
              src={drink.image || "https://i.imgur.com/mDVbeBY.jpeg"}
              alt={drink.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#d9d9d9]">
                {drink.name}{" "}
                <span className="text-sm text-[#ff8a2a]">{drink.amharic}</span>
              </h2>
              <p className="mt-2 font-bold text-[#ff8a2a]">
                ETB {drink.price}.00
              </p>
              <button
                type="button"
                onClick={() => update(drink.id, 1)}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#d9d9d9] px-5 py-2 font-bold text-black hover:bg-white"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-2xl border-t-4 border-[#ff7101] bg-[#101b3d]/95 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold text-[#ff8a2a]">
            <ShoppingCart className="h-5 w-5" /> Review order
          </h2>
          <strong className="text-[#d9d9d9]">ETB {total}.00</strong>
        </div>
        <div className="mt-3 space-y-2">
          {Object.entries(cart).map(([id, quantity]) => (
            <div
              key={id}
              className="flex items-center justify-between text-sm text-[#d9d9d9]"
            >
              <span>
                {drinks.find((drink) => drink.id === id)?.name} x {quantity}
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => update(id, -1)}
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => update(id, 1)}
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => update(id, -quantity)}
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          disabled={!total}
          onClick={onCheckout}
          className="mt-4 w-full rounded-2xl bg-[#d9d9d9] py-3 font-bold text-black disabled:opacity-40"
        >
          Checkout & pay
        </button>
      </div>
    </main>
  );
}
