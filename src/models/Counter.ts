import mongoose, { Schema, Document } from "mongoose";

interface CounterModel extends Document {
  name: string;
  count: number;
}

const CounterSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Counter = mongoose.model<CounterModel>("Counter", CounterSchema);

export default Counter;
