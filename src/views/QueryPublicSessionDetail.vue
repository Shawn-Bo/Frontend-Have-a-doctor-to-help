<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { user_get } from "../apis/me.js";
import { mark_publish_session, query_delete_export_session } from "../apis/query.js";
import doctor_avatar_url from "../assets/doctor_avatar_url.png";
const route = useRoute();
const router = useRouter();
let message_box = ref(null);
// route.query即可接收参数

let public_session_item = JSON.parse(route.query.public_session_item)
let session_to_show = ref(public_session_item["session_detail"]);
// 从用户名获取用户头像

// 暂时先用原本的


let avatar_url = ref("");
let username = public_session_item["username"];
user_get(username).then((res) => {
  if (res["code"] === "success") {
    avatar_url.value = res["info"]["avatar"];
  }
});
let back = function () {
  history.back();
}


// 公开问诊单
const mark_session = function () {
  let app_username = localStorage.getItem("username");
  mark_publish_session(app_username, session_to_show.value.session_id).then((res) => {
    if (res["code"] === "success") {
      Notify.success("问答收藏成功", { duration: 500 });
    } else {
      Notify.warn("问答收藏失败");
    }
  });
};

const like_session = function () {
  // 就是一个假性功能提示
  Notify.primary("🤓已收到您的点赞！🤓", { duration: 1000 });
  setTimeout(() => { router.push("/home") }, 200);

};

const dislike_session = function () {
  Notify.danger("🥱已收到您的点踩！🥱", { duration: 1000 });
  setTimeout(() => { router.push("/home") }, 200);
};

const delete_session = function () {
  query_delete_export_session(username, session_to_show.value.session_id).then((res) => {
    if (res["code"] === "success") {
      history.back();
      Notify.success("问诊单删除成功", { duration: 500 });
    } else {
      Notify.warn("问诊单删除失败");
    }
  });
}

</script>
      
<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="title_forzen">

      <div class="icon_left">
        <nut-icon name="left" @click="back" size="20"></nut-icon>
      </div>
      <h2>热门问诊</h2>
      <div class="icon_top_right">
        <nut-icon name="star" size="24" @click="mark_session"></nut-icon>
      </div>
    </div>
    <div class="body" ref="message_box">
      <div v-for="message in session_to_show.session_messages" :key="message.message_id">
        <div class="message">
          <div v-if="message.message_sender === 'robot'">
            <div
              style="position: relative; left: 50%;width:max-content;transform: translate(-50%, 0);background-color: rgb(250, 250, 250);">
              {{ message.message_time }}
            </div>
            <div class="left_message_box">
              <div class="avatar_box">
                <nut-avatar size="60" shape="square" :icon="doctor_avatar_url">
                </nut-avatar>
              </div>
              <div class="left_strings">
                {{ message.message_text }}
              </div>
            </div>
          </div>
          <div v-else="">
            <div
              style="position: relative; left: 50%;width:max-content;transform: translate(-50%, 0);background-color: rgb(250, 250, 250);">
              {{ message.message_time }}
            </div>
            <div class="right_message_box">
              <div class="right_strings">
                {{ message.message_text }}
              </div>
              <div class="avatar_box">
                <nut-avatar size="60" :icon="avatar_url" shape="square">
                </nut-avatar>
              </div>

            </div>
          </div>
        </div>

      </div>
      <!-- 占位置，确保最后一个消息框可以完全显示 -->
      <div style="height:100px;"></div>
    </div>
    <nut-button class="button above_footer" type="info" @click="like_session"> 🤓涨知识了，赞一个🤓 </nut-button>

    <nut-button class="button footer" type="danger" @click="dislike_session"> 🥱平平无奇，下一个🥱 </nut-button>

  </div>
</template>
      
<style scoped>
.title {
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.photo {
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.button {
  /* width: fit-content; */
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.left_message_box {
  color: red;
  text-align: left;
  position: relative;
  width: 100%;
  display: flex;

}

.right_message_box {
  color: blue;
  text-align: right;
  position: relative;
  /* border: 1px solid goldenrod; */
  display: flex;
  vertical-align: top;
  width: 100%;

}

.footer {
  position: absolute;
  bottom: 5px;
  padding: 0px;
  height: 50px;
}

.above_footer {
  position: absolute;
  bottom: 65px;
  padding: 0px;
  height: 50px;
}

.page {
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.title_forzen {
  position: relative;
  left: 5%;
  width: 90%;
  height: 80px;
  /* border: 1px solid red; */
  z-index: 2;
}

.title_forzen>h2 {
  position: absolute;
  top: 10px;
  left: 20px;
}

.icon_left {
  position: absolute;
  top: 18px;
}

.body {
  overflow: auto;
}

* {
  margin: 0px;
  padding: 0px;
}

.message {
  position: relative;
  left: 4%;
  width: 92%;
  height: max-content;
  /* border: 1px solid green; */
  margin-bottom: 12px;
  background: rgb(250, 250, 250);
}

.avatar_box {
  display: inline-block;
  width: 15vw;
  height: 15vw;
  /* border: 1px purple solid; */
  align-items: flex-start;
  display: flex;
  align-items: center;
}

.left_strings {
  display: inline-block;
  padding: 8px;
  text-align: left;
  max-width: 60%;
  height: max(max-content, auto);
  border-radius: 10px;
  border: 1px solid rgb(255, 255, 255);
  align-items: flex-start;
  margin-right: auto;
  margin-left: 4px;
  background-color: rgb(255, 255, 255);
  color: #000;
}

.right_strings {
  text-align: left;
  padding: 8px;
  height: max(max-content, auto);
  display: inline-block;
  max-width: 60%;
  border-radius: 10px;
  border: 1px solid rgb(1, 153, 255);
  margin-left: auto;
  margin-right: 4px;
  background-color: rgb(1, 153, 255);
  color: white;
}

.avatar_box>img {
  display: block;
  width: 100%;
  height: auto;
}

.icon_top_right {
  position: absolute;
  top: 16px;
  right: 0px;
}
</style>
      