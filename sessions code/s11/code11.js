// window.console.log()
// console.log()

// window.setTimeout(()=>{}, 4000)
// setTimeout(() => {}, 4000);

// global.console.log("Logging....");
// console.log("Logging....");

// console.log(global);

// const , let , var  ---> golbal obj
// author = "Ammar";

// console.log(global);

// console.log(process);

// setTimeout(() => {
//   console.log("Exit..");
//   process.exit(0);
// }, 5000);

// $env:NODE_ENV="production"; nodemon code11.js

// console.log(process.env);

// NODE_ENV = "development";
// NODE_ENV = "production";

// console.log(process.env.NODE_ENV);

// console.log(__dirname);
// console.log(__filename);

//!
//domain/images/img1.png

// const x = 1 + 2;
// console.log(x);

/*
const http = require("http");

const server = http.createServer();
// http request event

server.on("request", (req, res) => {
  res.end("SERVER!");
});

server.listen(4000, () => {
  console.log("listenning on 4000");
});
*/

const { EventEmitter } = require("events");

const pizzaEmitter = new EventEmitter();

pizzaEmitter.on("pizzaOrder", (data) => {
  console.log("Prepare order: ", data);
});

setTimeout(() => {
  pizzaEmitter.emit("pizzaOrder", "ammar's order");
}, 3000);
