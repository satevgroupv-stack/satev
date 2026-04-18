import Machine from "@/models/Machine";
import Order from "@/models/Order";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Global cache (important for Next.js hot reload)
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "satev", // optional (or remove if included in URI)
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}




(async () => {
  console.log("Testing DB connection and fetching recent successful orders...");
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  console.log("Five minutes ago:", fiveMinutesAgo);
    const order = await Order.findOne({
      machineId: "mch_sk_4740ed6ce010137901ba3580ff6cd85e",
      paymentStatus: "success",
      orderFilled: false,
      // createdAt: { $gte: fiveMinutesAgo }
    }).sort({ date: -1 }); 
    console.log("Order:", order);
})();
 
// export const seedMachines = async () => {
//   await connectDB();

//   const objId = new mongoose.Types.ObjectId("69c84dfaafe1f10e4a95e0e1");

//   const machineDoc = {
//     _id: objId,
//     id: "mch_sk_4740ed6ce010137901ba3580ff6cd85e",
//     name: "Revo-001",
//     address: "AASTU, Addis Ababa, Ethiopia",
//     shelf: [
//       {
//         no: 1,
//         name: "Shelf 1",
//         lastPoll: 1774734842387,
//       },
//     ],
//     createdAt: new Date("2026-03-28T21:54:02.396Z"),
//     updatedAt: new Date("2026-03-28T21:54:02.396Z"),
//     __v: 0,
//   };

//   await Machine.updateOne(
//     { id: machineDoc.id },
//     { $set: machineDoc, $setOnInsert: { createdAt: machineDoc.createdAt } },
//     { upsert: true }
//   );
// };

//  seedMachines()
//     .then(() => {
//       console.log("Machine seeded");
//       mongoose.connection.close();
//     })
//     .catch((err) => {
//       console.error("Seeding error:", err);
//       mongoose.connection.close();
//     });










// export const seedProducts = async () => {
//     const products = [
//         {
//             id: "coca",
//             name: "Coca",
//             amharic: "ኮካ",
//             price: 30,
//             image: "https://i.imgur.com/QYTbP9P.jpg",
//         },
//         {
//             id: "sprite",
//             name: "Sprite",
//             amharic: "ስፕራይት",
//             price: 60,
//             image: "https://i.imgur.com/uYvdb5g.jpg",
//         },
//         {
//             id: "fanta",
//             name: "Fanta",
//             amharic: "ፋንታ",
//             price: 70,
//             image: "https://i.imgur.com/PmXE8vx.jpg",
//         },
//         {
//             id: "mirinda",
//             name: "Mirinda",
//             amharic: "ሚሪንዳ",
//             price: 70,
//             image: "https://i.imgur.com/RnZIopP.jpg",
//         },
//         {
//             id: "negus",
//             name: "Negus",
//             amharic: "ንጉስ",
//             price: 70,
//             image: "https://i.imgur.com/N4kyEMW.jpg",
//         },
//         {
//             id: "sinq",
//             name: "SinQ",
//             amharic: "ስንቅ",
//             price: 70,
//             image: "https://i.imgur.com/LCyDiA5.jpg",
//         },
//     ];

//     await connectDB();
//     const Product = mongoose.models.Product || mongoose.model(
//         "Product",
//         new mongoose.Schema({
//             id: { type: String, required: true, unique: true },
//             name: String,
//             amharic: String,
//             price: Number,
//             image: String,
//         })
//     );

//     for (const product of products) {
//         await Product.updateOne(
//             { id: product.id },
//             { $set: product },
//             { upsert: true }
//         );
//     }
// };

// seedProducts().then(() => {
//     console.log("Products seeded successfully");
//     mongoose.connection.close();
// })
// .catch((err) => {
//     console.error("Error seeding products:", err);
//     mongoose.connection.close();
// });