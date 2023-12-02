import Client from "../model/client";
import { MessageMedia } from "whatsapp-web.js";
import QRCode from "qrcode";
import fs from "fs";
import wsp from "../vendors/whatsapps";
import client from "../model/client";

export const findAll = async () => {
  return await Client.find({ eliminado: false }).sort({
    apellido: 1,
    nombre: 1,
  });
};

export const total = async () => {
  return await Client.countDocuments({ eliminado: false });
};

export const findById = async (req) => {
  const id = req.params.id;
  const cliente = await Client.findById(id);
  if (cliente) return { client: cliente };
  else throw new Error("No existe cliente");
};

export const save = async (req) => {
    const exist = await Client.findOne({ cel: req.body.cel });
    if (exist) {
      throw new Error("Ya se encuentra registrado");
      return;
    }
    const cliente = await new Client(req.body);
    return await cliente.save();
};

export const consume = async (req) => {
    const id = req.params.id;
    const cliente = await Client.findById(id);
    if (cliente) {
      if (cliente.dinero > 0) {
        if (cliente.ocupado == false) {
          cliente.ocupado = true;
          await Client.findByIdAndUpdate({ _id: id }, cliente);
          return cliente;
        } else throw new Error("Cliente ocupado");
      } else throw new Error("Cliente sin dinero");
    } else throw new Error("No existe cliente");
};

export const sendQrWsp = async (req) => {
  try {
    const buffer1 = await QRCode.toFile("qr.png", req.body.qr); // load some gif
    const buffer = await fs.readFileSync("qr.png"); // load some gif
    const options = { caption: req.body.texto }; // some metadata & caption
    const media = MessageMedia.fromFilePath("qr.png");
    await wsp.sendMessage(req.body.cel + "@s.whatsapp.net", media, options);
    console.log("QR sent");
    return req.body;
  } catch (error) {
    throw new Error(error);
  }
};
export const edit = async (req) => {
  const id = req.params.id;
  const cliente = await Client.findById(id);
  if(cliente){
    await Client.findByIdAndUpdate({ _id: id }, req.body);
    return await Client.findById(id);
  }
 else
    throw new Error("No se encuentra registrado");
    return;
};
