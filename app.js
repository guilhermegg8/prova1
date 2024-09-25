const express = require('express');
const app = express();
const handlebars = require('express-handlebars').engine;
const bodyParser = require('body-parser');
const Clientes = require('./models/post');


app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('cadastro');
});

app.post("/cadastrar", function (req, res) {
  Clientes.create({
    nome: req.body.nome,
    endereco: req.body.endereco,
    bairro: req.body.bairro,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (erro) {
      res.send("Erro: " + erro);
    });
});


app.get('/consulta', (req, res) => {
  Clientes.findAll()
    .then(function (posts) {
      res.render("consulta", { posts: posts });
      console.log(posts);
    })
    .catch(function (erro) {
      console.log("Erro ao carregar dados: " + erro);
    });
});

app.get("/editar/:id", function(req, res) {
  Clientes.findAll({ where: { id: req.params.id } })
    .then(function(posts) {
      res.render("editar", { posts: posts });
    })
    .catch(function(error) {
      console.log("Erro ao carregar dados: " + error);
    });
});

app.post("/atualizar/:id", function(req, res) {  
  Clientes.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
    }, {where: {id: req.params.id}}).then(function() {
        res.redirect("/consulta")
    }).catch(function(error) {
        res.send("Erro ao atualizar: " + error)
    })
})

app.get("/excluir/:id", function(req, res) {
  Clientes.destroy({ where: { id: req.params.id } })
    .then(function() {
      res.redirect("/consulta");
    })
    .catch(function(error) {
      res.send("Erro ao deletar: " + error);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});