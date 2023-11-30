import Client from "../model/client";
import Transaction from "../model/transaction";
import wsp from "../vendors/whatsapps";

export const save = async (req) => {
    const id = req.body.client;
    const cliente = await Client.findById(id);
    if (cliente) {
      var old = Number(cliente.dinero);
      var nue = Number(req.body.dinero);
      if (req.body.ingreso == true) {
        old += nue;
        suma(cliente, nue, old);
      } else {
        old -= nue;
        cliente.ocupado = false;
        resta(cliente, nue, old);
      }
      cliente.dinero = String(old);
      await Client.findByIdAndUpdate({ _id: id }, cliente);
      const transaccion = mapTransaccionReq(req);
      transaccion.client = cliente;
      return await transaccion.save();
    } else throw new Error("No existe cliente");
};
export const total = async (ingreso) => {
  if (ingreso === undefined)
    return await Transaction.countDocuments({ eliminado: false });
  else
    return await Transaction.countDocuments({
      eliminado: false,
      ingreso: ingreso,
    });
};
export const findTransactionsByClient = async(req)=>{
  const id = req.params.id;
  return await Transaction.find({client:id}).sort({createdAt:-1});
}


export const suma = async (client, nue, old) => {
  await wsp.sendMessage(
    client.cel + "@s.whatsapp.net",
    "Hola " +
      client.nombre +
      ", has agregado $" +
      nue +
      ". Tu importe total es $" +
      old
  );
};
export const resta = async (client, nue, old) => {
  await wsp.sendMessage(
    client.cel + "@s.whatsapp.net",
    "Hola " +
      client.nombre +
      ", has gastado $" +
      nue +
      ". Tu importe total es $" +
      old
  );
};
function mapTransaccionReq(req) {
  // Create a transaccion
  const transaccion = new Transaction({
    ingreso: req.body.ingreso,
    dinero: req.body.dinero,
    client: req.body.client,
    eliminado: req.body.eliminado ? req.body.eliminado : false,
  });
  return transaccion;
}
