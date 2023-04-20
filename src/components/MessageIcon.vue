<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { get_inquiry_not_viewed } from "../apis/query";
import { global_status } from "../common/global.js";
// 查询是否有未读的消息，如果有则加入一个徽标
let router = useRouter();
const num_not_viewed = ref(0);

let username = localStorage.getItem("username");
get_inquiry_not_viewed(username).then((res) => {
  if (res["code"] === "success") {
    num_not_viewed.value = res["data"].length;
  }
});


if (!global_status["query_message_not_viewed"]) {
  setInterval(() => { get_inquiry_not_viewed(username) }, 5000);
  global_status["query_message_not_viewed"] = true;
}

const goto_session_not_viewed = function () {
  router.push("/inquiry/session_not_viewed");
}

</script>



<template>
  <div>
    <nut-badge :value="num_not_viewed" top="0" right="8" bubble>
      <nut-icon name="message" size="24" @click="goto_session_not_viewed"></nut-icon>
    </nut-badge>
  </div>
</template>

<style scoped></style>