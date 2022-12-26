import { host, ip } from "./api.js";
let base_url = "http://"+ip+host;


export const get_doctors = async function(){
  let res;
  await axios({
    method: "post",
    url: base_url+"doctor/get_doctors",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}