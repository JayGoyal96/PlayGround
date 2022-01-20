import TerminalEditor from "./Terminal";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import socket from "./helper.jsx";
const App = () => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState(
    `console.log("Hello World!");\n`
  );
  useEffect(() => {
    socket.emit("msg", code);
    }, [code]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Editor
        height="80vh"
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
  );
};

export default App;
