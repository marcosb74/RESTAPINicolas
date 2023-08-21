const Clientes = require("../models/Clientes");

exports.newClient = async (req, res) => {
  const client = new Clientes(req.body);

  try {
    await client.save();
    res.status(201).json({ message: "New Client added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Clientes.find({});
    res.json(clients).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getClientById = async (req, res, next) => {
  const client = await Clientes.findById(req.params.id);

  if (!client) {
    res.status(404).json({ message: "Client Not Found" });
    return next();
  }
  res.json(client);
};

exports.updateClientById = async (req, res) => {
  try {
    const client = await Clientes.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(client);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.deleteClientById = async (req, res) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.id });
    res.status(204).json({ message: "Client Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
