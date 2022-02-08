### PlayGround
>P.S. This Project Is Still In It's Initial Stages Of Development

#### [Back-End]
> The IDE backend is responsible for spinning up new Docker containers for each user. It use sockets to communicate from the browser client, and client pipe commands from the user’s terminal into his or her corresponding Docker container and it also pipe the container output back to the client. Meanwhile, it also have a process watching for file system changes and sending those down to the client so it can construct a representation of the file tree.

#### [Front-End]
> For file tree it uses React component that recurses over a JSON payload containing the names of the files and directories in the user’s container on the remote server. For the editor and terminal, it uses open-source libraries Monaco-editor and Xterm. It initialize a socket connection to backend server and push messages into the channel to which the server responds.

##### Screenshots
#### [Desktop]
![asset](https://github.com/JayGoyal96/PlayGround/blob/master/asset/1.png?raw=false)

## Dependencies
#### [Server]
* express
* socket.io
* dockerode
* utf8

#### [Client]
* monaco-editor
* socket.io-client
* xterm.js

## Setup
- Download and Install Docker Desktop Client
- Pull ubuntu container

```bash
docker pull jaygoyal96/linux
```
- Clone the repo and install the dependencies 

```bash
git clone https://github.com/JayGoyal96/PlayGround.git
cd client
npm install
cd ..
cd server
npm install
```
- To run the app, write

```bash
cd client
npm start
cd ..
cd server
npm start
```

##### Made with ♥ by <a href="https://github.com/jaygoyal96">Jay</a>


[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/jaygoyal96)
