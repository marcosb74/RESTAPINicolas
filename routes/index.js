const express = require("express");
const router = express.Router();
const clienteController = require("../controller/clienteController.js");
const productoController = require("../controller/productoController.js");
const pedidoController = require("../controller/pedidoController.js");
const usuarioController = require("../controller/usuarioController.js");

//Middleware for Route Protection
const auth = require("../middleware/auth.js");

module.exports = function () {
  //Defining Client Routes
  router.post("/clientes", auth, clienteController.newClient);
  router.get("/clientes", auth, clienteController.getClients);
  router.get("/clientes/:id", auth, clienteController.getClientById);
  router.put("/clientes/:id", auth, clienteController.updateClientById);
  router.delete("/clientes/:id", auth, clienteController.deleteClientById);

  // Defining Product Routes
  router.post(
    "/productos",
    auth,
    productoController.subirArchivo,
    productoController.newProduct
  );
  router.get("/productos", auth, productoController.getProducts);
  router.get("/productos/:id", auth, productoController.getProductById);
  router.post(
    "/productos/busqueda/:query",
    auth,
    productoController.searchProducts
  );
  router.put(
    "/productos/:id",
    auth,
    productoController.subirArchivo,
    productoController.updateProductById
  );
  router.delete("/productos/:id", auth, productoController.deleteProductById);

  //Defining Orders
  router.post("/pedidos", auth, pedidoController.newPedido);
  router.get("/pedidos", auth, pedidoController.getPedidos);
  router.get("/pedidos/:id", auth, pedidoController.getPedidoById);
  router.put("/pedidos/:id", auth, pedidoController.updatePedidoById);
  router.delete("/pedidos/:id", auth, pedidoController.deletePedidoById);

  router.post("/register", usuarioController.registerUser);
  router.post("/login", usuarioController.authenticateUser);
  return router;
};
