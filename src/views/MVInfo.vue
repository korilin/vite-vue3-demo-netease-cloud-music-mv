<template>
    <div class="wrap">
        <div class="video-player">
            <vue3-video-player
                :src="mv.urls"
                :cover="mv.info.cover"
                :title="mv.info.name"
                v-if="mv.urls.length == mv.info.brs.length"
            ></vue3-video-player>
        </div>
        <div class="info">
            <MVDetail :info="mv.info" :count="mv.count" />
        </div>
        <a-divider>热门评论</a-divider>
        <div class="comments">
            <Commnets :hotComments="mv.hotComments" />
        </div>
    </div>
</template>

<script setup>
import HLSCore from "@cloudgeek/playcore-hls";
import MVDetail from "../components/MVDetail.vue";
import Commnets from "../components/Comments.vue";
import {
    defineEmit,
    getCurrentInstance,
    onMounted,
    reactive,
} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();
const emit = defineEmit();

const mv = reactive({
    info: {
        name: "",
        artists: [{ name: "" }],
        cover: "",
        playCount: "",
        publishTime: "",
        brs: [
            { size: 36149668, br: 720, point: 5 },
            { size: 84421952, br: 1080, point: 10 },
        ],
    },
    count: {
        likedCount: 0,
        shareCount: 0,
        commentCount: 0,
    },
    urls: [],
    hotComments: [],
});

let { proxy } = getCurrentInstance();

const mvid = route.params.id;

const getUrls = (brs) => {
    brs.forEach((br) => {
        proxy.$axios
            .get("/api/mv/url?id=" + mvid + "&r=" + br.br)
            .then((response) => {
                mv.urls.push({
                    src: response.data.data.url,
                    resolution: response.data.data.r,
                });
            });
    });
};

onMounted(() => {
    proxy.$axios
        .get("/api/mv/detail?mvid=" + mvid)
        .then((response) => {
            mv.info = response.data.data;
            getUrls(mv.info.brs);
            emit("set-title", mv.info.name);
        })
        .catch((error) => {
            message.error(error);
        });

    proxy.$axios
        .get("/api/comment/mv?id=" + mvid)
        .then((response) => {
            mv.hotComments = response.data.hotComments;
        })
        .catch((error) => {
            message.error(error);
        });

    proxy.$axios
        .get("/api/mv/detail/info?mvid=" + mvid)
        .then((response) => {
            mv.count = response.data;
        })
        .catch((error) => {
            message.error(error);
        });
});
</script>

<style lang="stylus" scoped>
.wrap {
    padding 10px
    max-width 500px
    margin auto
    text-align left
}

.info {
    padding 20px 10px
    color #999
}
</style>