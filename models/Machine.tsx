import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Shelf type
interface IShelf {
  no: number;
  name: string;
}

// 2. Machine interface
export interface IMachine extends Document {
    id: string;
  name: string;
  address: string;
  shelf: IShelf[];
  lastPoll: number; // timestamp (int)
}

// 3. Schema
const ShelfSchema: Schema<IShelf> = new Schema(
  {
    no: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false } // prevents extra _id for each shelf item
);

const MachineSchema: Schema<IMachine> = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    shelf: {
      type: [ShelfSchema],
      default: [],
    },
    lastPoll: {
      type: Number, // store as timestamp (e.g. Date.now())
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 4. Prevent overwrite in Next.js
const Machine: Model<IMachine> =
  mongoose.models.Machine || mongoose.model<IMachine>("Machine", MachineSchema);

export default Machine;