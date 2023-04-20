<!-- 首页展示问答时使用的组件 -->
<script setup>
const props = defineProps({
  card_title: String,
  card_preview: String,
  username: String,
  avatar: String,
  epoch_num: Number,
  start_time: String,
  end_time: String
});

const emits = defineEmits(['onQueryDetail'])
</script>

<template>
  <div>
    <div class="card_grid">
      <h3 class="title">{{ card_title }}</h3>
      <nut-button type="primary" size="small" class="button" @click="$emit('onQueryDetail')">详情</nut-button>
      <div class="card_preview">{{ card_preview }}...</div>
      <div class="avatar"> <nut-avatar size="80" :icon="avatar" shape="round">
        </nut-avatar> </div>
      <div class="epoch_num"><em>{{ epoch_num }}</em>轮对话</div>
      <div class="username">{{ username }}</div>
      <div class="start_time">始 {{ start_time.slice(5,).replace("月", "-").replace("日", " ").replace(" ", "") }}
      </div>
      <div class="end_time">止 {{ end_time.slice(5,).replace("月", "-").replace("日", " ").replace(" ",
        "") }}</div>
    </div>
  </div>
</template>

<style scoped>
.card_grid {
  display: grid;
  grid-template-areas:
    "title title title title title button"
    "preview preview preview preview preview preview"
    "preview preview preview preview preview preview"
    "preview preview preview preview preview preview"
    "avatar epoch_num epoch_num start_time start_time start_time"
    "avatar username username end_time end_time end_time";
  row-gap: 4px;


  background-color: white;
  justify-items: stretch;
  margin-top: 4px;

  padding: 8px;

  border-radius: 8px;
  border-right: 2px solid gray;
  border-top: 2px solid gray;
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;

  font-family: YouYuan;
}

.card_grid>* {
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 2px solid red; */
  text-align: center;
}

.title {
  grid-area: title;

  line-break: auto;
  font-family: "Gill Sans Extrabold", sans-serif;
  text-align: center;

  margin: auto;
}

.button {
  grid-area: button;
  margin-bottom: auto;
  margin-top: auto;
  justify-self: center;
  font-size: medium;
}

.card_preview {
  grid-area: preview;
  text-align: left;
  padding: 10px;

  /* border: 2px solid rebeccapurple; */
}

.avatar {
  grid-area: avatar;
}

.username {
  font-family: "Microsoft YaHei";
  grid-area: username;
  font-size: large;
  font-weight: normal;
  color: rgb(29, 29, 29);
  margin-top: auto;
  margin-bottom: auto;
}

.epoch_num {
  grid-area: epoch_num;
  margin-top: auto;
  margin-bottom: auto;
}

.start_time {
  grid-area: start_time;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 16px;
}

.end_time {
  grid-area: end_time;
  margin-top: auto;
  margin-bottom: auto;
}

.epoch_num>em {
  color: red;
  font-weight: bold;
  margin-right: 4px;
}
</style>