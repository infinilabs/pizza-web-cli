import { useEffect, useState } from "react";
import ConsoleUI from "./components/DevTool/Console.jsx";
// import ConsoleUI from "../lib/bundle.js";

// 图标组件，可以按照这个示例修改
import { SearchEngineIcon } from "./components/lib/search_engines";
// 点击加号 ➕ 选择数据源的下拉组件，可以按照这个示例修改
import ClusterSelect from "./components/ClusterSelect";

function App() {
  const clusterList = [];
  const clusterStatus = undefined;

  const [ConsoleOpen, setConsoleOpen] = useState(true);

  useEffect(() => {
    const messageHandler = (event) => {
      console.log(121212121, event.data);
      if (event.data == true) {
        // 直接通过 DOM 操作修改内容
        setConsoleOpen(true)
      }
    };

    // 添加事件监听
    window.addEventListener("message", messageHandler);

    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // 点击执行操作按钮的方法
  // 参考文件 /src/components/vendor/console/hooks/use_send_current_request_to_es/send_request_to_es.ts
  const sendRequestPlay = () => {
  }

  return (
    <>
      {ConsoleOpen ? (
        <div
          style={{
            borderTop: "solid 1px #ddd",
            background: "#fff",
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 19999,
          }}
        >
          <ConsoleUI
            clusterList={clusterList}
            visible={false}
            minimize={true}
            onMinimizeClick={() => {
              setConsoleOpen(false);
              window.parent.postMessage(false, "*");
            }}
            clusterStatus={clusterStatus}
            resizeable={true}
            sendRequestToES={sendRequestPlay}
            SearchEngineIcon={SearchEngineIcon}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
