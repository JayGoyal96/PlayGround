import React from "react";

const Folder = ({ explorer, setlang ,setFile }) => {
  const [expand, setExpand] = React.useState(false);

  const extToLangID = (ext) => {
    switch (ext) {
      case ".js":
        return "javascript";

      case ".jsx":
        return "javascript";

      case ".html":
        return "html";

      case ".css":
        return "css";

      case ".json":
        return "json";
      
      case ".ts":
        return "typescript";

      case ".tsx":
        return "typescript";

      case ".py":
        return "python";

      case ".c":
        return "c";
        
      case ".cpp":
        return "cpp";

      case ".java":
        return "java";
      
      case ".md":
        return "markdown";

      case ".txt":
        return "text";

      case ".sh":
        return "shell";

      case ".xml":
        return "xml";

      case ".yml":
        return "yaml";

      default:
        break;
    }
  };

  const handleClick = (e) => {
    setFile(e.target.getAttribute("path"));
    setlang(extToLangID(e.target.getAttribute("ext")));
  };

  if (explorer.type === "directory") {
    return (
      <div>
        <span
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {explorer.name}
          <br />
        </span>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 15 }}>
          {explorer.children.map((exp) => {
            return (
              <Folder
                key={exp.name}
                explorer={exp}
                style={{ color: "white" }}
                setlang={setlang}
                setFile={setFile}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span onClick={handleClick} ext={explorer.extension} path={explorer.path}>
          {explorer.name}
        </span>
        <br />
      </div>
    );
  }
};

export default Folder;
