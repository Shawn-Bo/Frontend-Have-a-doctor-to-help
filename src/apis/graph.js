import { host, ip } from "./api.js";
let base_url = "http://"+ip+host;

// 根据输入实体，查询相邻的实体，最多返回30个，如果实体名为 random 则随机查询一系列实体。
export const graph_query = async function(entity_name){
  let res;
  await axios({
    method: "post",
    url: base_url+"graph/query",
    timeout: 4000, // 请求4秒无响应则会超时
    data: {
      entity_name: entity_name
    },
  }).then(function(response){
    res = response["data"];
  }).catch((error) => console.error("请求超时"));
  return res;
}