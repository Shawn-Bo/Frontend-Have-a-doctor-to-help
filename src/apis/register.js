import { host, ip } from "./api.js";
let base_url = "http://"+ip+host;
export const register_new_user = async function(username, password){
  let res;
  await axios({
    method: "post",
    url: base_url+"register",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      username: username,
      password: password,
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}
