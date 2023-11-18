import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

const wsp = new Client({
  authStrategy: new LocalAuth(),
});

wsp.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

wsp.on("ready", () => {
  console.log("Client is ready!");
});

wsp.initialize();

export default wsp;
