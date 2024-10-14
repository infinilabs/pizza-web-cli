// @ts-ignore
import React, { useRef, useEffect, CSSProperties, useMemo } from "react";
import ace from "brace";
import { FormattedMessage } from "react-intl";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { SenseEditor } from "../entities/sense_editor";
import { LegacyCoreEditor } from "../modules/legacy_core_editor";
import ConsoleMenu from "./ConsoleMenu";
import { getDocumentation, autoIndent } from "../entities/console_menu_actions";
import { useSendCurrentRequestToES } from "../hooks/use_send_current_request_to_es";
import { useSetInputEditor } from "../hooks/use_set_input_editor";
import { retrieveAutoCompleteInfo } from "../modules/mappings/mappings.js";
import { useSaveCurrentTextObject } from "../hooks/use_save_current_text_object";
import { useEditorReadContext } from "../contexts/editor_context/editor_context";
import { useDataInit } from "../hooks/use_data_init";
import { useServicesContext } from "../contexts";
import { applyCurrentSettings } from "./apply_editor_settings";
import { subscribeResizeChecker } from "./subscribe_console_resize_checker";

import "antd/dist/antd.css";
import "./ConsoleInput.less";

const abs: CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
};

// interface IConsoleInputProps {
//   onExecuteCommand?: () => void;
//   onQueryHistoryCommands: () => void;
//   onLoadCommonCommands: () => void;
//   onPatchCommonCommand: (id: string, params: ICommonCommandParams) => void;
//   onDeleteCommonCommand: (id: string) => void;
// }

const SendRequestButton = (props: any) => {
  const { saveCurrentTextObjectRef, sendRequestToES } = props;

  const sendCurrentRequestToES = useSendCurrentRequestToES(sendRequestToES);
  const saveCurrentTextObject = useSaveCurrentTextObject();

  useEffect(() => {
    saveCurrentTextObjectRef.current = saveCurrentTextObject;
  }, [saveCurrentTextObjectRef]);

  return (
    <Tooltip
      title={<FormattedMessage id="console.SendRequestButton.ToolTip" />}
    >
      <button
        data-test-subj="sendRequestButton"
        aria-label={"Click to send request"}
        className="conApp__editorActionButton conApp__editorActionButton--success"
        onClick={sendCurrentRequestToES}
      >
        <PlayCircleOutlined />
      </button>
    </Tooltip>
  );
};

interface ConsoleInputProps {
  selectedCluster: any;
  initialText: string | undefined;
  saveEditorContent: (content: string) => void;
  paneKey: string;
  isActive: boolean;
  sendRequestToES: any;
  height?: string;
}

const DEFAULT_INPUT_VALUE = `GET _search
{
  "query": {
    "match_all": {}
  }
}`;

