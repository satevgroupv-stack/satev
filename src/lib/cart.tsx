import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
  useContext } from
'react';
import { Drink } from './data';
export interface CartLine {
  drink: Drink;
  qty: number;
}
interface CartContextValue {
  lines: CartLine[];
  add: (drink: Drink) => void;
  remove: (id: string) => void;
  decrement: (id: string) => void;
  removeLine: (id: string) => void;
  clear: () => void;
  totalQty: number;
  typeCount: number;
  total: number;
  qtyOf: (id: string) => number;
}
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const add = useCallback((drink: Drink) => {
    if (!drink.inStock) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.drink.id === drink.id);
      if (existing) {
        return prev.map((l) =>
        l.drink.id === drink.id ?
        {
          ...l,
          qty: l.qty + 1
        } :
        l
        );
      }
      return [
      ...prev,
      {
        drink,
        qty: 1
      }];

    });
  }, []);
  const decrement = useCallback((id: string) => {
    setLines((prev) =>
    prev.
    map((l) =>
    l.drink.id === id ?
    {
      ...l,
      qty: l.qty - 1
    } :
    l
    ).
    filter((l) => l.qty > 0)
    );
  }, []);
  const remove = decrement;
  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.drink.id !== id));
  }, []);
  const clear = useCallback(() => setLines([]), []);
  const totalQty = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const typeCount = lines.length;
  const total = useMemo(
    () => lines.reduce((s, l) => s + l.qty * l.drink.price, 0),
    [lines]
  );
  const qtyOf = useCallback(
    (id: string) => lines.find((l) => l.drink.id === id)?.qty ?? 0,
    [lines]
  );
  return (
    <CartContext.Provider
      value={{
        lines,
        add,
        remove,
        decrement,
        removeLine,
        clear,
        totalQty,
        typeCount,
        total,
        qtyOf
      }}>
      
      {children}
    </CartContext.Provider>);

}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}