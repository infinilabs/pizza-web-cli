import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./index.css"

const Test = () => {
  return (
    <div>
      <App />
    </div>
  );
};

ReactDOM.render(<Test />, document.getElementById("root"));

// function render(props) {
//   const { container } = props;
//   ReactDOM.render(
//     <Test />,
//     container
//       ? container.querySelector("#root")
//       : document.querySelector("#root")
//   );
// }

// if (!window.__POWERED_BY_QIANKUN__) {
//   render({});
// }

// export async function bootstrap() {
//   console.log("[react16] react app bootstraped");
// }

// export async function mount(props) {
//   console.log("[react16] props from main framework", props);
//   render(props);
// }

// export async function unmount(props) {
//   const { container } = props;
//   ReactDOM.unmountComponentAtNode(
//     container
//       ? container.querySelector("#root")
//       : document.querySelector("#root")
//   );
// }
