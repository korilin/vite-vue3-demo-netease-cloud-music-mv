<template>
    <a-list
        class="comment-list"
        item-layout="horizontal"
        :data-source="hotComments"
    >
        <template #renderItem="{ item }">
            <a-list-item>
                <a-comment
                    :author="item.user.nickname"
                    :avatar="item.user.avatarUrl"
                >
                    <template #content>
                        <p>
                            {{ item.content }}
                        </p>
                    </template>
                    <template #datetime>
                        <a-tooltip :title="'??'">
                            <span>{{ getLocalTime(item.time) }}</span>
                        </a-tooltip>
                    </template>
                </a-comment>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup>
import { defineProps } from "@vue/runtime-core";
import { getLocalTime } from "../utils/index";

defineProps({
    hotComments: { type: Array },
});

/**
 * [
        {
            time: "",
            user: {
                nickname: "",
                avatarUrl: "",
            },
            content: "",
        },
    ],
 */
</script>

<style>
</style>