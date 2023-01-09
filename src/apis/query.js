import { host, ip } from "./api.js";
let base_url = "http://"+ip+host;

export const query_new_session = async function(username){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/new_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const query_get_session = async function(username, session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/get_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}


export const query_get_exported_session = async function(session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/get_exported_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      session_id: session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

//{"username": string, "session_id":string, "query_message":{"message_id": int, message_sender:string, "message_time": string, "message_text": string}}
export const query_go_session = async function(username, session_id, query_message){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/go_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
      query_message: query_message
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const query_go_exported_session = async function(username, session_id, query_message){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/go_exported_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
      query_message: query_message
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const query_export_session = async function(username, session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/export_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

// 返回用户名对应的所有sessions为一个列表
export const query_get_exported_sessions = async function(username){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/get_exported_sessions",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const query_get_public_sessions = async function(){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/get_public_sessions",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}


export const query_get_export_session = async function(username, exported_session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"/query/get_export_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      exported_session_id: exported_session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const query_delete_export_session = async function(username, exported_session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/delete_export_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      exported_session_id: exported_session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const query_publish_session = async function(username, session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/publish_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const mark_publish_session = async function(username, session_id){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/mark_publish_session",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const update_doctor_inquery = async function(username, session_id, status){
  let res;
  await axios({
    method: "post",
    url: base_url+"query/update_doctor_inquery",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      session_id: session_id,
      status: status
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}