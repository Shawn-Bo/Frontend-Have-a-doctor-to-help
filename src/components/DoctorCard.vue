<!-- 展示医生信息的组件 -->

<script setup>
const props = defineProps({
  avatar: String,
  username: String,
  real_name: String,
  career_year: Number,
  hospital: String,
  position: String,
  good_at: String,
  we_chat: String
});

const emits = defineEmits(['onQueryDetail'])


</script>

<template>
  <div>
    <div class="card_grid">
      <div class="avatar">
        <nut-avatar size="80" :icon="avatar" shape="round">
        </nut-avatar>
      </div>
      <div class="button">
        <nut-button type="primary" size="small" class="button" @click="$emit('onQueryDetail')">👩‍⚕️求助医生👨‍⚕️</nut-button>
      </div>
      <div class="real_name">
        <em>{{ real_name }}</em>
      </div>
      <div class="career_year">
        从业<em>{{ career_year }}</em>年
      </div>
      <nut-icon name="footprint" class="career_year_icon"></nut-icon>
      <div class="hospital">{{ hospital }}</div>
      <nut-icon name="location2" class="hospital_icon"></nut-icon>
      <div class="position">{{ position }}</div>
      <nut-icon name="people" class="position_icon"></nut-icon>
      <div class="good_at">擅长：{{ good_at }}</div>
      <nut-icon name="success" class="good_at_icon"></nut-icon>
      <div class="we_chat">微信：{{ we_chat }}</div>
      <nut-icon name="comment" class="we_chat_icon"></nut-icon>
    </div>
  </div>
</template>

<style scoped>
.card_grid {
  display: grid;
  grid-template-areas:
    "avatar  career_year_icon career_year"
    "avatar  hospital_icon hospital"
    "avatar  position_icon position"
    "real_name  good_at_icon good_at"
    "button  we_chat_icon we_chat";
  grid-template-columns: 14fr 1fr 20fr;

  margin-top: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 2px;
  padding-right: 2px;

  row-gap: 8px;
  column-gap: 12px;

  background-color: white;
  justify-items: stretch;

  border-radius: 8px;
  border-right: 2px solid gray;
  border-top: 2px solid gray;
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;

  /* font-family: YouYuan; */
}

.card_grid>* {
  /* border: 1px solid red; */
  text-align: left;
  margin-bottom: auto;
  margin-top: auto;

}

.avatar {
  grid-area: avatar;
  margin-left: auto;
  margin-right: auto;
}

.username {
  grid-area: username;
  margin-left: auto;
  margin-right: auto;
}

.button {
  grid-area: button;
  margin-left: auto;
  margin-right: auto;
}

.real_name {
  grid-area: real_name;
  margin-left: auto;
  margin-right: auto;
}

.real_name_icon {
  grid-area: real_name_icon;
}

.career_year {
  grid-area: career_year;
}

.career_year_icon {
  grid-area: career_year_icon;
}

.career_year>em {
  color: red;
  font-weight: bolder;
  margin-right: 4px;
}

.hospital {
  grid-area: hospital;
}

.hospital_icon {
  grid-area: hospital_icon;
}

.position {
  grid-area: position;
  text-align: left;
}

.position_icon {
  grid-area: position_icon;
}

.good_at {
  grid-area: good_at;
  text-align: left;
}

.good_at_icon {
  grid-area: good_at_icon;
  /* text-align: left; */
}

.we_chat {
  grid-area: we_chat;
}

.we_chat_icon {
  grid-area: we_chat_icon;
}
</style>