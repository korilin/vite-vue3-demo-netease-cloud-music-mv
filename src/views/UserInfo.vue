<template>
    <div class="info-wrap">
        <a-avatar :size="96" shape="square">
            <template #icon><a-image :src="avatar" /></template>
        </a-avatar>
        <a-descriptions :column="{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }">
            <a-descriptions-item label="姓名">林洁彬</a-descriptions-item>
            <a-descriptions-item label="English Name"
                >Kori Lin</a-descriptions-item
            >
            <a-descriptions-item label="班级">18软工8班</a-descriptions-item>
            <a-descriptions-item label="学号">201835020822</a-descriptions-item>
            <a-descriptions-item label="Email">
                korilin.dev@gmail.com
            </a-descriptions-item>
            <a-descriptions-item label="微信公众号">
                Tech Kori
            </a-descriptions-item>
            <a-descriptions-item label="个人博客"
                ><a href="https://korilin.com/"
                    >https://korilin.com/</a
                ></a-descriptions-item
            >
            <a-descriptions-item label="GitHub">
                <a href="https://github.com/korilin">@korilin</a>
            </a-descriptions-item>
            <a-descriptions-item :column="2">
                <p>
                    全栈开发者，Kotlin 栈全端（Kotlin Native, Kotlin/JS, KMM,
                    Ktor Server Side）研究者，开源技术爱好者，业余 Kotlin
                    布道师，深圳 Kotlin User Group 组织者。
                </p>
            </a-descriptions-item>
        </a-descriptions>

        <a-list size="small" bordered :data-source="likelist.songs">
            <template #renderItem="{ item, index }">
                <a-list-item>{{
                    index + 1 + ". " +  item.name + " - " + getArtists(item.ar)
                }}</a-list-item>
            </template>
            <template #header>
                <div class="likelist-header">我喜欢的音乐</div>
            </template>
            <template #footer>
                <div class="likelist-footer">{{ likelist.ids.length }} 首</div>
            </template>
        </a-list>
    </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import imgUrl from "../assets/korilin.png";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance, onMounted, watch } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { getArtists } from "../utils/index";

const avatar = ref(imgUrl);
const store = useStore();
const router = useRouter();
let { proxy } = getCurrentInstance();

const account = store.state.account;

const likelist = reactive({ ids: [], songs: [] });

onMounted(async () => {
    if (account == null) {
        await router.push({ name: "login" });
    } else {
        proxy.$axios
            .get("/api/likelist?uid=" + account.uid)
            .then((response) => {
                likelist.ids = response.data.ids;
            })
            .catch((error) => {
                message.error(error);
            });
    }
});

watch(
    () => likelist.ids,
    (ids) => {
        proxy.$axios
            .get("/api/song/detail?ids=" + ids.toString())
            .then((response) => {
                likelist.songs = response.data.songs;
            })
            .catch((error) => {
                message.error(error);
            });
    }
);
</script>

<style lang="stylus" scoped>
.info-wrap {
    padding 30px 60px
    max-width 600px
    margin auto
}

.likelist-header {
    color #ce1010
    font-weight bold
}
</style>

<style lang="stylus">
.info-wrap {
    .ant-avatar {
        margin 0 auto 30px
    }

    .ant-descriptions {
        text-align left
    }

    .ant-list-item {
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        text-align left
    }
}
</style>