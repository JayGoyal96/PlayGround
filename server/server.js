const express = require("express");
const http = require("http");
const utf8 = require("utf8");
const app = express();
const serverPort = 4000;
const server = http.createServer(app);
const fs = require("fs");
const path = require("path");
const Docker = require("dockerode");

server.listen(serverPort);

//socket.io instantiation
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

var dockerid = "";
//Socket Connection

io.on("connection", function (socket) {
  const docker = new Docker();
  console.log("New client connected");
  socket.on("disconnect", function () {
    console.log("Client disconnected");
    docker.getContainer(dockerid).kill();
    console.log("Container killed");
  });

  docker.createContainer(
    {
      Image: "ubuntu",
      Tty: true,
      OpenStdin: true,
      StdinOnce: true,
      WorkingDir: "/home/code",
      HostConfig: {
        AutoRemove: true,
        Binds: [`${__dirname + "/Dcode/"}:/home/code/`],
      }
    },
    function (err, container) {
      if (err) {
        console.log(err);
        return;
      }
      dockerid = container.id;
      container.attach(
        {
          stream: true,
          stdin: true,
          stdout: true,
          stderr: true,
        },
        function (err, stream) {
          if (err) {
            console.log(err);
            return;
          }
          socket.on("data", function (data) {
            stream.write(data);
          });
          stream.on("data", function (data) {
            socket.emit("data", utf8.decode(data.toString("binary")));
          });
          container.start(function (err, data) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Container started");
          });
          socket.on("msg", function (data) {
            fs.writeFile(
              path.join(__dirname, "/Dcode/index.js"),
              data,
              function (err) {
                if (err) {
                  console.log(err);
                  return;
                }
              }
            );
          });
        }
      );
    }
  );
});
