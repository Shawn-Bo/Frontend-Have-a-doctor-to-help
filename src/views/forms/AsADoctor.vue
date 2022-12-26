<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { certified_as_a_doctor } from "../../apis/me.js";
const router = useRouter();
const route = useRoute();
let username = route.query.username;

let real_name = ref("");
let career_year = ref(0);
let hospital = ref("");
let post = ref("");
let good_at = ref("");
let wechat = ref("");

let back = () => {
  history.back();
};
const confirm = () => {

  certified_as_a_doctor(username, real_name.value, career_year.value, hospital.value, post.value, good_at.value, wechat.value).then((res) => {
    if (res["code"] === "success") {
      Notify.success("认证成功", { duration: 500 });
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
      <h1>医生认证</h1>
    </div>

    <nut-form>
      <nut-form-item label="真实姓名">
        <input class="nut-input-text" placeholder="请输入真实姓名" type="text" v-model="real_name" />
      </nut-form-item>
      <nut-form-item label="从业时长">
        <input class="nut-input-text" placeholder="请输入从业年数" type="number" v-model="career_year" />
      </nut-form-item>
      <nut-form-item label="从业单位">
        <input class="nut-input-text" placeholder="请输入从业医院" type="text" v-model="hospital" />
      </nut-form-item>
      <nut-form-item label="职位">
        <input class="nut-input-text" placeholder="请输入从业职位" type="text" v-model="post" />
      </nut-form-item>
      <nut-form-item label="擅长领域">
        <input class="nut-input-text" placeholder="请输入擅长领域" type="text" v-model="good_at" />
      </nut-form-item>
      <nut-form-item label="微信ID">
        <input class="nut-input-text" placeholder="请输入微信ID" type="text" v-model="wechat" />
      </nut-form-item>
    </nut-form>

    <nut-button type="primary" @click="confirm" class="button">提交认证</nut-button>

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
          