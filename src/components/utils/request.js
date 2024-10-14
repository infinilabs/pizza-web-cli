/* eslint-disable no-prototype-builtins */
// import fetch from "dva/fetch";
import { Icon, notification } from "antd";
import hash from "hash.js";
import { isAntdPro } from "./utils";
import { FormattedMessage } from "react-intl";
import { getProjectID, getTeamID, removeProject, removeTeam } from "./router";
import styles from "./request.less";
import * as uuid from 'uuid';

export const formatResponse = (response) => {
  if (!response || !response.error) return response;
  let key;
  let msg;
  if (response.error.reason === 'context deadline exceeded') {
    key = 'error.timeout'
  } else {
    const errors = response.error.reason?.split(':');
    const errorKey = errors[0]?.endsWith('_error') ? errors[0] : 'unknown';
    key = errorKey !== 'unknown' && errors[1] ? `error.${errorKey}.${errors[1]}` : `error.${errorKey}`;
    msg = errors.slice(2).join(':')
  }

  return {
    ...response,
    errorObject: {
      id: uuid.v4(),
      key,
      msg
    }
  }
}

const checkStatus = async (response, noticeable, option = {}) => {
  const codeMessage = {
    200: FormattedMessage({ id: "app.message.http.status.200" }),
    201: FormattedMessage({ id: "app.message.http.status.201" }),
    202: FormattedMessage({ id: "app.message.http.status.202" }),
    204: FormattedMessage({ id: "app.message.http.status.204" }),
    400: FormattedMessage({ id: "app.message.http.status.400" }),
    401: FormattedMessage({ id: "app.message.http.status.401" }),
    403: FormattedMessage({ id: "app.message.http.status.403" }),
    404: FormattedMessage({ id: "app.message.http.status.404" }),
    406: FormattedMessage({ id: "app.message.http.status.406" }),
    410: FormattedMessage({ id: "app.message.http.status.410" }),
    422: FormattedMessage({ id: "app.message.http.status.422" }),
    500: FormattedMessage({ id: "app.message.http.status.500" }),
    502: FormattedMessage({ id: "app.message.http.status.502" }),
    503: FormattedMessage({ id: "app.message.http.status.503" }),
    504: FormattedMessage({ id: "app.message.http.status.504" }),
  };

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;

  if (response.status === 500) {
    const jsonRes = await response.clone().json();
    if ((jsonRes?.error && !jsonRes?.stack) || !jsonRes?.acknowledged) {
      if (noticeable) {
        let desc = "";
        if (typeof jsonRes?.error == "string") {
          desc = jsonRes.error;
        } else {
          if (jsonRes.error?.reason) {
            desc = jsonRes.error?.reason
          } else {
            desc = JSON.stringify(jsonRes.error);
          }
        }
        if (desc.startsWith("validate_team_error")) {
          removeTeam()
          removeProject()
          if (!window.showErrorModal) {
            window.showErrorModal = true
            // router.push("/exception/team")
          }
        } else if (desc.startsWith("validate_project_error")) {
          removeProject()
          if (!window.showErrorModal) {
            window.showErrorModal = true
            // router.push("/exception/project")
          }
        } else {
          notification.error({
            message: FormattedMessage({ id: "app.message.http.request.bad" }),
            description: FormattedMessage({ id: "app.message.http.request.bad.desc" }),
            icon: <Icon type="warning" theme="filled" />,
            className: styles.requestError
          });
        }
      }
      return response;
    }
  }

  if (
    noticeable &&
    option.hasOwnProperty("showErrorInner") &&
    option.showErrorInner === true
  ) {
    notification.error({
      message: response.statusText,
      description: errortext,
      icon: <Icon type="warning" theme="filled" />,
      className: styles.requestError
    });
    return response;
  }

  if (
    response.status != 500 &&
    response.status != 403 &&
    response.status != 401
  ) {
    if (noticeable) {
      notification.error({
        message: `${FormattedMessage({ id: "app.message.http.request.unknown" })}`,
        description: `${FormattedMessage({ id: "app.message.http.request.unknown.desc" })}`,
        icon: <Icon type="warning" theme="filled" />,
        className: styles.requestError
      });
    } else {
      return response
    }
  }

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response.statusText;
  error.rawResponse = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  option,
  returnRawResponse = false,
  noticeable = true
) {
  if (option?.queryParams && Object.keys(option.queryParams).length > 0) {
    let separator = "?";
    if (url.indexOf(separator) > -1) {
      separator = "&";
    }
    url +=
      separator +
      Object.entries(option.queryParams)
        .map((kvs) => kvs.join("="))
        .join("&");
  }
  const options = {
    expirys: isAntdPro(),
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : "");
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest("hex");

  const controller = new AbortController();
  const signal = controller.signal;

  if (!option?.ignoreTimeout) {
    let timeout = 60; //60s
    let minTimeout = 1; //1s
    if (option?.timeout && option.timeout >= minTimeout) {
      timeout = option.timeout;
    } else {
      let localTimeout = localStorage.getItem("timeout");
      if (localTimeout && localTimeout > minTimeout) {
        timeout = localTimeout;
      } else {
        localStorage.setItem("timeout", timeout);
      }
    }

    setTimeout(() => {
      controller.abort();
    }, timeout * 1000);
  }

  const defaultOptions = {
    credentials: "include",
    signal,
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      };
      if (typeof newOptions.body != "string")
        newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers,
      };
    }
  }

  newOptions.headers = {
    "Accept-Encoding": "gzip, deflate, br",
    ...newOptions.headers,
    "X-Team-ID": getTeamID(),
    "X-Project-ID": getProjectID(),
  };
  if (newOptions.noTeam || !getTeamID() || getTeamID() === "undefined" || getTeamID() === "null") {
    delete newOptions.headers["X-Team-ID"];
  }
  if (
    newOptions.noProject ||
    !getProjectID() ||
    getProjectID() === "undefined" ||
    getProjectID() === "null"
  ) {
    delete newOptions.headers["X-Project-ID"];
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  return (
    fetch(url, newOptions)
      .then((res) => checkStatus(res, noticeable, option))
      // .then(response => cachedSave(response, hashcode))
      .then((response) => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (returnRawResponse) {
          return response;
        }
        // if (newOptions.method === "DELETE" || response.status === 204) {
        //   return response.text();
        // }
        return response.json();
      })
      .catch((e) => {
        const status = e.name;
        if (status == "TypeError") {
          //connection refused
          const err = new Error();
          err.name = "ERR_CONNECTION_REFUSED";
          err.message = "Failed to connnect server";
          return err;
        }

        if (status === "AbortError") {
          if (noticeable) {
            notification.error({
              message: FormattedMessage({
                id: "app.message.http.request.timeout",
              }),
              description:
                FormattedMessage({
                  id: "app.message.description.http.request.timeout",
                }) +
                "\r\nURL:" +
                url,
              style: { wordBreak: "break-all" },
            });
          }
          return;
        }

        if (status === 401) {
          // @HACK
          if (url === "/account/profile") {
            // router.push("/user/login");
          } else {
            if (location.href.indexOf("user/login") === -1) {
              window.g_app._store.dispatch({
                type: "login/logout",
              });
            }
          }
        }
        // environment should not be used
        if (status === 403) {
          // router.push("/exception/403");
        }
        if (status == 500) {
          // router.push({
          //   pathname: "/exception/500",
          //   state: e.response,
          // });
        }
        if (status === 504) {
          return {
            error: {
              reason: FormattedMessage({ id: "app.message.http.status.504" })
            }
          };
        }
        // if (status >= 404 && status < 422) {
        //   router.push("/exception/404");
        // }

        if (returnRawResponse) {
          return e.rawResponse;
        }
        return e.response;
      })
  );
}
