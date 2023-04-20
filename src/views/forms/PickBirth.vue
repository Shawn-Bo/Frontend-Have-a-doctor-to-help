<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { user_edit_birth } from "../../apis/me.js";

const router = useRouter();
let today = new Date()
let picked_date = ref(null);
picked_date.value = JSON.parse(localStorage.getItem("userinfo"))["birthday"] === null ? today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日" : JSON.parse(localStorage.getItem("userinfo"))["birthday"];
let show = ref(true);

let back = () => {
  history.back();
};
const confirm = ({ selectedValue, selectedOptions }) => {
  let new_date = selectedOptions.map((option) => option.text).join('');

  user_edit_birth(localStorage.getItem("username"), new_date).then((res) => {
    if (res["code"] === "success") {
      picked_date.value = new_date;
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
      <h1>选择生日</h1>
    </div>
    <nut-cell-group>
      <nut-cell title="生日" :desc="picked_date">
      </nut-cell>
      <nut-cell title="星座" desc="我不懂">
      </nut-cell>
    </nut-cell-group>


    <nut-datepicker v-model="picked_date" v-model:visible="show" :min-date="new Date(1920, 0, 1)" :max-date="new Date()"
      :is-show-chinese="true" :three-dimensional="true" @confirm="confirm"></nut-datepicker>


  </div>
</template>
      
<style scoped>
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
</style>
      