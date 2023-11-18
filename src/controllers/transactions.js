import {save } from "../services/transactions";

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