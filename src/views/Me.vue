<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { user_edit_region, user_edit_sex } from "../apis/me.js";
//import {user_edit_birth, user_edit_phone, user_edit_sex, user_edit_region, user_edit_info, user_edit_avator} from "../apis/me.js"
import { user_get } from "../apis/me.js";
import SearchBar from '../components/SearchBar.vue';
let router = useRouter();
// 保证登录
if (localStorage.getItem("username") === null) {
    router.push("/login")
}
// 获取用户信息
let userinfo = reactive({
    name: localStorage.getItem('username'),
    avatar: null,
    sex: null,
    birthday: null,
    region: null,
    phone: null,
    info: null
});

user_get(userinfo.name).then(
    (res) => {
        if (res["code"] === "success") { // 成功获得用户信息
            userinfo.avatar = res["info"]["avatar"];
            userinfo.birthday = res["info"]["birthday"];
            userinfo.info = res["info"]["info"];
            userinfo.phone = res["info"]["phone"];
            userinfo.region = res["info"]["region"];
            userinfo.sex = res["info"]["sex"];
            localStorage.setItem("userinfo", JSON.stringify(userinfo));
        } else {
            Notify.warn("获取用户信息失败");
        }
    });
// 修改性别
let show_picker_sex = ref(false);
const picker_sex = ref([
    { text: "男生", value: 1 },
    { text: "女生", value: 0 }
]);
const confirm_picker_sex = ({ selectedValue, selectedOptions }) => {
    let new_sex = selectedValue[0];
    user_edit_sex(userinfo.name, new_sex).then((res) => {
        if (res["code"] === "success") {
            userinfo.sex = new_sex;
        }
    })
};
const change_picker_sex = ({ selectedValue, selectedOptions }) => {
    // console.log("改变了性别：", selectedValue);
};

// 修改地区
let show_picker_region = ref(false);
const picker_region = ref([
    { "value": "北京市", "text": "北京市" },
    { "value": "天津市", "text": "天津市" },
    { "value": "河北省", "text": "河北省" },
    { "value": "山西省", "text": "山西省" },
    { "value": "内蒙古自治区", "text": "内蒙古自治区" },
    { "value": "辽宁省", "text": "辽宁省" },
    { "value": "吉林省", "text": "吉林省" },
    { "value": "黑龙江省", "text": "黑龙江省" },
    { "value": "上海市", "text": "上海市" },
    { "value": "江苏省", "text": "江苏省" },
    { "value": "浙江省", "text": "浙江省" },
    { "value": "安徽省", "text": "安徽省" },
    { "value": "福建省", "text": "福建省" },
    { "value": "江西省", "text": "江西省" },
    { "value": "山东省", "text": "山东省" },
    { "value": "河南省", "text": "河南省" },
    { "value": "湖北省", "text": "湖北省" },
    { "value": "湖南省", "text": "湖南省" },
    { "value": "广东省", "text": "广东省" },
    { "value": "广西壮族自治区", "text": "广西壮族自治区" },
    { "value": "海南省", "text": "海南省" },
    { "value": "重庆市", "text": "重庆市" },
    { "value": "四川省", "text": "四川省" },
    { "value": "贵州省", "text": "贵州省" },
    { "value": "云南省", "text": "云南省" },
    { "value": "西藏自治区", "text": "西藏自治区" },
    { "value": "陕西省", "text": "陕西省" },
    { "value": "甘肃省", "text": "甘肃省" },
    { "value": "青海省", "text": "青海省" },
    { "value": "宁夏回族自治区", "text": "宁夏回族自治区" },
    { "value": "新疆维吾尔自治", "text": "新疆维吾尔自治区" },
    { "value": "香港特别行政区", "text": "香港特别行政区" },
    { "value": "澳门特别行政区", "text": "澳门特别行政区" }
]);


const confirm_picker_region = ({ selectedValue, selectedOptions }) => {
    let new_region = selectedValue[0];
    user_edit_region(userinfo.name, new_region).then((res) => {
        if (res["code"] === "success") {
            userinfo.region = new_region;
        }
    })
}
const change_picker_region = ({ selectedValue, selectedOptions }) => {
};
// 退出登录
const logout = () => {
    localStorage.removeItem("username");
    router.push("/login");
}

