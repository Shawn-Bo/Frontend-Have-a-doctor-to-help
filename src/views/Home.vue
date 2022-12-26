<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { query_get_public_sessions } from "../apis/query.js";
import SearchBar from '../components/SearchBar.vue';
let router = useRouter();
let session_list = ref([]);
query_get_public_sessions().then((res) => {
  if (res["code"] == "success") {
    session_list.value = res["session_list"].reverse()
    console.log(session_list.value[0])
  }
});

// 跳转到对应页面
const go_query_public_session_detail = function (index) {
  let public_session_item = session_list.value[index];
  router.push({
    path: "/query/public_session_detail",
    query: { public_session_item: JSON.stringify(public_session_item) }
  });

}


</script>

<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="title_forzen">
      <h1>热门问诊</h1>
      <div class="icon_top_right">
        <nut-icon name="message" size="24"></nut-icon>
      </div>
    </div>

    <!-- 下面是一堆各种各样的卡片 -->
    <div class="body">
      <div class="searchbar">
        <SearchBar></SearchBar>
      </div>
      <div class="body_session_list">
        <div v-for="session_item, index in session_list">
          <div class="session_item_card">
            <h3 style="text-align: center;">
              {{ session_item['session_detail']["session_messages"][0]["message_text"].slice(0, 16) }}</h3>
            <nut-cell-group title="">
              <nut-cell icon="order" title="知主：" :desc="session_item['username']"></nut-cell>
              <nut-cell icon="service" title="追问："
                :desc="session_item['session_detail']['session_messages'][session_item['session_detail']['session_messages'].length - 2]['message_text'].slice(0, 16)"></nut-cell>
              <nut-cell icon="eye" title="始于："
                :desc="session_item['session_detail']['session_messages'][session_item['session_detail']['session_messages'].length - 2]['message_time']"></nut-cell>
              <nut-cell icon="marshalling" title="止于"
                :desc="session_item['session_detail']['session_messages'][0]['message_time']"></nut-cell>
              <nut-cell icon="comment" title="轮次："
                :desc="String(session_item['session_detail']['session_messages'].length)"></nut-cell>
            </nut-cell-group>


            <nut-button type="primary" class="button" @click="go_query_public_session_detail(index)">查看详情</nut-button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  overflow-x: hidden;
  overflow-y: auto;
  height: 92vh;
  display: -webkit-flex;
  -webkit-flex-direction: column;
}



.button {
  /* width: fit-content; */
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%, 0);
  /* border:1px solid red; */
}

.title_forzen {
  position: relative;
  left: 5%;
  width: 90%;
  height: 100px;
  display: block;
  z-index: 100;
  /* border: 1px solid red; */
}

.title_forzen>h1 {
  position: absolute;
  top: 4px;
}

.icon_top_right {
  position: absolute;
  top: 16px;
  right: 0px;

}



.body {
  position: relative;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
}

.body_session_list {
  position: relative;
  left: 5%;
  width: 90%;
}


* {
  margin: 0px;
  padding: 0px;
}

.searchbar {
  margin-top: 0px;
  position: inherit;
  top: 0px;
  width: 100vw;
  height: 40px;
  /* border: 1px solid red; */
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
  margin-top: 10px;
  width: 90%;

  margin-left: 50%;
  transform: translate(-50%, 0);

  /* border: 1px red solid; */
}
</style>
