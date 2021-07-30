import express, { response } from "express";
import path from "path";
const fs = require("fs/promises");
const myfilePath = path.resolve(__dirname, "./../productos.txt");

const puerto = 8080;
const app = express();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const fn = () => {
  const data = fs.readFile(myfilePath, "utf8");
  return data;
};

const server = app.listen(puerto, () =>
  console.log("Servidor activo en puerto", puerto)
);

server.on("error", (err) => {
  console.log("ERROR =>", err);
});

let totalVisits = 0;
let visit1 = 0;
let visit2 = 0;

app.get("/", (req, res) => {
  totalVisits++;
  res.send(`Puede utilizar las rutas '/items' '/item-random' '/visitas'`);
});

app.get("/items", async (request, response) => {
  totalVisits++;
  visit1++;
  const productos = await fn();
  const productosArray = JSON.parse(productos, null, 2);
  const productosLength = productosArray.length;
  response.json({ productos: productosArray, cantidad: productosLength });
});

app.get("/item-random", async (request, response) => {
  totalVisits++;
  visit2++;
  const productos = await fn();
  const productosArray = JSON.parse(productos, null, 2);
  const productosLength = productosArray.length;
  const random = getRandom(0, productosLength);
  response.json({ productoRand: productosArray[random] });
});


app.get("/visitas", (request, response) => {
  totalVisits++;
  const visits = `Visitas totales: ${totalVisits}, Visitas a /items: ${visit1}, Visitas a /item-random: ${visit2} `;
  response.json({ visits });
});