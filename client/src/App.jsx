import TerminalEditor from "./Terminal";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import socket from "./helper.jsx";
const App = () => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState(`console.log("Hello World!");\n`);
  const [files, setfiles] = useState([]);
  useEffect(() => {
    socket.emit("msg", code);
  }, [code]);
  useEffect(() => {
    socket.on("filesystem", (file) => {
      setfiles(file);
    });
  }, [files]);
  return (
    <div style={{ width: "100%",display:"flex",background:"black"}}>
      <div className="filesys" style={{width:"20%",color:"white"}}>
        <ul>
          {files.map((file) => {
            return <li>{file}</li>;
          })}
        </ul>
      </div>
      <div style={{ display: "flex", width: "80%" , flexDirection:"column"}}>
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
