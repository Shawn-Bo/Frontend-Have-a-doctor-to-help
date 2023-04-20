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
        <nut-button type="info" size="small" shape="square" class="button"
          @click="$emit('onQueryDetail')">👩‍⚕️求助医生👨‍⚕️</nut-button>
      </div>
      <div class="real_name">
        {{ real_name }}
      </div>
      <div class="career_year">
        从业<em>{{ career_year }}</em>年
      </div>
      <nut-icon name="footprint" class="career_year_icon"></nut-icon>
      <div class="hospital">{{ hospital }}</div>
      <nut-icon name="location2" class="hospital_icon"></nut-icon>
      <div class="position">{{ position }}</div>
      <nut-icon name="people" class="position_icon"></nut-icon>
      <div class="good_at">{{ good_at }}</div>
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
  grid-template-columns: 20fr 1fr 30fr;

  margin-top: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;

  row-gap: 8px;
  column-gap: 12px;
  justify-items: stretch;

  border-radius: 4px;
  border: 1px solid grey;

  /* font-family: YouYuan; */
}

.card_grid>* {
  /* border: 1px solid red; */
  text-align: left;
  margin-bottom: auto;
  margin-top: auto;
  font-weight: 400;
}

.avatar {
  grid-area: avatar;
  margin-left: auto;
  margin-right: auto;
  border: 1px double snow;
  border-radius: 50%;
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
  font-weight: 600;
}

.career_year {
  grid-area: career_year;
}

.career_year_icon {
  grid-area: career_year_icon;
  color: rgb(2, 48, 107);
}

.career_year>em {
  color: rgb(46, 117, 241);
  font-weight: bolder;
  margin-right: 4px;

}

.hospital {
  grid-area: hospital;
}

.hospital_icon {
  grid-area: hospital_icon;
  color: rgb(2, 48, 107);
}

.position {
  grid-area: position;
  text-align: left;
}

.position_icon {
  grid-area: position_icon;
  color: rgb(2, 48, 107);
}

.good_at {
  grid-area: good_at;
  text-align: left;
}

.good_at_icon {
  grid-area: good_at_icon;
  /* color: rgb(2, 48, 107); */
  /* text-align: left; */
}

.we_chat {
  grid-area: we_chat;
}

.we_chat_icon {
  grid-area: we_chat_icon;
  color: rgb(2, 48, 107);
}
</style>