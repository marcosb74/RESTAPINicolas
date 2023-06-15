const Clientes = require("../models/Clientes");

exports.newClient = async (req, res) => {
  const client = new Clientes(req.body);

  try {
    await client.save();
    res.json({ message: "New Client added successfully" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Clientes.find({});
    res.json(clients).status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.getClientById = async (req, res) => {
  const client = await Clientes.findById(req.params.id);

  if (!client) {
    res.json({ message: "Client Not Found" }).status(404);
  }
  res.json(client).status(200);
};

exports.updateClientById = async (req, res) => {
  try {
    const client = await Clientes.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(client).status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteClientById = async (req, res) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Client Deleted Successfully" }).status(204);
  } catch (error) {
    console.log(error);
  }
};
