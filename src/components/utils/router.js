/* eslint-disable no-extra-boolean-cast */
const TEAM_ID_KEY = "team_id";
const TEAM_NAME_KEY = "team_name";
const PROJECT_ID_KEY = "project_id";
const PROJECT_NAME_KEY = "project_name";
const CLUSTER_ID_KEY = "cluster_id";
const CLUSTER_NAME_KEY = "cluster_name";

export const getTeamID = () => {
  return localStorage.getItem(TEAM_ID_KEY);
};

export const isTeamIDValid = () => {
  return /^[A-Za-z0-9]{20}$/.test(getTeamID())
}

export const getTeamName = () => {
  return localStorage.getItem(TEAM_NAME_KEY);
};

export const setTeam = (id, name) => {
  localStorage.setItem(TEAM_ID_KEY, id);
  localStorage.setItem(TEAM_NAME_KEY, name);
};

export const removeTeam = () => {
  localStorage.removeItem(TEAM_ID_KEY);
  localStorage.removeItem(TEAM_NAME_KEY);
};

export const getProjectID = () => {
  return localStorage.getItem(PROJECT_ID_KEY);
};

export const isProjectIDValid = () => {
  return /^[A-Za-z0-9]{20}$/.test(getProjectID())
}

export const getProjectName = () => {
  return localStorage.getItem(PROJECT_NAME_KEY);
};

export const setProject = (id, name) => {
  localStorage.setItem(PROJECT_ID_KEY, id);
  localStorage.setItem(PROJECT_NAME_KEY, name);
};

export const removeProject = () => {
  localStorage.removeItem(PROJECT_ID_KEY);
  localStorage.removeItem(PROJECT_NAME_KEY);
};

export const getClusterID = () => {
  return localStorage.getItem(CLUSTER_ID_KEY);
};

export const getClusterName = () => {
  return localStorage.getItem(CLUSTER_NAME_KEY);
};

export const setCluster = (id, name) => {
  localStorage.setItem(CLUSTER_ID_KEY, id);
  localStorage.setItem(CLUSTER_NAME_KEY, name);
};

export const formatLink = (link) => {
  if (!link || !(link.startsWith("/infra") || link.startsWith("/apps")))
    return link;

  const { hash } = window.location;
  const splits = hash.split("/");
  let perfix = "";
  if (splits[1] === "team") {
    perfix += `/team/${splits[2]}`;
  } else {
    perfix += `/team/${getTeamID()}`;
  }
  if (link.startsWith("/apps")) {
    if (splits[3] === "project") {
      perfix += `/project/${splits[4]}`;
    } else {
      perfix += `/project/${getProjectID()}`;
    }
  }

  return `${perfix}${link}`;
};

export const replaceLink = (link, params) => {
  if (!link) return link;
  const splits = link.split("/");
  if (splits[1] === "team" && params.teamID) {
    link = link.replace(splits[2], params.teamID);
  }
  if (splits[3] === "project" && params.projectID) {
    link = link.replace(splits[4], params.projectID);
  }
  return link;
};

export const getParamsFromLink = (link) => {
  if (!link) return {};
  const splits = link.split("/");
  const params = {};
  if (splits[1] === "team") {
    params.teamID = splits[2];
  }
  if (splits[3] === "project") {
    params.projectID = splits[4];
  }
  return params;
};

export const onClusterChange = (clusterID, cluster = {}) => {
  setCluster(clusterID, cluster.name);
};

export const checkRouter = (path, teams = []) => {
  if (teams.length === 0) return "";
  const params = getParamsFromLink(path.replace("/#", ""));
  const team = teams.find((item) => item.id === params.teamID || item.id === getTeamID())
  if (!!team) {
    setTeam(team.id, team.name)
    if(team.default_project) {
      setProject(team.default_project?.id, team.default_project?.name)
    } else {
      removeProject()
    }
    return path
  } else {
    setDefaultTeam(teams)
    return `/#/team/${getTeamID()}/project/${getProjectID()}`;
  }
}

export const setDefaultTeam = (teams) => {
  if (!teams || teams.length === 0) return;
  const newTeam = teams.find((item) => item.name === 'default')
  if (newTeam) {
    setTeam(newTeam.id, newTeam.name)
    if(newTeam.default_project) {
      setProject(newTeam.default_project?.id, newTeam.default_project?.name)
    } else {
      removeProject()
    }
  } else {
    setTeam(teams[0].id, teams[0].name)
    removeProject()
  }
}

export const removeTeamCache = () => {
  localStorage.removeItem(TEAM_ID_KEY);
  localStorage.removeItem(TEAM_NAME_KEY);
  localStorage.removeItem(PROJECT_ID_KEY);
  localStorage.removeItem(PROJECT_NAME_KEY);
}
