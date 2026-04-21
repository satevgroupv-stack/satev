import ClientShop from "@/components/ClientShop";

export type Drink = {
  id: string;
  name: string;
  price: number;
  image?: string;
  amharic?: string;
};

export type Machine = {
  id: string;
  total: number;
};

async function getDrinks(id: string): Promise<{ products: Drink[]; machine: Machine }> {
  const res = await fetch(`${process.env.MAIN_URL}/api/products?id=${id}`, {
    cache: "no-store",
  });

  // console.log("Raw response from API:", res);
  if (!res.ok) return { products: [], machine: { id: "", total: 0 } };
  return res.json();
}

export default async function Shop({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getDrinks(id)
  const {products ,machine} = res;
  const drinks = products || [];

  return <ClientShop drinks={products} id={id} machine={machine} />;
}