<script setup>
import { Notify } from '@nutui/nutui';
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { query_export_session, query_get_session, query_go_session, query_new_session } from "../apis/query.js";
import { get_session_temp } from "../apis/session.js";

import doctor_avatar_url from "../assets/doctor_avatar_url.png";
const route = useRoute();
const router = useRouter();
let messageText = ref("");
let message_box = ref(null);
let loading = ref(true);
// route.query即可接收参数
let new_session_start_question = ref(route.query.question);
let session_to_show = ref(get_session_temp());
let avatar_url = (JSON.parse(localStorage.getItem('userinfo'))['avatar'] === null) ? 'https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg' : JSON.parse(localStorage.getItem('userinfo'))['avatar'];
let back = function () {
  history.back();
}
let username = localStorage.getItem("username");
query_new_session(username).then((res) => {
  if (res["code"] === "success") {
    // 成功创建了新的会话
    let new_session_id = res["session_id"];
    localStorage.setItem("session_id", new_session_id);
    // 追加新会话的内容
    query_go_session(username, new_session_id, { "message_id": 0, message_sender: username, "message_text": new_session_start_question.value }).then((res) => {
      if (res["code"] === "success") {
        // 成功追加对话
        query_get_session(username, new_session_id).then((res) => {
          console.log(res)
          if (res["code"] === "success") {
            session_to_show.value = JSON.parse(res["session"]);
          } else {
            Notify.warn("会话获取失败");
          }
        });
        loading.value = false;
      } else {
        Notify.warn("会话追加失败");
      }
    });

  } else {
    Notify.warn("会话创建失败");
  }
});
// 发送聊天
const send_message = () => {
  // 追加新会话的内容
  loading.value = true;

  setTimeout(function () { message_box.value.scrollTop = 100000; }, 100);
  let message_text = messageText.value;
  messageText.value = ""; // 清空输入栏
  query_go_session(username, session_to_show.value.session_id, { "message_id": session_to_show.value.session_messages.length, message_sender: username, "message_text": message_text }).then((res) => {
    if (res["code"] === "success") {
      // 成功追加对话
      query_get_session(username, session_to_show.value.session_id).then((res) => {
        if (res["code"] === "success") {
          session_to_show.value = JSON.parse(res["session"]);
          loading.value = false;
        } else {
          Notify.warn("会话获取失败");
        }
      });
    } else {
      Notify.warn("会话追加失败");
    }
  });
}

// 导出问诊单
const export_session = function () {
  query_export_session(username, session_to_show.value.session_id).then((res) => {
    if (res["code"] === "success") {
      router.push("/home");
      Notify.success("会话导出成功", { duration: 500 });
    } else {
      Notify.warn("会话导出失败");
    }
  });
};

</script>
      
<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="title_forzen">

      <div class="icon_left">
        <nut-icon name="left" @click="back" size="20"></nut-icon>
      </div>
      <h2>快速问诊</h2>
      <div class="icon_top_right">
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

      <div
        style="position: relative; left: 50%;width:max-content;transform: translate(-50%, 0);background-color: rgb(250, 250, 250);">
        <nut-skeleton width="160px" height="20px" title animated row="1" class="message" :loading="loading">
        </nut-skeleton>
      </div>
      <nut-skeleton width="250px" height="15px" avatar-shape="square" title animated avatar avatarSize="60px" row="3"
        class="message transX" :loading="loading">
      </nut-skeleton>
      <nut-skeleton width="250px" height="15px" avatar-shape="square" title animated avatar avatarSize="60px" row="3"
        class="message" :loading="loading">
      </nut-skeleton>

      <div style="height:20px;"></div>
    </div>
    <div class="footer">
      <nut-searchbar v-model="messageText" @keyup.enter.native="send_message">
        <template v-slot:leftout>
          <nut-icon name="star" @click="export_session"></nut-icon>
        </template>
        <template v-slot:rightout>
          <nut-icon name="top" @click="send_message"></nut-icon>
        </template>
      </nut-searchbar>
    </div>





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
  width: 100%;
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
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
  height: 50px;
}

.page {
  overflow: auto;
  height: 95vh;
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

.transX {
  transform: scaleX(-1);
}
</style>
      