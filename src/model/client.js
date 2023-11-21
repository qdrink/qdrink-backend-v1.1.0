import { Schema, model } from "mongoose";

const ClientSchema = Schema(
  {
    cel: { type: String, required: true, trim: true, unique: true },
    dinero: { type: String, required: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, trim: true },
    ocupado: { type: Boolean, default: false },
    eliminado: { type: Boolean, default: false  },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ClientSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default model("Client", ClientSchema);
