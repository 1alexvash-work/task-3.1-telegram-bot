import mongoose, { Schema } from "mongoose";

interface ICat extends Document {
  name: string;
}

const CatSchema: Schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
});

const Cat = mongoose.model<ICat>("Cat", CatSchema);

export default Cat;
