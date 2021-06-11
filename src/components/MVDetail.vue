<template>
    <h2>{{ info.name }}</h2>
    <a-row type="flex">
        <a-col flex="auto" class="artists">
            歌手：{{ getArtists(info.artists) }}
        </a-col>
        <a-col flex="100px" class="count">
            播放：{{ getPlayCount(info.playCount) }}
        </a-col>
    </a-row>
    <a-row type="flex" justify="end" class="count">
        <a-col flex="auto" class="time"
            ><FieldTimeOutlined /> 发行：{{ info.publishTime }}</a-col
        >
        <a-col flex="50px">
            <LikeOutlined />{{ getPlayCount(count.likedCount) }}
        </a-col>
        <a-col flex="50px">
            <CommentOutlined />{{ getPlayCount(count.commentCount) }}
        </a-col>
        <a-col flex="50px">
            <ShareAltOutlined /> {{ getPlayCount(count.shareCount) }}
        </a-col>
    </a-row>
</template>

<script setup>
import { defineProps } from "@vue/runtime-core";
import { getArtists, getPlayCount } from "../utils/index";
import {
    FieldTimeOutlined,
    LikeOutlined,
    CommentOutlined,
    ShareAltOutlined,
} from "@ant-design/icons-vue";

defineProps({
    info: { type: Object },
    count: { type: Object },
});
</script>

<style lang="stylus" scoped>
h2 {
    font-weight bold
}

.artists {
    color #e91e63
}

.count {
    text-align right
}

.time {
    text-align left
}
</style>