<template>
    <div class="discover-wrap">
        <a-list item-layout="horizontal" :data-source="recommend.newSong">
            <template #renderItem="{ item }">
                <a-list-item class="item">
                    <a-row type="flex" :gutter="8">
                        <a-col :span="10">
                            <img
                                class="song-img"
                                :alt="item.name"
                                :src="item.picUrl"
                            />
                        </a-col>
                        <a-col :span="14">
                            <div class="song-info">
                                <div class="title">{{ item.name }}</div>
                                <div class="artists">
                                    <UserOutlined /> 歌手：{{
                                        getArtists(item.song.artists)
                                    }}
                                </div>
                                <div class="duration">
                                    <FieldTimeOutlined /> 时长：
                                    {{ getDuration(item.song.duration) }}
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted } from "vue";
import { message } from "ant-design-vue";
import { getArtists, getDuration } from "../utils/index";
import { UserOutlined, FieldTimeOutlined } from "@ant-design/icons-vue";

let { proxy } = getCurrentInstance();

const recommend = reactive({
    newSong: [],
});

onMounted(() => {
    proxy
        .$axios("/api/personalized/newsong")
        .then((response) => {
            recommend.newSong = response.data.result;
        })
        .catch((error) => {
            message.error(error);
        });
});
</script>

<style lang="stylus" scoped>
.item {
    width 100%

    .song-info {
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        text-align left
        padding-left 10px

        .title {
            font-size 18px
            font-weight bold
            margin 15px 0
        }

        .artists, .duration {
            font-size 12px
            color #999
        }
    }
}

.discover-wrap {
    padding 15px
}

.song-img {
    width 100%
    max-width 200px
}

.song {
    height 100px
}
</style>

<style lang="stylus">
.discover-wrap {
    .ant-list-item {
        display block !important
    }
}
</style>