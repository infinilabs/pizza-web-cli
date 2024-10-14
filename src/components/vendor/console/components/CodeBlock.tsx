import React, { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const CodeBlock = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      {code ? (
        <Tooltip title={isCopied ? "Copied!" : "Copy"}>
          <CopyOutlined
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1,
              border: "none",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={handleCopy}
          />
        </Tooltip>
      ) : null}
      {code ? (
        <pre
          style={{
            padding: "8px",
            margin: 0,
            backgroundColor: "F5F7FA",
            color: "#343741",
            fontSize: "12px",
            fontWeight: 400,
            border: "none",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowX: "auto",
          }}
        >
          <code>{code}</code>
        </pre>
      ) : null}
    </div>
  );
};

export default CodeBlock;
