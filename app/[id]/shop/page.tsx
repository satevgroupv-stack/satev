import ClientShop from "@/components/ClientShop";

export type Drink = {
  id: string;
  name: string;
  price: number;
  image?: string;
  amharic?: string;
};

async function getDrinks(): Promise<Drink[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function Shop({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const drinks = await getDrinks();
  const { id } = await params;

  return <ClientShop drinks={drinks} id={id} />;
}