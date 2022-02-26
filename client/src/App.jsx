import TerminalEditor from "./Terminal";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import socket from "./helper.jsx";
import Folder from "./Folder";
const App = () => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState("");
  const [files, setfiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("/Dcode/index.js");

  useEffect(() => {
    socket.emit("content",selectedFile);  //send the file name to the server

    socket.on("content", (data) => {
      setCode(data);
    });
  }, [selectedFile]);

  useEffect(() => {
    socket.emit("msg", code , selectedFile);
  }, [code]);

  useEffect(() => {
    socket.on("filesystem", (file) => {
      setfiles(file);
    });
  }, [files]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        background: "black",
        maxHeight: "100vh",
      }}
    >
      <div
        className="filesys"
        style={{ width: "20%", color: "white", overflowY: "scroll" }}
      >
        <Folder explorer={files} setlang={setSelectedLang} setFile={setSelectedFile}/>
      </div>

      <div style={{ display: "flex", width: "80%", flexDirection: "column" }}>
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
      </div>
    </div>
  );
};

export default App;
