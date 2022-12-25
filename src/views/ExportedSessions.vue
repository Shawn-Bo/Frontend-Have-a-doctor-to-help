<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { query_get_exported_sessions } from "../apis/query.js";
const router = useRouter();

// 返回到上一页
let back = function () {
  history.back();
}
// 获取用户名
let username = localStorage.getItem("username");


// 查询用户的所有sessions
let session_list = ref([]);
query_get_exported_sessions(username).then((res) => {
  if (res["code"] == "success") {
    session_list.value = res["session_list"].reverse()
  }
});

// 前往会话详情页面
const go_query_session_detail = function (index) {
  let session_json = session_list.value[index];
  router.push({
    path: "/query/session_detail",
    query: { session_json: JSON.stringify(session_json) }
  });

}


</script>
      
<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="title_forzen">

      <div class="icon_left">
        <nut-icon name="left" @click="back" size="20"></nut-icon>
      </div>
      <h2>我的问诊单</h2>
      <div class="icon_top_right">
        <nut-icon name="message" size="24"></nut-icon>
      </div>
    </div>


    <div class="session_list">
      <div v-for="session_item, index  in session_list">
        <div class="session_item_card">
          <h3 style="text-align: center;">
            {{ session_item["session_messages"][0]["message_text"].slice(0, 16) }}</h3>
          <nut-cell-group title="">
            <nut-cell icon="order" title="编号：" :desc="session_item['session_id']"></nut-cell>
            <nut-cell icon="service" title="追问："
              :desc="session_item['session_messages'][session_item['session_messages'].length - 2]['message_text'].slice(0, 16)"></nut-cell>
            <nut-cell icon="eye" title="始于："
              :desc="session_item['session_messages'][session_item['session_messages'].length - 2]['message_time']"></nut-cell>
            <nut-cell icon="marshalling" title="止于"
              :desc="session_item['session_messages'][0]['message_time']"></nut-cell>
            <nut-cell icon="comment" title="轮次：" :desc="String(session_item['session_messages'].length)"></nut-cell>
          </nut-cell-group>


          <nut-button type="primary" class="button" @click="go_query_session_detail(index)">查看详情</nut-button>
        </div>

      </div>

      <nut-noticebar
        text="我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。我也是有底线的。"
        :background="`rgba(251, 248, 220, 1)`" :color="`#D9500B`"></nut-noticebar>
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
  width: 60%;
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
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;

  display: flex;
  flex-direction: column;
}

.title_forzen {
  position: absolute;
  left: 5%;
  width: 90%;
  height: 50px;
  /* border: 1px solid red; */
  z-index: 2;
  background-color: rgb(250, 250, 250);
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

.session_item_card {
  margin-top: 20px;
  background-color: white;
  border-top: gray solid 2px;
  border-right: gray solid 2px;
  border-bottom: gray solid 1px;
  border-left: gray solid 1px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding-bottom: 15px;
  padding-top: 15px;

}

.session_list {
  position: relative;
  margin-top: 50px;
  width: 90%;

  margin-left: 50%;
  transform: translate(-50%, 0);

  /* border: 1px red solid; */
}
</style>
      