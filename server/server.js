const express = require("express");
const http = require("http");
const utf8 = require("utf8");
const app = express();
const serverPort = 4000;
const server = http.createServer(app);
const fs = require("fs");
const path = require("path");
const Docker = require("dockerode");
const dirTree = require("directory-tree");

server.listen(serverPort);

//socket.io instantiation
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let dockerid = "";
let files = [];
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
      Image: "jaygoyal96/linux",
      Tty: true,
      OpenStdin: true,
      StdinOnce: true,
      WorkingDir: "/home/code",
      HostConfig: {
        AutoRemove: true,
        Binds: [`${__dirname + "/Dcode/"}:/home/code/`],
        PortBindings: {
          "3000/tcp": [{ HostPort: "3001" }],
        },
      },
      ExposedPorts: {
        "3000/tcp": {},
      },
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
            files = dirTree("./Dcode/",{attributes:["type","extension"]});
            socket.emit("filesystem", files);
          });
          container.start(function (err, data) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Container started");
          });
        }
      );
    }
  );
  socket.on("msg", function (code, file) {
    fs.writeFile(path.join(__dirname, `/${file}`), code, function (err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
  socket.on("content", function (file) {
    fs.readFile(path.join(__dirname, `/${file}`), function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      socket.emit("content", data.toString());
    });
  });
});
