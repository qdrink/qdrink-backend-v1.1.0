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

TransactionSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object; 
}); 

export default model("Transaction", TransactionSchema);
