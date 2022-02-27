import React from "react";
import "./folder.css";
const Folder = ({ explorer, setlang, setFile }) => {
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

      case ".xml":
        return "xml";

      case ".yml":
        return "yaml";

      case ".gitignore":
        return "gitignore";

      default:
        return "file";
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
          className={`flex ${!expand ? "fclosed" : "fopen"}`}
        >
          {explorer.name}
          <br />
        </span>
        <div style={{ paddingLeft: 15 }}>
          {expand && explorer.children.map((exp) => {
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
      <div style={{display:"flex"}}>
        <span
          onClick={handleClick}
          ext={explorer.extension}
          path={explorer.path}
          className={"flex "+extToLangID(explorer.extension)}
        >
          {explorer.name}
        </span>
        <br />
      </div>
    );
  }
};

export default Folder;
