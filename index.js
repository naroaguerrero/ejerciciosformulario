const express = require("express");
const app = express();

const animales = require("./animales");

app.use(express.static("public"));

app.get("/sumar-animal", function (req, res) {
  console.log(req.query);
  let animal = {
    nombre: req.query.nombre,
    edad: req.query.edad,
    tipo: req.query.tipo,
  };
  animales.push(animal);
  res.send(mostrarLista());
});

app.get("/adoptar", function (req, res) {
  let found = false;
  for (let i = 0; i < animales.length && !found; i++) {
    if (animales[i].nombre === req.query.nombre) {
      found = true;
      animales.splice(i, 1);
    }
  }
  found
    ? res.send(`<h3>El animal ha sido adoptado</h3> <a href="/">Volver</a>`)
    : res.send(`<h3>Lo sentimos, no está en adopción.</h3><a href="/">Volver</a>`);
});

function mostrarLista() {
  let parrafo = "";
  for (let i = 0; i < animales.length; i++) {
    parrafo += `<tr><td><strong>${animales[i].nombre}</strong></td><td>${animales[i].tipo}</td><td>${animales[i].edad}</td><td><form action="/adoptar"><button type="submit" name="nombre" value="${animales[i].nombre}">Adoptar</button> </form></td></tr>`;
  }

  return `<table>${parrafo}</table><br/><a href="/">Volver</a>`;
}

app.listen(3000);