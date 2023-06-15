const express = require("express");
const router = express.Router();
const clienteController = require("../controller/clienteController.js");

module.exports = function () {
  router.post("/clientes", clienteController.newClient);
  router.get("/clientes", clienteController.getClients);
  router.get("/clientes/:id", clienteController.getClientById);
  router.put("/clientes/:id", clienteController.updateClientById);
  router.delete("/clientes/:id", clienteController.deleteClientById);

  return router;
};
