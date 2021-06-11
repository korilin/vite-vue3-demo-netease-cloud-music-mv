<template>
    <div
        :class="['page-title-bar', current.key[0]]"
        v-if="route.name != 'login'"
    >
        {{ current.title }}
    </div>
    <router-view @set-title="setTitle"></router-view>
    <div class="select-bar" v-if="route.name != 'login'">
        <a-menu
            v-model:selectedKeys="current.key"
            mode="horizontal"
            @click="changePage"
        >
            <a-menu-item key="mvs"> 首页 </a-menu-item>
            <a-menu-item key="discover"> 发现 </a-menu-item>
            <a-menu-item key="user"> 用户 </a-menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import { reactive, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();

const current = reactive({
    title: "网易MV",
    key: ["mvs"],
    titleMap: {
        mvs: "网易MV",
        discover: "新歌推荐",
        user: "个人信息",
        mvi: "MV",
    },
});

watch(
    () => route.name,
    (newName) => {
        current.key = [newName];
        current.title = current.titleMap[newName];
    }
);

const changePage = (item) => {
    let key = item.key;
    if (key != current.key[0]) {
        current.key = [key];
        router.push({ name: key });
    }
};

const setTitle = (title) => {
    current.title = title;
};
</script>

<style lang="less">
@import "ant-design-vue/dist/antd.less";

@primary-color: #ce1010;
</style>

<style lang="stylus">
::-webkit-scrollbar {
    width 0
}

#app {
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    min-height 100vh
    padding-bottom 80px
    max-width 900px
    margin auto
}

.mvs, .mvi {
    background #242424
    color white
}

.discover {
    background #ce1010
    color white
}

.user {
    background white
    color #2c3e50
    border-bottom solid #3c3c431f 1px
}

.page-title-bar {
    font-size 20px
    padding 15px 0
    font-weight bold
    transition 0.25s all
}

.select-bar {
    position fixed
    bottom 0
    text-align center
    width 100%
    max-width 900px
    border-top solid #3c3c431f 1px

    .ant-menu li {
        margin auto
    }
}
</style>
