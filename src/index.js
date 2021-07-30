const express = require("express");
const path = require("path");
const fs = require("fs").promises;
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

app.listen(puerto, () =>
  console.log(`Servidor corriendo en puerto ${puerto}`)
);

app.on("error", (error) => {
  console.log(`Error de servidor: ${error}`);
});


app.get("/", (req, res) => {
  res.send(`Puede utilizar las rutas '/items' '/item-random' '/visitas'`);
});

let getItemCounter = 0;

app.get("/items", async (req, res) => {
  getItemCounter++;
  try{
    const fileStats = await fs.stat(`./productos.txt`)
    if (fileStats.size === 0){
      res.send("Archivo vacío")
    } else {
      const dataFile = await fs.readFile("./productos.txt", "utf8")
      const dataObj = JSON.parse(dataFile)
      const dataArray = Object.values(dataObj)
      const items = { items: dataObj, cantidad: dataArray.length }
      res.send(items)
    }
  } catch (error){
      throw new Error(error)
  }
});

let getItemRandomCounter = 0;

app.get("/item-random", async (req, res) => {
  getItemRandomCounter++;
  try{
    const fileStats = await fs.stat(`./productos.txt`)
    if (fileStats.size === 0) {
      res.send("Archivo vacío")
    } else {
        const dataFile = await fs.readFile("./productos.txt", "utf8");
        const dataObj = JSON.parse(dataFile)
        const dataArray = Object.values(dataObj)
        const productsRandom = Math.floor(Math.random() * (dataArray.length - 0) + 0);
        const items = { item: dataArray[productsRandom]}
        res.send(items)
    }
  } catch (error) {
      throw new Error(error)
  }
});


app.get("/visitas", (req, res) => {
  res.send({visitas: {Items:getItemCounter, Items_Random:getItemRandomCounter}})
})