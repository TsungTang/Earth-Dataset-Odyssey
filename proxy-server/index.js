
const cluster = require('cluster');

const http = require("http");
const express = require("express");
const httpProxy = require('http-proxy');

app = express();



const runProxyServer = (timeout) => {
  setTimeout(() => {

    const vuejs = httpProxy.createProxyServer({
      target: {
        host: "localhost",
        port: 8080
      },
      ws: true,
    });

    const django = httpProxy.createProxyServer({
      target: {
        host: "localhost",
        port: 8000
      },
    });


    app.all("/api*", function (req, res) {
      console.log("Redirect to django");
      django.web(req, res);
    });



    app.all('*', function (req, res) {
      console.log("Redirect to vuejs");
      vuejs.web(req, res);
    });



    var server = http.createServer(app).listen(5566, console.log.bind(console, 'Open: http://localhost:5566'));
    server.on('upgrade', function (req, socket, head) {
      console.log("vuejs.ws");
      reactjs.ws(req, socket, head);
    });

  }, timeout);
}

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function (worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {
  runProxyServer(400)
}





