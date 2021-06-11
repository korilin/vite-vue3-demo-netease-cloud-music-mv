<template>
    <input
        type="text"
        class="custom-input"
        :placeholder="placeholder"
        v-model="value"
        @keydown.enter="onEnter(value)"
    />
</template>

<script setup>
import { defineEmit, defineProps } from "@vue/runtime-core";

const emit = defineEmit();

defineProps({
    placeholder: {
        type: String,
    },
    value: {
        type: String,
    },
});

const onEnter = (value) => {
    emit("search", value);
};
</script>

<style lang="stylus" scoped>
.custom-input {
    min-width 150px
    width 80%
    padding 8px 20px
    border 1px #fff solid
    border-radius 20px
    outline none
    transition all 0.5s

    &:focus {
        outline none
        border 1px #999 solid
    }

    &:hover {
        outline none
        border 1px #ccc solid
    }

    &::placeholder {
        color #999
    }
}
</style>