<template>
    <div class="search">
        <CustomInput
            :placeholder="'搜索MV'"
            :value="searchValue"
            @search="(value) => { searchValue = value; }"
        />
    </div>
    <div id="mvs">
        <a-row :gutter="{ xs: 12, sm: 20, md: 20 }">
            <template v-for="m in mv.data" :key="m.id">
                <a-col
                    :xs="12"
                    :sm="12"
                    :md="8"
                    :lg="8"
                    :xl="6"
                    :xll="4"
                    v-show="
                        m.name.includes(searchValue) ||
                        getArtists(m.artists).includes(searchValue)
                    "
                >
                    <a-card
                        hoverable
                        style="position: relative"
                        :bordered="false"
                        @click="toMvInfo(m.id)"
                    >
                        <template #cover>
                            <img :alt="m.id" :src="m.cover" />
                            <span class="play-count"
                                ><EyeOutlined />
                                {{ getPlayCount(m.playCount) }}
                            </span>
                        </template>
                        <a-card-meta :title="m.name">
                            <template #description>
                                {{ getArtists(m.artists) }}
                            </template>
                        </a-card-meta>
                    </a-card>
                </a-col>
            </template>
        </a-row>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted, ref, defineEmit } from "vue";
import { message } from "ant-design-vue";
import { EyeOutlined } from "@ant-design/icons-vue";
import { getArtists, getPlayCount } from "../utils/index";
import { useRouter } from "vue-router";
import CustomInput from "../components/CustomInput.vue";

let { proxy } = getCurrentInstance();

const router = useRouter();
const emit = defineEmit(["set-title"]);

const mv = reactive({
    offset: 0,
    count: 0,
    data: [],
});

let searchValue = ref("");

onMounted(() => {
    proxy.$axios
        .get("/api/mv/all?area=日本&limit=30&offset=" + mv.offset)
        .then((response) => {
            mv.count = response.data.count;
            mv.data = response.data.data;
        })
        .catch((error) => {
            message.error(error);
        });
});

const toMvInfo = (id) => {
    router.push({ name: "mvi", params: { id: id } });
};
</script>

<style lang="stylus" scoped>
#mvs {
    padding 10px

    .play-count {
        position absolute
        top 8px
        text-align right
        padding 0 15px
        color white
        font-size 12px
    }
}

.search {
    height 60px
    background #eee
    display flex
    align-items center
    justify-content center
}
</style>

<style lang="stylus">
#mvs {
    .ant-col {
        margin-bottom 10px !important
    }

    .ant-card-body {
        padding 10px 0 !important
        text-align left

        .ant-card-meta-title {
            font-weight bold
            margin-bottom 0
        }

        .ant-card-meta-description {
            font-size 12px
        }
    }
}
</style>