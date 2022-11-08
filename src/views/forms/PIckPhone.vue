<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { user_edit_phone } from "../../apis/me.js";

const router = useRouter();
let phone = ref(null);

if (JSON.parse(localStorage.getItem("userinfo"))["phone"] !== null) {
  phone.value = JSON.parse(localStorage.getItem("userinfo"))["phone"]
};
let back = () => {
  history.back();
};
const confirm = () => {
  let new_phone = phone.value;

  user_edit_phone(localStorage.getItem("username"), new_phone).then((res) => {
    if (res["code"] === "success") {
      phone.value = new_phone;
      Notify.success("修改成功");
      history.back();
    }
  });
}


</script>
        
<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="title_forzen">
      <div class="icon_left">
        <nut-icon name="left" @click="back" size="28"></nut-icon>
      </div>
      <h1>修改电话号码</h1>
    </div>

    <nut-input label="手机号" desc="请输入手机号" v-model="phone" type="tel" />

    <nut-button type="primary" @click="confirm" class="button">确认修改</nut-button>

  </div>
</template>
        
<style scoped>
.page {
  overflow: auto;
  height: 100vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;
}

.title {
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.button {
  top: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 60%;
  border: 1px solid red;
}

.title_forzen {
  position: relative;
  left: 5%;
  top: 10px;
  width: 90%;
  height: 60px;
  /* border: 1px solid red; */
}

.title_forzen>h1 {
  position: absolute;
  left: 8%;
}

.icon_left {
  position: absolute;
  top: 8px;
}

.photo {
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

* {
  margin: 0px;
  padding: 0px;
}
</style>
        