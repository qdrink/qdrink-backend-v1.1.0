import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { chatInicio } from "../utils/bot";
import { save, sendQrWsp } from "../services/clients";
import CryptoJS from "crypto-js";
import { STRING_KEY } from "../config";

const wsp = new Client({
  authStrategy: new LocalAuth(),
});

wsp.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

wsp.on("ready", () => {
  console.log("Client is ready!");
});

wsp.on("message", async (message) => {
  console.log(chatInicio(message.body.substring(0, 39)));
  if (chatInicio(message.body.substring(0, 39))) {
    try {
      var nom = message.body.substring(39);
      var celular = message.from.split("@")[0];
      const nuevo = await save(messagetoReqBody(nom, celular));
      await sendQrWsp(clientetoReqBody(nuevo));
    } catch (error) {
      console.log(error.message);
      message.reply(error.message || "No se pudo registrar su número");
    }
  }
  console.log("He recibido un msje de " + message.from);
});

wsp.initialize();

export default wsp;

function messagetoReqBody(nom, celular) {
  //se mapea los datos recibidos de wsp a req.body
  const body = { nombre: nom, cel: celular, dinero: "0" };
  const req = { body: body };
  return req;
}
function clientetoReqBody(cliente) {
  //se mapea el nuevo cliente al servicio de enviar qr
  const body = { qr: encryptQR(cliente.id), texto: cliente.nombre, cel: cliente.cel };
  const req = { body: body };
  return req;
}
function encryptQR(valor){
   return CryptoJS.AES.encrypt(JSON.stringify(valor), STRING_KEY).toString();
}
