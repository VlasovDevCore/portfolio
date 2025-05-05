import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  prism,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import parse from "html-react-parser";
import copy from "clipboard-copy";

const parseWithSyntaxHighlighting = (html, isDarkTheme = true) => {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.name === "pre" && domNode.children?.[0]?.name === "code") {
        const codeNode = domNode.children[0];
        const language =
          codeNode.attribs?.class?.replace("language-", "") || "text";

        const codeText = codeNode.children[0]?.data || "";

        const handleCopy = () => {
          copy(codeText).then(() => {
            const copyBtn = document.getElementById(
              `copy-btn-${hashCode(codeText)}`
            );
            if (copyBtn) {
              copyBtn.textContent = "Теперь у вас есть это!";
              copyBtn.style.background = isDarkTheme ? "#2a2e37" : "#e0e0e0";
              setTimeout(() => {
                copyBtn.textContent = "Скопировать фрагмент";
                copyBtn.style.background = isDarkTheme ? "#1a1e24" : "#f5f5f5";
              }, 2000);
            }
          });
        };

        const hashCode = (str) =>
          str
            .split("")
            .reduce(
              (prevHash, currVal) =>
                ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
              0
            );

        return (
          <div className="relative group">
            <button
              id={`copy-btn-${hashCode(codeText)}`}
              onClick={handleCopy}
              className="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 bg-[#1a1e24] text-white transition-opacity"
            >
              Копировать
            </button>
            <SyntaxHighlighter
              language={language}
              style={isDarkTheme ? tomorrow : prism}
              showLineNumbers={true}
              customStyle={{
                background: isDarkTheme ? "#12151a" : "#dae9ff",
                borderRadius: "10px",
                margin: "16px 0",
                fontFamily: "'Fira Code', monospace",
                color: isDarkTheme ? "#ffffff" : "#000000",
                padding: "1rem",
                position: "relative",
                zIndex: 0,
              }}
            >
              {codeText}
            </SyntaxHighlighter>
          </div>
        );
      }
      return domNode;
    },
  });
};

export default parseWithSyntaxHighlighting;
