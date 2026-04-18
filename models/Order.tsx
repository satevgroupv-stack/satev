import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Product inside order
interface IOrderProduct {
  id: string;     // product id
  name: string;
  qty: number;
}

// 2. Order interface
export interface IOrder extends Document {
  products: IOrderProduct[];
  date: number; // timestamp
  machineId: string;
  paymentStatus: "pending" | "sucess" | "failed";
  paymentURL?: string;
  txRef: string; // transaction reference for payment
  orderFilled: boolean; // whether the order has been fulfilled
  lakipayTransactionId?: string; // store LakiPay transaction ID if applicable
  createdAt?: Date; // for easier date comparisons
  stale?: boolean; // flag to mark old orders that shouldn't be processed
}

// 3. Product schema (embedded)
const OrderProductSchema: Schema<IOrderProduct> = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

// 4. Order schema
const OrderSchema: Schema<IOrder> = new Schema(
  {
    products: {
      type: [OrderProductSchema],
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    machineId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentURL: {
      type: String,
    },
    txRef: {
      type: String,
      required: true,
    },
    orderFilled: {
      type: Boolean,
      default: false,
    },
    lakipayTransactionId: {
      type: String,
    },
    stale: {
    type: Boolean,
    default: false,
  }
  },
  {
    timestamps: true,
  },
  
);

// 5. Prevent overwrite in Next.js
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;