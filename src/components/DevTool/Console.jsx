/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Icon } from "antd";
import { useState, useReducer, useCallback, useEffect, useRef } from "react";
import { Resizable } from "re-resizable";
import { IntlProvider } from "react-intl";

import NewTabMenu from "./NewTabMenu";
import { TabTitle } from "./console_tab_title";
import { DraggableTabs } from "../infini/tabs/DraggableTabs";
import Tabs from "../infini/tabs";
import { ResizeBar } from "../infini/resize_bar";
import Console from "../vendor/console/components/Console";
import { setClusterID } from "../vendor/console/modules/mappings/mappings.js";
import { useLocalStorage } from "../lib/hooks/storage";
import maximizeSvg from "../Icon/window-maximize.svg";
import restoreSvg from "../Icon/window-restore.svg";
import PizzaImg from "../Icon/pizza";

import "./utility.less";

import enMessages from "../locales/en-US";
import zhMessages from "../locales/zh-CN";

const messages = {
  en: enMessages,
  zh: zhMessages,
};
const language = navigator.language.split(/[-_]/)[0]; // 根据浏览器语言设置语言
console.log("language", language);

const MaximizeIcon = (props = {}) => {
  return <img height="14px" width="14px" {...props} src={maximizeSvg} />;
};
const RestoreIcon = (props = {}) => {
  return <img height="14px" width="14px" {...props} src={restoreSvg} />;
};

const { TabPane } = Tabs;

const TabConsole = (props) => {
  return <Console {...props} />;
};

const addTab = (state, action) => {
  const { panes } = state;
  const { cluster } = action.payload;
  const activeKey = `${cluster.id}:${new Date().valueOf()}`;
  panes.push({
    key: activeKey,
    cluster_id: cluster.id,
    title: cluster.name,
    cluster,
  });
  return {
    ...state,
    panes,
    activeKey,
  };
};
const removeTab = (state, action) => {
  const { activeKey, panes } = state;
  const { targetKey } = action.payload;

  const newPanes = panes.filter((pane) => pane.key !== targetKey);
  return {
    ...state,
    panes: newPanes,
    activeKey: activeKey == targetKey ? newPanes[0]?.key : activeKey,
  };
};

const consoleTabReducer = (state, action) => {
  const { type, payload } = action;
  let newState = state;
  switch (type) {
    case "add":
      newState = addTab(state, action);
      break;
    case "remove":
      newState = removeTab(state, action);
      break;
    case "change":
      newState = {
        ...state,
        activeKey: payload.activeKey,
      };
      break;
    case "saveTitle":
      const { key, title } = action.payload;
      const newPanes = state.panes.map((pane) => {
        if (pane.key == key) {
          return {
            ...pane,
            title,
          };
        }
        return pane;
      });
      newState = {
        ...state,
        panes: newPanes,
      };
      break;
    case "saveContent":
      const panes = state.panes.map((pane) => {
        if (pane.key == state.activeKey) {
          return {
            ...pane,
            content: action.payload.content,
          };
        }
        return pane;
      });
      newState = {
        ...state,
        panes,
      };
      break;
    case "saveOrder":
      newState = {
        ...state,
        order: action.payload.order,
      };
      break;
    case "init":
      newState = action.payload;
    default:
  }
  // setLocalState(newState);
  return newState;
};

