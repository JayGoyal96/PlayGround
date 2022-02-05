import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "./terminal.css";
import socket from "./helper";
const TerminalEditor = () => {
  const terminalContainer = useRef(null);
  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 15,
      theme: {
        background: '#181818',
      },
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalContainer.current);
    fitAddon.fit();
    socket.on("connect", function () {
      term.write("\r\n*** Connected to backend***\r\n");

      // Browser -> Backend
      term.onData((data) => {
        socket.emit("data", data);
      });

      // Backend -> Browser
      socket.on("data", function (data) {
        term.write(data);
      });

      socket.on("disconnect", function () {
        term.write("\r\n*** Disconnected from backend***\r\n");
      });
    });
    return () => {
      term.dispose();
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <div id="terminal-container" ref={terminalContainer}></div>
    </>
  );
};

export default TerminalEditor;
