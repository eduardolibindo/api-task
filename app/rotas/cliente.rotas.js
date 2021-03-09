module.exports = app => {
    const clientes = require("../controle/cliente.controle.js");
  
    // Criar um novo cliente
    app.post("/clientes", clientes.create);
  
    // Recuperar todos os clientes
    app.get("/clientes", clientes.findAll);
  
    // Recupere um único cliente com clienteId
    app.get("/clientes/:clienteId", clientes.findOne);
  
    // Atualizar um cliente com clienteId
    app.put("/clientes/:clienteId", clientes.update);
  
    // Excluir um cliente com clienteId
    app.delete("/clientes/:clienteId", clientes.delete);
  
    // Excluir todos os clientes
    app.delete("/clientes", clientes.deleteAll);
  }