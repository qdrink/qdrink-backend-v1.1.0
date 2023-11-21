import Client from "../model/client";
import { MessageMedia } from "whatsapp-web.js";
import QRCode from "qrcode";
import fs from "fs";
import wsp from "../vendors/whatsapps"; 

export const findAll = async () => {
  return await Client.find();
};

export const save = async (req) => {
  try {
    const exist = await Client.findOne({ cel: req.body.cel });
    if (exist) {
      throw new Error("Client already exits in BD");
      return;
    }
    const cliente = await new Client(req.body);
    return await cliente.save();
  } catch (error) {
    throw new Error(error);
  }
};
export const consume = async (req) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
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
