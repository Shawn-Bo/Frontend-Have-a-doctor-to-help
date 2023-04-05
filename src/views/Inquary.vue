<script setup>
import { Notify } from "@nutui/nutui";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { get_doctors } from "../apis/doctor.js";
import DoctorCard from "../components/DoctorCard.vue";
import SearchBar from '../components/SearchBar.vue';


const route = useRoute();
const router = useRouter();
let doctor_dict_list = ref("")
get_doctors().then((res) => {
    if (res["code"] === "success") {
        doctor_dict_list.value = res["data"];
        // console.log(doctor_dict_list.value);
    } else {
        Notify.warn("请求失败");
    }
});
let exported_session_picked = route.query["exported_session"];

const go_query_public_doctor_detail = function (index) {
    if (exported_session_picked === undefined) {
        Notify.warn("请先按照提示选择导出的问诊单！", { duration: 1000 })
    } else {
        // 在这里开始求助医生业务
        // 也就是呆着医生信息和用户信息，跳转到一个新的聊天页面

        router.push({
            path: "/inquary/detail_user",
            query: {
                picked_session_id: exported_session_picked,
                picked_doctor_id:
                    doctor_dict_list.value[index].username

            }
        });
    }
}

</script>
<template>
    <div class="page" style="background-color: rgb(250, 250, 250); ">
        <div class="title_forzen">
            <h1>💡名医在线</h1>
            <div class="icon_top_right">
                <nut-icon name="message" size="24"></nut-icon>
            </div>
        </div>
        <div class="searchbar_forzen">
            <SearchBar></SearchBar>
            <nut-noticebar :closeMode="true" right-icon="circle-close" :background="`rgba(250, 250, 220, 1)`"
                :color="`#D9500B`">操作说明：在“我的”👉“我的问诊单”👉“查看问诊单”中确定问诊单之后，选择“👨‍⚕️继续问医生👩‍⚕️”，跳转到此界面选择“👨‍⚕️求助医生👩‍⚕️”。
            </nut-noticebar>
        </div>
        <div style="min-height: 120px;"></div>
        <!-- 下面是一堆各种各样的卡片 -->
        <div class="body">

            <div class="body_doctor_list">

                <div v-for="doctor_item, index in doctor_dict_list">
                    <DoctorCard :avatar="doctor_item['avatar_url']" :username="doctor_item['username']"
                        :real_name="doctor_item['real_name']" :career_year="doctor_item['career_year']"
                        :hospital="doctor_item['hospital']" :position="doctor_item['post']"
                        :good_at="doctor_item['good_at']" :we_chat="doctor_item['wechat']"
                        @onQueryDetail="go_query_public_doctor_detail(index)">
                    </DoctorCard>
                </div>

            </div>
        </div>

    </div>
</template>
    
<style scoped>
.page {
    overflow: auto;
    height: 95vh;
    display: -webkit-flex;
    flex-direction: column;
}

.title_forzen {
    position: absolute;
    left: 5%;
    width: 90%;
    height: 80px;
    /* border: 1px solid red; */
    z-index: 100;
}

.title_forzen>h1 {
    position: absolute;
    top: 4px;
}

.searchbar_forzen {
    width: 100%;
    position: absolute;
    top: 48px;
    z-index: 100;

}

.icon_top_right {
    position: absolute;
    top: 16px;
    right: 0px;
}

.searchbar {
    background-color: rgb(250, 250, 250);
    width: 100%;
    position: absolute;
    top: 60px;
}

* {
    background-color: rgb(250, 250, 250);
    margin: 0px;
    padding: 0px;
}


.body {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
}


.body_doctor_list {
    position: relative;
    left: 5%;
    width: 90%;
}
</style>
    