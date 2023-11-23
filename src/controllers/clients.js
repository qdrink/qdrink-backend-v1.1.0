import {
  findAll,
  findById,
  consume,
  save,
  total,
  sendQrWsp,
} from "../services/clients";

export const add = async (req, res) => {
  if (!req.body.dinero) req.body.dinero = "0";

  if (!req.body.cel || !req.body.nombre) {
    res
      .status(400)
      .send({ message: "Money or name can not be empty" });
    return;
  }
  try {
    const nuevo = await save(req);
    res.send(nuevo);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the client",
    });
  }
};
export const list = async (req, res) => {
  const clientes = await findAll();
  return res.send(clientes);
};
export const info = async (req, res) => {
  const clients = await total();
  return res.send({ clients });
};
export const get = async (req, res) => {
  const cliente = await findById(req);
  return res.send(cliente);
};
export const getForConsume = async (req, res) => {
  try {
    const nuevo = await consume(req);
    res.send(nuevo);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while get the client",
    });
  }
};

export const sendQr = async (req, res) => {
  try {
    if (!req.body.qr || !req.body.cel || !req.body.texto) {
      res.status(400).send({ message: "cel or qr or text can not be empty" });
      return;
    }
    res.send(sendQrWsp(req));
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
