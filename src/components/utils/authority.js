import { reloadAuthorized } from "./Authorized";
import request from "./request";

const AUTHORITIES_KEY = 'authorities'
const APP_SETTINGS = 'app_settings'

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('infini-console-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === "undefined"
      ? localStorage.getItem(AUTHORITIES_KEY)
      : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === "string") {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === "string" ? [authority] : authority;
  return localStorage.setItem(
    AUTHORITIES_KEY,
    JSON.stringify(proAuthority)
  );
}

export function hasAuthority(authority) {
  if (getAuthEnabled()) {
    const userAuthority = getAuthority() || [];
    return userAuthority.some((ua) => ua == authority);
  }
  return true;
}

export function removeAuthority() {
  localStorage.removeItem(AUTHORITIES_KEY)
  reloadAuthorized()
}

export function isAuthorityEmpty() {
  const authorities = getAuthority()
  return !authorities || authorities === 'undefined' || authorities === 'null'
}

export function getAuthEnabled() {
  const settings = getAppSettings();
  return settings.auth_enabled;
}

export const ON_PREMISES = "ON_PREMISES"
export const ON_CLOUD = "ON_CLOUD"

export function getAppSettings() {
  const strSettings = localStorage.getItem(APP_SETTINGS);
  let settings = {}
  if(strSettings){
    try{
      settings = JSON.parse(strSettings);
    }catch(e){
      console.error("parse app settings error: ", e);
    }
  }
  return settings;
}

export function isOnCloud() {
  return getAppSettings().deploy_mode === ON_CLOUD;
}

export function isOnPremises() {
  return getAppSettings().deploy_mode === ON_PREMISES;
}

export function getAppDomain() {
  return getAppSettings().domain || '';
}

export function getEmailSuffix() {
  return getAppSettings().brand_setting?.email_suffix || '';
}

export function getAppSubDomain() {
  const appDomain = getAppDomain()
  if (window.location.hostname.indexOf(appDomain) > 0) {
    return window.location.hostname.replace(`.${appDomain}`, "")
  }
}

export function getBrandSettings() {
  return getAppSettings().brand_setting || {};
}

export function isSetupRequired() {
  const value = getAppSettings().setup_required
  return typeof value !== 'undefined' ? value : true;
}

export function getAuthorizationHeader() {
  const responseStr = localStorage.getItem("login-response");
  if (responseStr) {
    let loginResponse = null;
    try {
      loginResponse = JSON.parse(responseStr);
    } catch (err) {
      console.error(err);
    }
    if (loginResponse) {
      return "Bearer " + loginResponse.access_token;
    }
  }
  return "";
}

(async function() {
  const appSettings = await request("/setting/application");
  if (appSettings && !appSettings.error) {
    const strSettings = JSON.stringify(appSettings)
    localStorage.setItem(APP_SETTINGS, strSettings);
    if (appSettings.setup_required) {
      window.location.href = '/#/guide'
    }
  } else {
    window.location.href = '/#/user/login'
  }
})();
