import Client from "../model/client";
import Transaccion from "../model/transaction";
import wsp from "../vendors/whatsapps"; 


export const save = async (req) => {
  try {
    const id = req.body.client.id;
    const cliente = await Client.findById(id);
    if (cliente) {
      var old = Number(cliente.dinero);
      var nue = Number(req.body.dinero);
      if (req.body.ingreso == true) {
        old += nue;
        suma(cliente,nue,old);
      } else {
        old -= nue;
        cliente.ocupado = false;
        resta(cliente,nue,old);
      }
      cliente.dinero = String(old);
      await Client.findByIdAndUpdate({ _id: id }, cliente);
      const transaccion = mapTransaccionReq(req);
      transaccion.client=cliente;
      return await transaccion.save();
    } else throw new Error("No existe cliente");
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};
export const suma = async (client, nue, old) => {
  await wsp.sendMessage(client.cel + '@s.whatsapp.net', 'Hola ' + client.nombre + ', has agregado $' + nue + '. Tu importe total es $' + old)
}
export const resta = async (client, nue, old) => {
  await wsp.sendMessage(client.cel + '@s.whatsapp.net', 'Hola ' + client.nombre + ', has gastado $' + nue + '. Tu importe total es $' + old)
}
function mapTransaccionReq(req){
 // Create a transaccion
 const transaccion = new Transaccion({
    ingreso: req.body.ingreso,
    dinero: req.body.dinero,
    client: req.body.client,
    eliminado: req.body.eliminado ? req.body.eliminado : false

  });
  return transaccion;
}

