const sql = require("./db.js");

// construtor
const Cliente = function (cliente) {
    this.email = cliente.email;
    this.name = cliente.name;
    this.active = cliente.active;
    this.accessDate = cliente.accessDate;
};

Cliente.create = (newCliente, result) => {
    sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("cliente criado: ", { id: res.insertId, ...newCliente });
        result(null, { id: res.insertId, ...newCliente });
    });
};

Cliente.findById = (clienteId, result) => {
    sql.query(`SELECT * FROM clientes WHERE id = ${clienteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("cliente encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // não encontrou o Cliente com o id
        result({ kind: "not_found" }, null);
    });
};

Cliente.getAll = result => {
    sql.query("SELECT * FROM clientes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("clientes: ", res);
        result(null, res);
    });
};

Cliente.updateById = (id, cliente, result) => {
    sql.query(
        "UPDATE clientes SET email = ?, name = ?, active = ? WHERE id = ?",
        [cliente.email, cliente.name, cliente.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // não encontrou o Cliente com o id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("cliente atualizado: ", { id: id, ...cliente });
            result(null, { id: id, ...cliente });
        }
    );
};

Cliente.remove = (id, result) => {
    sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // não encontrou o Cliente com o id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("cliente excluído com id: ", id);
        result(null, res);
    });
};

Cliente.removeAll = result => {
    sql.query("DELETE FROM clientes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`excluído ${res.affectedRows} dos clientes`);
        result(null, res);
    });
};

module.exports = Cliente;