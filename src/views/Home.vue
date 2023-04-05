<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { query_get_public_sessions } from "../apis/query.js";
import HomeCard from "../components/HomeCard.vue";
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
      <h1>♨️热门问诊</h1>
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
          <HomeCard class="cards"
            :card_title="session_item['session_detail']['session_messages'][0]['message_text'].slice(0, 16)"
            :avatar="session_item['avatar']" :username="session_item['username']"
            :start_time="session_item['session_detail']['session_messages'][0]['message_time']"
            :end_time="session_item['session_detail']['session_messages'][session_item['session_detail']['session_messages'].length - 2]['message_time']"
            :epoch_num="session_item['session_detail']['session_messages'].length"
            :card_preview="session_item['session_detail']['session_messages'][1]['message_text']"
            @on-query-detail="go_query_public_session_detail(index)">
          </HomeCard>
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
  display: flex;
  flex-direction: column;
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

.cards {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
