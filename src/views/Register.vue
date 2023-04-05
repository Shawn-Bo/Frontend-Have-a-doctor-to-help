<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { register_new_user } from "../apis/register.js";
import imgUrl from "../assets/logo.png";
import { password_is_valid, username_is_valid } from "../utils/util_data_validation.js";

const router = useRouter();
let username = ref("");
let password = ref("");
let checked = ref(false);

const register = function () {
  if (!username_is_valid(username.value)) {
    Notify.warn("用户名不能为空，且只能由字母、数字、汉字组成！");
    return;
  }

  if (!password_is_valid(password.value)) {
    Notify.warn("密码至少长8位，且必须包含大小写字母、数字和特殊字符！");
    return;
  }

  if (!checked.value) {
    Notify.warn("请先阅读并同意服务协议和隐私保护协议！");
    return;
  }

  register_new_user(username.value, password.value).then(
    (res) => {
      if (res["code"] === "success") {
        router.push("/login");
      } else {
        Notify.warn("该用户名已被注册");
      }
    });
};

</script>
  
<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="body">

      <h1 class="title">用户注册</h1>
      <div class="photo">
        <nut-image :src="imgUrl" width="180" height="180"></nut-image>
      </div>

      <nut-form>
        <nut-form-item label="用户名" v-model="username">
          <input class="nut-input-text" placeholder="请输入用户名" type="text" v-model="username" />
        </nut-form-item>
        <nut-form-item label="密码" v-model="password">
          <input class="nut-input-text" placeholder="请输入密码" type="password" v-model="password" />
        </nut-form-item>
        <nut-form-item label="确认密码">
          <input class="nut-input-text" placeholder="请再次输入密码" type="password" />
        </nut-form-item>
      </nut-form>
      <div class="agreement">
        <nut-switch v-model="checked" />
        <small>
          我已阅读并同意
          <router-link to="/">服务协议</router-link>
          和
          <router-link to="/">隐私保护协议</router-link>
        </small>
      </div>


      <router-link to="/login">
        <h4 class="center_text" to="/login">已有账号，点击登录</h4>
      </router-link>
      <nut-button type="primary" class="button" size="large" @click="register">点击注册</nut-button>
    </div>
  </div>
</template>
  
<style scoped>
.page {
  overflow: hidden;
  height: 100vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;

}

.body {
  position: absolute;
  left: 5%;
  width: 90%;
}

.title {
  width: fit-content;

  /* border:1px solid red; */
}

.center_text {
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);

  /* border:1px solid red; */
}

.button {
  width: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}


.photo {
  position: relative;
  top: 0px;
  width: min-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.agreement {
  text-align: center;
  /* border: 1px solid red; */
  position: relative;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
  