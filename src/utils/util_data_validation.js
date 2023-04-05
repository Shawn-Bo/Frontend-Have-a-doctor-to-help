/**
 * 本工具脚本用于数据有效性检验。
 * 统一函数命名格式： xxx_is_valid(input_data) -> is_valid(bool)
 */


// 检查密码有效性。包含大小写字母、数字和特殊字符且长度大于8才算正确。
export const password_is_valid = function (password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,./<>?;':"`~])/;
  return regex.test(password) && password.length >= 8;
}

// 检查用户名有效性。只能包含汉字、大小写字母或数字，否则无效。
export const username_is_valid = function (username) {
  var regex = /^[\u4E00-\u9FA5a-zA-Z0-9]+$/; // \u4E00-\u9FA5 匹配汉字
  console.log(username);
  return regex.test(username) && username.length > 0;
}