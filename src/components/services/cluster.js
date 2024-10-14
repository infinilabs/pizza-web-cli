import request from "../utils/request";
import { buildQueryArgs, ESPrefix } from "./common";

export async function getClusterVersion(params) {
  return request(`${ESPrefix}/${params.cluster}/version`, {
    method: "GET",
  });
}

export async function getClusterMetrics(params) {
  let id = params.cluster_id;
  delete params["cluster_id"];
  return request(
    `${ESPrefix}/${id}/metrics?min=${params.timeRange.min}&max=${params.timeRange.max}`,
    {
      method: "GET",
    }
  );
}

export async function createClusterConfig(params) {
  return request(`${ESPrefix}/`, {
    method: "POST",
    body: params,
  }, false, false);
}

export async function updateClusterConfig(params) {
  let id = params.id;
  delete params["id"];
  return request(`${ESPrefix}/${id}`, {
    method: "PUT",
    body: params,
  }, false, false);
}

export async function deleteClusterConfig(params) {
  return request(`${ESPrefix}/${params.id}`, {
    method: "DELETE",
    body: params,
  });
}

export async function searchClusterConfig(params) {
  let url = `${ESPrefix}/_search`;
  let args = buildQueryArgs(params);
  if (args.length > 0) {
    url += args;
  }
  return request(url, {
    method: "GET",
  });
}

export async function getClusterOverviewList() {
  let url = `${ESPrefix}/cluster/overview/list`;
  return request(url, {
    method: "GET",
  });
}

export async function getClusterStatus() {
  let url = `${ESPrefix}/status`;
  return request(url, {
    method: "GET",
  });
}

export async function tryConnect(params) {
  let url = `${ESPrefix}/try_connect`;

  return request(url, {
    method: "POST",
    body: params,
  }, false, false);
}

export async function getClusterConfig(params) {
  let url = `${ESPrefix}/${params.id}`;
  return request(url, {
    method: "GET",
  });
}
