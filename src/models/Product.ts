import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  amharic?: string;
  price?: number;
  image?: string;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    amharic: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  { timestamps: true },
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
