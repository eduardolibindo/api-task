const express = require("express");
const bodyparser = require("body-parser");

const app = express();

// analisa solicitações de tipo de conteúdo: application/json
app.use(bodyparser.json());

// analisa solicitações de content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}));

// rota simples de inicialização da api
app.get("/", (req, res) => {
    res.json({menssage:"Api Inicializada!!!"});
});

require ("./app/rotas/cliente.rotas.js")(app);

// porta setada para ouvir as requisições atravez da api
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`API esta rodando na porta ${PORT}.`);
});