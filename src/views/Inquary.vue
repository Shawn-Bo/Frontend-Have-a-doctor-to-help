<script setup>
import { Notify } from "@nutui/nutui";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { get_doctors } from "../apis/doctor.js";
import SearchBar from '../components/SearchBar.vue';

const use_route = useRoute();

let doctor_dict_list = ref("")
get_doctors().then((res) => {
    if (res["code"] === "success") {
        doctor_dict_list.value = res["data"];
        // console.log(doctor_dict_list.value);
    } else {
        Notify.warn("请求失败");
    }
});
let exported_session_picked = use_route.query["exported_session"];

const go_query_public_doctor_detail = function (index) {
    if (exported_session_picked === undefined) {
        Notify.warn("请先按照提示选择导出的问诊单！", { duration: 1000 })
    }
}

</script>
    
<template>
    <div class="page" style="background-color: rgb(250, 250, 250); ">

        <div class="title_forzen">
            <h1>名医在线</h1>
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
                    <div class="doctor_item_card">
                        <h3 style="text-align: center; background-color: white;">
                            {{ doctor_item["username"].slice(0, 16) }}
                        </h3>
                        <nut-avatar size="96" :icon="doctor_item['avatar_url']" class="avatar"></nut-avatar>
                        <nut-cell-group title="">
                            <nut-cell icon="order" title="真实姓名：" :desc="doctor_item['real_name']"></nut-cell>
                            <nut-cell icon="service" title="从业年数："
                                :desc="String(doctor_item['career_year'])"></nut-cell>
                            <nut-cell icon="eye" title="任职医院：" :desc="doctor_item['hospital']"></nut-cell>
                            <nut-cell icon="marshalling" title="任职岗位：" :desc="doctor_item['post']"></nut-cell>
                            <nut-cell icon="comment" title="擅长科目：" :desc="doctor_item['good_at']"></nut-cell>
                            <nut-cell icon="comment" title="微信ID：" :desc="doctor_item['wechat']"></nut-cell>
                        </nut-cell-group>


                        <nut-button type="primary" class="button"
                            @click="go_query_public_doctor_detail(index)">👩‍⚕️求助医生👨‍⚕️</nut-button>
                    </div>
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
    -webkit-flex-direction: column;
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


.doctor_item_card {
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

.doctor_list {
    position: relative;
    margin-top: 20px;
    width: 90%;

    margin-left: 50%;
    transform: translate(-50%, 0);

    /* border: 1px red solid; */
}

.body_doctor_list {
    position: relative;
    left: 5%;
    width: 90%;
}

.button {
    /* width: fit-content; */
    width: 80%;
    margin-left: 50%;
    transform: translate(-50%, 0);
    /* border:1px solid red; */
}

.avatar {
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
    