function calcHeightToPX(height) {
  const intHeight = parseInt(height);
  if (height.endsWith("vh")) {
    return (
      (Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) *
        intHeight) /
      100
    );
  } else {
    return intHeight;
  }
}
// const defaultState = { panes: [], activeKey: "" };
const defaultState = {
  activeKey: "cqhngq82sdb12fth1d3g:1721989243672",
  panes: [
    {
      key: "cqhngq82sdb12fth1d3g:1721989243672",
      cluster_id: "cqhngq82sdb12fth1d3g",
      title: "easysearch",
      cluster: {
        cluster_uuid: "Xo_nz7q9RneFTBJIN6FnBA",
        created: "2024-07-26T18:20:25.867356+08:00",
        credential_id: "cqhngq82sdb12fth1d40",
        discovery: { enabled: true, refresh: {} },
        distribution: "easysearch",
        enabled: true,
        endpoint: "https://127.0.0.1:9200",
        host: "127.0.0.1:9200",
        id: "cqhngq82sdb12fth1d3g",
        k8s_cluster_id: "",
        k8s_instance_name: "",
        k8s_namespace: "",
        labels: { health_status: "yellow" },
        location: { provider: "on_premises", region: "default" },
        metadata_configs: {
          cluster_settings_check: { enabled: true, interval: "10s" },
          health_check: { enabled: true, interval: "10s" },
          metadata_refresh: { enabled: true, interval: "10s" },
          node_availability_check: { enabled: true, interval: "10s" },
        },
        metric_collection_mode: "agentless",
        monitor_configs: {
          cluster_health: { enabled: true, interval: "10s" },
          cluster_stats: { enabled: true, interval: "10s" },
          index_stats: { enabled: true, interval: "10s" },
          node_stats: { enabled: true, interval: "10s" },
        },
        monitored: true,
        name: "easysearch",
        on_premises_type: "",
        raw_name: "easysearch",
        region_id: "cqhnfio2sdb12fth1bpg",
        schema: "https",
        source: "elastic",
        tags: ["default"],
        tenant: {
          domain: "infini",
          id: "cqhlse02sdb0le811fug",
          name: "infini",
        },
        updated: "2024-07-26T18:20:37.29933+08:00",
        version: "1.7.1",
      },
      closable: true,
      content:
        'GET _search\n{\n  "query": {\n    "match_all": {}\n  }\n}\n\nGET /.infini_k8sconfig/_doc/crgldsg2sdbfgjhp5l4g\n',
    },
    {
      key: "cqhngq82sdb12fth1d3g:1721989243622",
      cluster_id: "cqhngq82sdb12fth1d3g",
      title: "easysearch",
      cluster: {
        cluster_uuid: "Xo_nz7q9RneFTBJIN6FnBA",
        created: "2024-07-26T18:20:25.867356+08:00",
        credential_id: "cqhngq82sdb12fth1d40",
        discovery: { enabled: true, refresh: {} },
        distribution: "easysearch",
        enabled: true,
        endpoint: "https://127.0.0.1:9200",
        host: "127.0.0.1:9200",
        id: "cqhngq82sdb12fth1d3g",
        k8s_cluster_id: "",
        k8s_instance_name: "",
        k8s_namespace: "",
        labels: { health_status: "yellow" },
        location: { provider: "on_premises", region: "default" },
        metadata_configs: {
          cluster_settings_check: { enabled: true, interval: "10s" },
          health_check: { enabled: true, interval: "10s" },
          metadata_refresh: { enabled: true, interval: "10s" },
          node_availability_check: { enabled: true, interval: "10s" },
        },
        metric_collection_mode: "agentless",
        monitor_configs: {
          cluster_health: { enabled: true, interval: "10s" },
          cluster_stats: { enabled: true, interval: "10s" },
          index_stats: { enabled: true, interval: "10s" },
          node_stats: { enabled: true, interval: "10s" },
        },
        monitored: true,
        name: "easysearch",
        on_premises_type: "",
        raw_name: "easysearch",
        region_id: "cqhnfio2sdb12fth1bpg",
        schema: "https",
        source: "elastic",
        tags: ["default"],
        tenant: {
          domain: "infini",
          id: "cqhlse02sdb0le811fug",
          name: "infini",
        },
        updated: "2024-07-26T18:20:37.29933+08:00",
        version: "1.7.1",
      },
      closable: true,
      content:
        '111111111GET _search\n{\n  "query": {\n    "match_all": {}\n  }\n}\n\nGET /.infini_k8sconfig/_doc/crgldsg2sdbfgjhp5l4g\n',
    },
  ],
};

