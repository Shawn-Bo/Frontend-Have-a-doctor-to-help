import { host, ip } from "./api.js";
let base_url = "http://"+ip+host;

export const user_get = async function(username){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/get",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const user_edit_sex = async function(username, sex){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/edit_sex",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      sex: sex,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}
export const user_edit_phone = async function(username, phone){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/edit_phone",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      phone: phone,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const user_edit_birth = async function(username, birth){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/edit_birth",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      birth: birth,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const user_edit_region = async function(username, region){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/edit_region",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      region: region,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const user_edit_info = async function(username, info){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/edit_info",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      info: info,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}
export const user_edit_avatar = async function(username, avatar){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/edit_avatar",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      avatar: avatar,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}

export const certified_as_a_doctor = async function(username, real_name, career_year, hospital, post, good_at, wechat){
  let res;
  await axios({
    method: "post",
    url: base_url+"user/certified_as_a_doctor",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      real_name: real_name,
      career_year: career_year,
      hospital: hospital,
      post: post,
      good_at: good_at,
      wechat: wechat
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}