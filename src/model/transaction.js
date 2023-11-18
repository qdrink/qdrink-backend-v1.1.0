import { Schema, model } from "mongoose";

const TransactionSchema = Schema(
  {
    ingreso: { type: Boolean, trim: true },
    dinero: { type: String, required: true, trim: true },
    eliminado: { type: Boolean, trim: true },
    cerveza: { type: String, trim: true },
    cm: { type: String, trim: true },
    client:  { type: Schema.Types.ObjectId, ref: 'Client' }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Transaction", TransactionSchema);
