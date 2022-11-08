<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { user_login } from "../apis/login.js";
import imgUrl from "../assets/logo.png";


const router = useRouter();
let username = ref("");
let password = ref("");

const login = function () {
  user_login(username.value, password.value).then(
    (res) => {
      if (res["code"] === "success") {
        localStorage.setItem("username", username.value);
        router.push("/home");
      } else {
        Notify.warn("登录失败");
      }
    });
};

</script>
    
<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="body">
      <h1 class="title">用户登录</h1>
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
      </nut-form>
      <router-link to="/register">
        <h4 class="center_text">没有账号，点击注册</h4>
      </router-link>
      <nut-button type="primary" class="button" size="large" @click="login">点击登录</nut-button>

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
    