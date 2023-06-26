const express = require("express");
const router = express.Router();
const clienteController = require("../controller/clienteController.js");
const productoController = require("../controller/productoController.js");

module.exports = function () {
  //Defining Client Routes
  router.post("/clientes", clienteController.newClient);
  router.get("/clientes", clienteController.getClients);
  router.get("/clientes/:id", clienteController.getClientById);
  router.put("/clientes/:id", clienteController.updateClientById);
  router.delete("/clientes/:id", clienteController.deleteClientById);

  // Defining Product Routes
  router.post(
    "/productos",
    productoController.subirArchivo,
    productoController.newProduct
  );
  router.get("/productos", productoController.getProducts);
  router.get("/productos/:id", productoController.getProductById);
  router.put(
    "/productos/:id",
    productoController.subirArchivo,
    productoController.updateProductById
  );
  router.delete("/productos/:id", productoController.deleteProductById);
  return router;
};