const ConsoleUI = ({
  minimize = false,
  onMinimizeClick,
  resizeable = false,
  height = "50vh",
  mode = "global",
  sendRequestToES,
  SearchEngineIcon,
  DataSourceSelector,
}) => {
  const initialDefaultState = () => {
    return defaultState;
  };

  const console_state_key = `console:state:`;
  const [localState, setLocalState, removeLocalState] = useLocalStorage(
    console_state_key,
    initialDefaultState,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
  );
  const [tabState, dispatch] = useReducer(consoleTabReducer, localState);

  useEffect(() => {
    if (panes.length == 0) {
      //reset tabState
      dispatch({
        type: "init",
        payload: initialDefaultState(),
      });
      //removeLocalState();
      return;
    }
    if (
      !panes.some((pane) => {
        return pane.key == tabState.activeKey;
      })
    ) {
      dispatch({
        type: "change",
        payload: {
          activeKey: panes[0].key,
        },
      });
    }
    tabState.panes = panes;

    setLocalState(tabState);
  }, [tabState, dispatch]);

  const saveEditorContent = useCallback(
    (content) => {
      dispatch({
        type: "saveContent",
        payload: {
          content,
        },
      });
    },
    [dispatch]
  );

  const onChange = (activeKey) => {
    dispatch({
      type: "change",
      payload: {
        activeKey,
      },
    });
  };

  const onEdit = (targetKey, action) => {
    dispatch({
      type: action,
      payload: {
        targetKey,
      },
    });
  };

  const newTabClick = useCallback((param) => {
    dispatch({
      type: "add",
      payload: {
        cluster: param,
      },
    });
  }, []);

  const rootRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenClick = () => {
    if (rootRef.current != null) {
      if (!isFullscreen) {
        rootRef.current.className = rootRef.current.className + " fullscreen";
        // rootRef.current.style.overflow = 'scroll';
      } else {
        rootRef.current.className = rootRef.current.className.replace(
          " fullscreen",
          ""
        );
        enableWindowScroll();
      }
    }
    setEditorHeight(rootRef.current.clientHeight);
    setIsFullscreen(!isFullscreen);
  };
  const onInnerMinimizeClick = useCallback(
    (e) => {
      onMinimizeClick(e);
      enableWindowScroll();
    },
    [onMinimizeClick]
  );

  setClusterID(tabState.activeKey?.split(":")[0]);
  const panes = tabState.panes.map((pane) => {
    pane.closable = true;
    return pane;
  });
  if (panes.length == 1) {
    panes[0].closable = false;
  }

  const tabBarExtra = {
    left: (
      <div className="tabbar-icon" onClick={onInnerMinimizeClick}>
        <Icon
          component={PizzaImg}
          style={{ fontSize: "24px", verticalAlign: "middle" }}
        />
      </div>
    ),
    right: (
      <>
        {minimize ? (
          <div className="tabbar-icon" onClick={onInnerMinimizeClick}>
            <Icon type="minus" />
          </div>
        ) : null}
        <div className="tabbar-icon" onClick={fullscreenClick}>
          {isFullscreen ? <RestoreIcon /> : <MaximizeIcon />}
        </div>
      </>
    ),
    append: (
      <NewTabMenu
        onItemClick={newTabClick}
        width="300px"
        panes={panes}
        DataSourceSelector={DataSourceSelector}
      >
        <div className="tabbar-icon">
          <Icon type="plus" />
        </div>
      </NewTabMenu>
    ),
  };

  const saveTitle = (key, title) => {
    dispatch({
      type: "saveTitle",
      payload: {
        key,
        title,
      },
    });
  };
  const [editorHeight, setEditorHeight] = useState(calcHeightToPX(height));
  const onResize = (_env, _dir, refToElement, delta) => {
    // console.log(refToElement.offsetHeight, delta)
    setEditorHeight(refToElement.clientHeight);
  };

  useEffect(() => {
    const winResize = () => {
      if (isFullscreen) {
        setEditorHeight(rootRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", winResize);
    return () => {
      window.removeEventListener("resize", winResize);
    };
  }, [isFullscreen]);

  const disableWindowScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableWindowScroll = () => {
    document.body.style.overflow = "";
  };
  const onTabNodeMoved = (newOrder) => {
    dispatch({
      type: "saveOrder",
      payload: {
        order: newOrder,
      },
    });
  };
  useEffect(() => {
    if (mode != "global") {
      return;
    }
    var sl = document.querySelector("#root>div");
    if (sl) {
      if (typeof editorHeight == "number")
        sl.style.paddingBottom = editorHeight + "px";
      else {
        sl.style.paddingBottom = editorHeight;
      }
    }
  }, [editorHeight]);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Resizable
        defaultSize={{
          height: editorHeight || "50vh",
        }}
        minHeight={70}
        maxHeight="100vh"
        handleComponent={{ top: <ResizeBar /> }}
        onResize={onResize}
        enable={{
          top: resizeable,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <div
          style={{ background: "#fff", height: "100%" }}
          onMouseOver={disableWindowScroll}
          onMouseOut={enableWindowScroll}
          id="console"
          ref={rootRef}
        >
          <DraggableTabs
            onChange={onChange}
            activeKey={tabState.activeKey}
            type="editable-card"
            onEdit={onEdit}
            hideAdd
            initialOrder={tabState.order}
            tabBarExtraContent={tabBarExtra}
            onTabNodeMoved={onTabNodeMoved}
          >
            {panes.length === 0 ? (
              <div>no data</div>
            ) : (
              panes.map((pane) => (
                <TabPane
                  tab={
                    <TabTitle
                      title={pane.title}
                      onTitleChange={(title) => {
                        saveTitle(pane.key, title);
                      }}
                      distribution={pane.cluster.distribution}
                      SearchEngineIcon={SearchEngineIcon}
                    />
                  }
                  key={pane.key}
                  closable={pane.closable}
                >
                  <TabConsole
                    height={editorHeight - 35}
                    selectedCluster={pane.cluster}
                    paneKey={pane.key}
                    saveEditorContent={saveEditorContent}
                    initialText={pane.content}
                    isActive={pane.key == tabState.activeKey}
                    sendRequestToES={sendRequestToES}
                  />
                  {/*  {pane.content} */}
                </TabPane>
              ))
            )}
          </DraggableTabs>
        </div>
      </Resizable>
    </IntlProvider>
  );
};

export default ConsoleUI;
