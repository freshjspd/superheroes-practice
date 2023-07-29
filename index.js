const http = require('http');

// require('dotenv').config();

console.log('host :>> ', process.env.HOST);
console.log('port :>> ', process.env.PORT);

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(() => {});

httpServer.listen(HOST, PORT, () =>
  console.log(`Server is listening http://${HOST}:${PORT}`)
);
