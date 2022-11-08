<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { user_edit_info } from "../../apis/me.js";
const router = useRouter();
let info = ref(null);

if (JSON.parse(localStorage.getItem("userinfo"))["info"] !== null) {
  info.value = JSON.parse(localStorage.getItem("userinfo"))["info"]
};
let back = () => {
  history.back();
};
const confirm = () => {
  let new_info = info.value;
  console.log(new_info)

  user_edit_info(localStorage.getItem("username"), new_info).then((res) => {
    if (res["code"] === "success") {
      info.value = new_info;
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
      <h1>修改个性签名</h1>
    </div>

    <nut-input label="个性签名" desc="请输入个性签名" v-model="info" type="tel" />

    <nut-button type="primary" @click="confirm" class="button">确认修改</nut-button>

  </div>
</template>
          
<style scoped>
.title {
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.button {
  position: relative;
  top: 20px;
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


* {
  margin: 0px;
  padding: 0px;
}

.page {
  overflow: auto;
  height: 100vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;
}
</style>
          