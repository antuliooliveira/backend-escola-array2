var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(cors())

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

//create application/json parser
app.use(bodyParser.json());


function Escola(id, nome, matriculados, professores, labinformatica) {
  this.id = id;
  this.nome = nome;
  this.matriculados = matriculados;
  this.professores = professores;
  this.labinformatica = labinformatica;
}

const ESCOLAS = [
 { id: 1, nome: 'Escola Novo Tempo', matriculados: 350, professores: 15, labinformatica: true }
];
var SEQUENCE = 2;

app.get('/api/escolas', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  res.json(ESCOLAS);
});

app.get('/api/escolas/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  const result = ESCOLAS.find(e => e.id === +req.params['id']);
  if (!result) {
    res.sendStatus(404); // 404 Not Found
  } else {
    res.json(result);
  }
});

app.post('/api/escolas', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin','*');

  ESCOLAS.push(new Escola(SEQUENCE++, req.body.nome, req.body.matriculados, req.body.professores, req.body.labinformatica));
  res.sendStatus(200);
});

app.put('/api/escolas', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin','*');

  const index = ESCOLAS.findIndex(e => e.id === +req.body.id);
  if (index === -1) {
    res.sendStatus(400); // 400 Bad Request
  } else {
    const escola = new Escola(req.body.id, req.body.nome, req.body.matriculados, req.body.professores, req.body.labinformatica);
    ESCOLAS.splice(index, 1, escola);
    res.sendStatus(200);
  }
});

app.delete('/api/escolas/:id', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin','*');

  const index = ESCOLAS.findIndex(e => e.id === +req.params['id']);
  if (index === -1) {
    res.sendStatus(400); // 400 Bad Request
  } else {
    ESCOLAS.splice(index, 1);
    res.sendStatus(200);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
