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

export default model("Client", ClientSchema);
