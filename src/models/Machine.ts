import mongoose, { Document, Model, Schema } from "mongoose";

interface IShelf {
  no: number;
  name: string;
}

export interface IMachine extends Document {
  id: string;
  name: string;
  address: string;
  shelf: IShelf[];
  lastPoll: number;
  total: number;
}

const ShelfSchema: Schema<IShelf> = new Schema(
  {
    no: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { _id: false },
);

const MachineSchema: Schema<IMachine> = new Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    shelf: { type: [ShelfSchema], default: [] },
    lastPoll: { type: Number, required: true, default: Date.now },
    total: { type: Number, required: false, default: 0 },
  },
  { timestamps: true },
);

const Machine: Model<IMachine> =
  mongoose.models.Machine || mongoose.model<IMachine>("Machine", MachineSchema);

export default Machine;
