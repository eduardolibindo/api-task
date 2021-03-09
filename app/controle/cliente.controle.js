const Cliente = require("../modelos/cliente.modelo.js");

// Cria e salva um novo cliente
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    // Cria o Cliente
    const cliente = new Cliente({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
        accessDate: req.body.accessDate
    });

    // Salva o Cliente no banco de dados
    Cliente.create(cliente, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao criar o cliente."
            });
        else res.send(data);
    });
};

// Recupera todos os clientes do banco de dados
exports.findAll = (req, res) => {
    Cliente.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao recuperar os clientes."
            });
        else res.send(data);
    });
};

// Encontrar um único cliente com um ID do cliente
exports.findOne = (req, res) => {
    Cliente.findById(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Cliente não encontrado com id ${req.params.clienteId}.`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao recuperar o cliente com id " + req.params.clienteId
                });
            }
        } else res.send(data);
    });
};

// Atualizar um cliente identificado pelo ID do cliente na solicitação de requisição
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    console.log(req.body);

    Cliente.updateById(
        req.params.clienteId,
        new Cliente(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Cliente não encontrado com id ${req.params.clienteId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar o cliente com id " + req.params.clienteId
                    });
                }
            } else res.send(data);
        }
    );
};

// Excluir um cliente com o ID de cliente especificado na solicitação de resquisição
exports.delete = (req, res) => {
    Cliente.remove(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Cliente não encontrado com id ${req.params.clienteId}.`
                });
            } else {
                res.status(500).send({
                    message: "Não foi possível deletar o cliente com id " + req.params.clienteId
                });
            }
        } else res.send({ message: `Cliente excluído com sucesso!` });
    });
};

// Exclua todos os clientes do banco de dados.
exports.deleteAll = (req, res) => {
    Cliente.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao remover todos os clientes."
            });
        else res.send({ message: `Todos os clientes foram excluídos com sucesso!` });
    });
};