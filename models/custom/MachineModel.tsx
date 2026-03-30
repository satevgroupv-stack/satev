import { ObjectId } from "mongoose";
export interface Shelf {
  no: number;
  name: string;
}
export interface MachineModel {
  _id: ObjectId;
  id: string;
  address: string;
  shelf: Shelf[];
  lastPoll: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}