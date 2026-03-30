"use client";

import { useEffect, useState } from "react";
import DrinksPage from "@/components/DrinksPage";
import type { Drink } from "@/app/[id]/shop/page";
import { CHECKOUT_CART, DRINKS_KEY } from "@/constants";

type ClientShopProps = {
  drinks: Drink[];
  id: string;
};



export default function ClientShop({ drinks, id }: ClientShopProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  // Load cart from localStorage
  useEffect(() => {
    console.log("Loading cart for machine:", id);
    const existingCart = localStorage.getItem(CHECKOUT_CART);

    if (existingCart) {
      try {
        const parsed = JSON.parse(existingCart);
        if (parsed?.cart) {
          setCart(parsed.cart);
        }
      } catch {
        // console.warn("Invalid cart data");
      }
    }
  }, [id]);

  const addToCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };

      localStorage.setItem(
        CHECKOUT_CART,
        JSON.stringify({ cart: updated, timestamp: Date.now() })
      );

      return updated;
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;

      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];

        localStorage.setItem(
          CHECKOUT_CART,
          JSON.stringify({ cart: copy, timestamp: Date.now() })
        );

        return copy;
      }

      const updated = { ...prev, [id]: newQty };

      localStorage.setItem(
        CHECKOUT_CART,
        JSON.stringify({ cart: updated, timestamp: Date.now() })
      );

      return updated;
    });
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const drink = drinks.find((d) => d.id === id);
    return sum + (drink?.price || 0) * qty;
  }, 0);

  const onCheckout = async () => {
    // console.log("Checkout clicked");
    window.location.href = `/${id}/payment`;
  };

  return (
    <DrinksPage
      drinks={drinks}
      cart={cart}
      addToCart={addToCart}
      updateQty={updateQty}
      total={total}
      onCheckout={onCheckout}
    />
  );
}