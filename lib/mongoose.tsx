import Machine from "@/models/Machine";
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