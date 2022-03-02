import TerminalEditor from "./Components/Terminal";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import Split from "react-split";
import socket from "./helper.jsx";
import Folder from "./Components/Folder";
import "./app.css";
const App = () => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState("");
  const [files, setfiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("/Dcode/index.js");

  useEffect(() => {
    socket.emit("content", selectedFile); //send the file name to the server

    socket.on("content", (data) => {
      setCode(data);
    });
  }, [selectedFile]);

  useEffect(() => {
    socket.emit("msg", code, selectedFile);
  }, [code]);

  useEffect(() => {
    socket.on("filesystem", (file) => {
      setfiles(file);
    });
  }, [files]);

  return (
    <Split
      sizes={[15, 85]}
      style={{
        display: "flex",
        background: "black",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="filesys"
        style={{ width: "20%", color: "white", overflowY: "scroll" }}
      >
        <Folder
          explorer={files}
          setlang={setSelectedLang}
          setFile={setSelectedFile}
        />
      </div>
      <Split direction="vertical" sizes={[70, 30]}>
        <Editor
          height="60vh"
          defaultLanguage={selectedLang}
          theme="vs-dark"
          defaultValue={code}
          onChange={(value) => {
            setCode(value);
          }}
          language={selectedLang}
          value={code}
          options={{
            scrollBeyondLastLine: false,
          }}
        />
        <TerminalEditor />
      </Split>
    </Split>
  );
};

export default App;
