import request from "@/utils/request";

export async function query() {
  return request("/api/users");
}

/**
 * 获取个人资料
 * @returns
 */
export async function queryCurrent() {
  return request("/account/profile");
}

/**
 * 获取团队列表
 * @returns
 */
export async function queryTeams() {
  return request(`/account/_stats`, { noTeam: true, noProject: true })
}

/**
 * 获取当前项目
 * @returns
 */
export async function queryProject(id) {
  return request(`/organization/project/${id}`)
}

/**
 * 获取应用列表
 * @returns
 */
export async function queryApps(id) {
  return request(`/account/app/setting`)
}

/**
 * 获取项目列表
 * @returns
 */
export async function queryProjects() {
  return request("/organization/project/_search", {
    method: "POST",
    noProject: true
  })
}

/**
 * 更新个人信息，包括 nickname、phone、email 等
 * @param {object} data
 * @returns
 */
export async function updateProfile(data) {
  return request("/account/profile", {
    method: "PUT",
    body: data,
  });
}

/**
 * 验证邮箱合法性
 * 在更新完新的邮箱之后，需要发送邮件到该邮箱来验证合法性，需要调用本接口来发送邮件。
 * @param {*} email
 * @returns
 */
export async function verifyEmail(email) {
  return request("/account/profile/_verify_email", {
    method: "POST",
    body: {
      email: email,
    },
  });
}
