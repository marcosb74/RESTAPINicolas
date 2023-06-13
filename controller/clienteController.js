const Clientes = require("../models/Clientes");

exports.newClient = async (req, res) => {
  const client = new Clientes(req.body);

  try {
    await client.save();
    res.json({ message: "New Client added successfully" });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Clientes.find({});
    res.json(clients);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

exports.getClientById = async (req, res) => {
  const client = await Clientes.findById(req.params.id);

  if (!client) {
    res.json({ message: "Client Not Found" });
    next();
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
    console.log(error);
  }
};

exports.deleteClientById = async (req, res) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Client Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

//deleteClientById
