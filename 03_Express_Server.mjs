// Using http Module
import http from "http";

const server = http.createServer((req, res) => {
  console.log("Server is running at port 3000");
  res.end("Hello from HTTP Module");
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});




//Using the Express
import express from 'express';

const myServer = express();
myServer.disable('x-powered-by'); 
const port = 9000;

myServer.get('/', (req, res) => {
  res.send('Hello, this is printed on the screen, From Server');
});

myServer.listen(port, () => {
  console.log(`My first Server is running on port: ${port}`);
});