</script>
    
<template>
    <div class="page" style="background-color: rgb(250, 250, 250); ">
        <SearchBar></SearchBar>
        <div class="body">

            <div class="photo" v-if="userinfo.avatar !== null">
                <nut-avatar size="120" :icon="userinfo.avatar" @click="() => { router.push('/me/pick_avator') }">
                </nut-avatar>
            </div>
            <div class="photo" v-else>
                <nut-avatar size="120" icon="https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg"
                    @click="() => { router.push('/me/pick_avator') }">
                </nut-avatar>
            </div>
            <!-- TODO: 使用picker输入一些数据 -->
            <nut-cell-group title="个人信息" desc="">
                <nut-cell title="用户名" :desc="userinfo.name">
                </nut-cell>
                <nut-cell title="性别" :desc="userinfo.sex === null ? '是个秘密' : (userinfo.sex === 0 ? '女生' : '男生')">
                    <template v-slot:link>
                        <nut-icon name="right" @click="() => { show_picker_sex = true; }"></nut-icon>
                    </template>
                </nut-cell>
                <nut-cell title="生日" :desc="userinfo.birthday === null ? '是个秘密' : (userinfo.birthday)">
                    <template v-slot:link>
                        <nut-icon name="right" @click="() => {
                            router.push('/me/pick_birth');
                        }"></nut-icon>
                    </template>
                </nut-cell>
                <nut-cell title="地区" :desc="userinfo.region === null ? '是个秘密' : (userinfo.region)">
                    <template v-slot:link>
                        <nut-icon name="right" @click="() => { show_picker_region = true; }"></nut-icon>
                    </template>
                </nut-cell>
                <nut-cell title="电话号码" :desc="userinfo.phone === null ? '是个秘密' : (userinfo.phone)" @click="() => {
                    router.push('/me/pick_phone');
                }">
                    <template v-slot:link>
                        <nut-icon name="right"></nut-icon>
                    </template>
                </nut-cell>
                <nut-cell title="个性签名" :desc="userinfo.info === null ? '不足为外人道也' : (userinfo.info)" @click="() => {
                    router.push('/me/pick_info');
                }">
                    <template v-slot:link>
                        <nut-icon name="right"></nut-icon>
                    </template>
                </nut-cell>
            </nut-cell-group>

            <nut-cell-group title="更多功能" desc="">
                <nut-grid :column-num="3">
                    <nut-grid-item icon="comment" text="我的问诊单"></nut-grid-item>
                    <nut-grid-item icon="order" text="我的预约单"></nut-grid-item>
                    <nut-grid-item icon="shop" text="我的处方单"></nut-grid-item>
                </nut-grid>
            </nut-cell-group>
            <nut-button type="danger" class="button" @click="logout">退出登录</nut-button>

        </div>


    </div>
    <!-- PICKERS -->
    <nut-picker v-model:visible="show_picker_sex" :columns="picker_sex" title="我的性别" @change="change_picker_sex"
        @confirm="confirm_picker_sex" :three-dimensional="false">
    </nut-picker>

    <nut-picker v-model:visible="show_picker_region" :columns="picker_region" title="我的地区"
        @change="change_picker_region" @confirm="confirm_picker_region" :three-dimensional="false">
    </nut-picker>
</template>
    
<style scoped>
.page {
    overflow: auto;
    height: 92vh;
    display: -webkit-flex;
    -webkit-flex-direction: column;
}

.title_forzen {
    position: relative;
    left: 5%;
    width: 90%;
    height: 140px;
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

.card {
    widows: 90%;
    height: 200px;
    border: 2px solid gray;
}

.body {
    width: 100vw;
    overflow: scroll;
}

* {
    margin: 0px;
    padding: 0px;
}

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
    width: 50%;
    margin-left: 50%;
    transform: translate(-50%, 0);
    /* border:1px solid red; */
}

* {
    background-color: rgb(250, 250, 250);
    margin: 0px;
    padding: 0px;
}
</style>