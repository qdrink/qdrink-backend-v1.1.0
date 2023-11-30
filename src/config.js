import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://qdrinkinfo:BlackIpa2021@qdrink.icjufar.mongodb.net/?retryWrites=true&w=majority";

export const STRING_KEY =
process.env.STRING_KEY || "MdMiAJOREGeA";
