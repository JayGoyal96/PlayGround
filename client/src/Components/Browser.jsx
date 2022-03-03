import React, { useRef } from "react";
const Browser = ({ link, setlink }) => {
  const frame = useRef(null);
  return (
    <div className="w-100 h-100">
      <div
        style={{
          height: "3%",
        }}
        className="w-100"
      >
        <div
          style={{
            padding: 0,
            cursor: "pointer",
            justifyContent: "space-between",
          }}
          className="flex m-0"
        >
          <div className="flex">
            <p className="m-0">◀</p>
            <p className="m-0">▶</p>
            <p
              onClick={() => {
                document.getElementById("iframe").src += "";
              }}
              className="m-0"
            >
              🔁
            </p>
          </div>
          <div className="w-100">
            <input type="text" defaultValue={link} style={{ width: "98%" }} />
          </div>
          <a href={link} target="_blank" id="button">
            🔳
          </a>
        </div>
      </div>
      <iframe
        ref={frame}
        id="iframe"
        title="output"
        src={link}
        frameBorder="0"
        style={{
          border: "0",
          background: "white",
          height: "96%",
          margin: "3px 0 0 0",
        }}
        className="w-100"
      ></iframe>
    </div>
  );
};

export default Browser;
