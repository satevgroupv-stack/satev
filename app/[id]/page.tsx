// app/[id]/page.tsx

import ClientFlow from "../../components/ClientFlow";
import { connectDB } from "@/lib/mongoose";
import Machine from "@/models/Machine";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // ✅ unwrap params
  const { id } = await params;

  // 1. connect DB
  await connectDB();

  // 2. fetch machines
  let machine=  await Machine.findOne({ id: id });

  // console.log("Machine:", machine);

   if (!machine) {
    return <div>Machine not found</div>;
  }
  // 3. render
  return <ClientFlow  id={machine.id} address={machine.address} />;
}