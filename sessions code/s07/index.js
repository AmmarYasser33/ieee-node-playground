// const fs = require("fs");

// const text = fs.readFileSync("test.txt", "utf8");
// console.log(text);

// console.log("read file done!");

// const longText = "lflakslkfdjslkajfsd";
// fs.writeFileSync("output.txt", longText);

// fs.readFile("test.txt", "utf8", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }

//   console.log(data);
// });

// console.log("reading file...");

// fs.readFile("file1.txt", "utf8", (err, data) => {
//   fs.readFile(`${data}`, "utf8", () => {
//     console.log(data);
//   });
// });

// Async Await
// async function readFiles() {
//   try {
//     const data1 = await fs.readFile("file1.txt", "utf8");
//     const data1 = await fs.readFile("file1.txt", "utf8");
//     const data1 = await fs.readFile("file1.txt", "utf8");
//     const data1 = await fs.readFile("file1.txt", "utf8");
//     const data2 = await fs.readFile(`${data1}`, "utf8");
//     console.log(data2);
//   } catch (err) {
//     console.log(err);
//   }
// }

// readFiles();

/*
const http = require("http");

const server = http.createServer((req, res) => {
  const path = req.url;

  console.log(path);

  if (path === "/products") {
    const products = {
      p1: "111",
      p2: "222",
    };

    res.end(JSON.stringify(products));
  } else if (path === "/books") {
    res.end("booooooks");
  } else if (path === "/") {
    res.end("Home");
  } else {
    res.end("Page not found");
  }

  // res.end("hello from server!");
});

server.listen(8080);
*/

/*
const slugify = require("slugify");

const text = slugify("منتج أول");

console.log(text);
*/

const express = require("express");

const app = express();

const products = {
  p1: "111",
  p2: "222",
};

// GET / --> 'Home'
app.get("/", (req, res) => {
  res.send("Home Page");
});

// GET  /products --> return all products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /products --> create new product
// app.post("/products", (req, res) => {
//   console.log(req.body);
// });

app.listen(8080, () => {
  console.log("App listing to prot 8080");
});
