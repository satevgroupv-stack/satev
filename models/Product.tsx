import mongoose, { Schema, Document, Model } from "mongoose";

// 1. TypeScript interface
export interface IProduct extends Document {
  id: string;
  name: string;
  amharic?: string;
  price?: number;
  image?: string;
}

// 2. Schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    amharic: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

// 3. Prevent model overwrite in Next.js (important)
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
 