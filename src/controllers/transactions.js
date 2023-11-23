import {save,total,findTransactionsByClient} from "../services/transactions";

export const add = async (req, res) => {
    if (!req.body.client) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
}
  if (!req.body.dinero) {
    res
      .status(400)
      .send({ message: "Money can not be empty" });
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
export const getByClient = async (req, res) => {
  const cliente = await findById(req);
  return res.send(cliente);
};
export const info = async (req, res) => {
  const transactions = await total();
  const ingresos = await total(true);
  const salidas = await total(false);

  return res.send({transactions,ingresos,salidas});
};
export const getbyClient = async(req,res)=>{
  const transactions = await findTransactionsByClient(req);
  return res.send({transactions});
};