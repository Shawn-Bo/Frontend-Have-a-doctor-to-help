<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { user_get_avatar } from '../apis/me.js';
import { query_get_exported_session, query_go_exported_session, update_doctor_inquiry } from '../apis/query';
import doctor_avatar_url from "../assets/doctor_avatar_url.png";
import { global_status } from '../common/global.js';
const route = useRoute();
const router = useRouter();
let messageText = ref("");
let message_box = ref(null);
// route.query即可接收参数
let username = localStorage.getItem("username");
let going_session_id = route.query.going_session_id;
let counter_part_username = "" || route.query.picked_doctor_id;

let session_to_show = ref({});
// 获取session
query_get_exported_session(going_session_id).then((res) => {
  if (res["code"] === "success") {
    let session_info = JSON.parse(res["data"][0]);
    session_to_show.value = session_info;
    update_session_avatar();
  }
});


let avatar_url = (JSON.parse(localStorage.getItem('userinfo'))['avatar'] === null) ? 'https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg' : JSON.parse(localStorage.getItem('userinfo'))['avatar'];

let back = function () {
  history.back();
}
let counter_part_user_avatar = "";

// 更新头像数据！
const update_session_avatar = function () {
  for (let i = 0, len = session_to_show.value["session_messages"].length; i < len; i++) {
    let username_for_avatar = session_to_show.value["session_messages"][i]["message_sender"];
    if (typeof (session_to_show.value["session_messages"][i]["avatar"]) !== "undefined") {
      continue;
    }
    if (username_for_avatar === "robot") {
      session_to_show.value["session_messages"][i]["avatar"] = doctor_avatar_url;
    } else if (username_for_avatar === username) {
      session_to_show.value["session_messages"][i]["avatar"] = avatar_url;
    } else if (counter_part_user_avatar !== "") {
      counter_part_username = username_for_avatar;
      session_to_show.value["session_messages"][i]["avatar"] = counter_part_user_avatar;
    } else {
      counter_part_username = username_for_avatar;
      user_get_avatar(username_for_avatar).then((res) => {
        counter_part_user_avatar = res["data"];
        session_to_show.value["session_messages"][i]["avatar"] = counter_part_user_avatar;
      });
    }
  }

}

// 更新记录，保证没看！
update_doctor_inquiry(username, going_session_id, "viewed").then((res) => {
  console.log(username, going_session_id, "viewed");
});
// 翻到最下面
setTimeout(function () { message_box.value.scrollTop = 100000; }, 100);

if (!global_status.query_detail_not_viewed) {
  setInterval(function () {
    query_get_exported_session(going_session_id).then((res) => {
      if (res["code"] === "success") {
        if (session_to_show.value !== JSON.parse(res["data"][0])) {
          session_to_show.value = JSON.parse(res["data"][0]);
          setTimeout(function () { message_box.value.scrollTop = 100000; }, 100);
        }
        update_session_avatar();
      } else {
        Notify.warn("会话获取失败");
      }

    });
  }, 8000);
}
// 发送聊天
const send_message = () => {
  // 追加新会话的内容
  query_go_exported_session(username, going_session_id, { "message_id": session_to_show.value.session_messages.length, message_sender: username, "message_text": messageText.value }).then((res) => {
    if (res["code"] === "success") {
      // 成功追加对话
      query_get_exported_session(going_session_id).then((res) => {
        if (res["code"] === "success") {

          session_to_show.value = JSON.parse(res["data"][0]);
          update_session_avatar();
          messageText.value = ""; // 清空输入栏
        } else {
          Notify.warn("会话获取失败");
        }
      });
      update_doctor_inquiry(counter_part_username, going_session_id, "not_viewed").then((res) => {
        if (res["code"] === "success") {
          // 说明医生那边有未查看通知了
        } else {
          Notify.warn("会话状态修改失败");
        }
      });

      setTimeout(function () { message_box.value.scrollTop = 100000; }, 100);
    } else {
      Notify.warn("会话追加失败");
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
      <h2>名医问诊</h2>
      <div class="icon_top_right">
      </div>
    </div>
    <div class="body" ref="message_box">
      <div v-for="message in session_to_show.session_messages" :key="message.message_id">
        <div class="message">
          <div v-if="message.message_sender !== username">
            <div
              style="position: relative; left: 50%;width:max-content;transform: translate(-50%, 0);background-color: rgb(250, 250, 250);">
              {{ message.message_time }}
            </div>
            <div class="left_message_box">
              <div class="avatar_box">
                <nut-avatar size="60" shape="square" :icon="message.avatar">
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
                <nut-avatar size="60" :icon="message.avatar" shape="square">
                </nut-avatar>
              </div>

            </div>
          </div>
        </div>

      </div>
      <!-- 占位置，确保最后一个消息框可以完全显示 -->
      <div style="min-height:60px;"></div>
    </div>

    <div class="footer">
      <nut-searchbar v-model="messageText" @keyup.enter.native="send_message">
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
  bottom: 0px;
  padding: 0px;
  height: 50px;
  width: 100%;
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
  height: 120px;
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

.above_footer {
  position: absolute;
  bottom: 65px;
  padding: 0px;
  height: 50px;
}
</style>


