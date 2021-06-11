import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

import Antd from "ant-design-vue";
import axios from "axios";

import Vue3VideoPlayer from "@cloudgeek/vue3-video-player";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";

// require videojs style
import "video.js/dist/video-js.css";

import Login from "./views/Login.vue";
import MVList from "./views/MVList.vue";
import MVInfo from "./views/MVInfo.vue";
import UserInfo from "./views/UserInfo.vue";
import Discover from "./views/Discover.vue";

// Vue 3 新 API
const app = createApp(App);

// vue-route v4.x
const routes = [
    { path: "/", redirect: "/mv" },
    { path: "/login", component: Login, name: "login" },
    { path: "/mv", component: MVList, name: "mvs" },
    { path: "/mv/:id", component: MVInfo, name: "mvi" },
    { path: "/discover", component: Discover, name: "discover" },
    { path: "/info", component: UserInfo, name: "user" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Vuex v4.x
const store = createStore({
    state() {
        return {
            account: null,
            profile: null,
            token: "",
        };
    },
});

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);

app.config.productionTip = false;
app.use(Antd);

app.use(Vue3VideoPlayer, {
    lang: "zh-CN",
});

// 挂载到 app
app.mount("#app");