const ConsoleInputUI = ({
  selectedCluster,
  initialText,
  saveEditorContent,
  paneKey,
  height = "100%",
  isActive,
  sendRequestToES,
}: ConsoleInputProps) => {
  const { id: clusterID, endpoint } = selectedCluster;
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorActionsRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<SenseEditor | null>(null);

  const setInputEditor = useSetInputEditor();
  const consoleMenuRef = useRef<ConsoleMenu | null>(null);
  const aceEditorRef = useRef<ace.Editor | null>(null);

  const sendCurrentRequestToESRef = useRef(() => {});
  const saveCurrentTextObjectRef = useRef((content: string) => {});
  sendCurrentRequestToESRef.current = useSendCurrentRequestToES(sendRequestToES);

  const {
    services: { settings },
  } = useServicesContext();
  // if (isActive) {
  //   if (aceEditorRef.current) {
  //     aceEditorRef.current.focus();
  //   }
  // }

  useEffect(() => {
    const aceEditor = ace.edit(editorRef.current!);
    aceEditorRef.current = aceEditor;
    const legacyCoreEditor = new LegacyCoreEditor(
      aceEditor,
      editorActionsRef.current as HTMLElement
    );
    aceEditor.commands.addCommand({
      name: "exec_request",
      bindKey: { win: "Ctrl-enter", mac: "Command-enter|Ctrl-enter" },
      exec: () => {
        sendCurrentRequestToESRef.current();
        aceEditor.execCommand("iSearch");
      },
    });
    const senseEditor = new SenseEditor(legacyCoreEditor);
    // senseEditor.highlightCurrentRequestsAndUpdateActionBar();
    editorInstanceRef.current = senseEditor;
    setInputEditor(senseEditor);
    senseEditor.paneKey = paneKey;
    senseEditor.update(initialText || DEFAULT_INPUT_VALUE);
    applyCurrentSettings(senseEditor!.getCoreEditor(), {
      fontSize: 12,
      wrapMode: true,
    });

    function setupAutosave() {
      let timer: number;
      const saveDelay = 500;

      senseEditor.getCoreEditor().on("change", () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = window.setTimeout(saveCurrentState, saveDelay);
      });
    }

    function saveCurrentState() {
      try {
        const content = senseEditor.getCoreEditor().getValue();
        // saveCurrentTextObjectRef.current(content);
        saveEditorContent(content);
      } catch (e) {
        console.error(e);
        // Ignoring saving error
      }
    }

    const unsubscribeResizer = subscribeResizeChecker(
      editorRef.current!,
      senseEditor
    );
    setupAutosave();

    return () => {
      unsubscribeResizer();
      if (editorInstanceRef.current) {
        editorInstanceRef.current.getCoreEditor().destroy();
      }
    };
  }, []);
  useEffect(() => {
    if (clusterID) {
      // 初始化请求接口-检索自动完成信息
      // retrieveAutoCompleteInfo(settings, settings.getAutocomplete(), clusterID);
      aceEditorRef.current &&
        (aceEditorRef.current["clusterID"] = clusterID) &&
        (aceEditorRef.current["clusterInfo"] = selectedCluster);
    }
  }, [clusterID]);

  const handleSaveAsCommonCommand = async () => {
    const editor = editorInstanceRef.current;
    if (editor == null) {
      console.warn("editor is null");
      return;
    }
    const requests = await editor.getRequestsInRange();
    const formattedRequest = requests.map((request) => ({
      method: request.method,
      path: request.url,
      body: (request.data || []).join("\n"),
    }));
    return formattedRequest;
  };

  return (
    <div
      style={{ ...abs, height: height }}
      data-test-subj="console-application"
      className="conApp"
    >
      <div className="conApp__editor">
        <ul className="conApp__autoComplete" id="autocomplete" />
        <div
          className="conApp__editorActions"
          id="ConAppEditorActions"
          ref={editorActionsRef}
        >
          <SendRequestButton
            saveCurrentTextObjectRef={saveCurrentTextObjectRef}
            sendRequestToES={sendRequestToES}
          />

          <ConsoleMenu
            ref={consoleMenuRef}
            getCurl={() => {
              return editorInstanceRef.current!.getRequestsAsCURL(endpoint);
            }}
            getDocumentation={() => {
              return getDocumentation(editorInstanceRef.current!, "");
            }}
            autoIndent={(event) => {
              autoIndent(editorInstanceRef.current!, event);
            }}
            saveAsCommonCommand={handleSaveAsCommonCommand}
          />
        </div>
        <div
          ref={editorRef}
          id={`Editor_${editorInstanceRef.current?.paneKey}`}
          className="conApp__editorContent"
          data-test-subj="request-editor"
          onClick={() => {
            consoleMenuRef.current?.closePopover();
            aceEditorRef.current?.focus();
          }}
        />
      </div>
    </div>
  );
};

// const ConsoleInput = ({clusterID}:{clusterID:string})=>{
//   const { done, error, retry } = useDataInit();
//   const { currentTextObject } = useEditorReadContext();
//   return done ? <ConsoleInputUI clusterID={clusterID} initialText={currentTextObject?.text}/>: <></>
// }

// export default ConsoleInput;
export default ConsoleInputUI;
