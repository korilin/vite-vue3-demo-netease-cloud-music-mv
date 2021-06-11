<template>
    <div id="login">
        <h1>网易账号登录</h1>

        <a-form
            :model="form"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item>
                <a-input v-model:value="form.phone" placeholder="手机号码">
                    <template #prefix
                        ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                    /></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-model:value="form.password"
                    type="password"
                    placeholder="密码"
                >
                    <template #prefix
                        ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                    /></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="form.phone === '' || form.password === ''"
                >
                    登录
                </a-button>
                <a-button
                    style="margin-left: 40px"
                    @click="cancel"
                >
                    取消
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

let { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();

if (store.state.account != null) {
    router.push({ name: "mvs" });
}

const form = reactive({
    phone: "",
    password: "",
});

const handleFinish = () => {
    const url = "/api/login/cellphone";
    proxy.$axios
        .get(url + "?phone=" + form.phone + "&password=" + form.password)
        .then((response) => {
            if (response.data.code == 200) {
                store.state.account = response.data.account;
                store.state.profile = response.data.profile;
                store.state.token = response.data.token;
                router.push({ name: "user" });
            } else {
                message.error("手机或密码错误");
            }
        })
        .catch((error) => {
            message.error(error);
        });
};

const handleFinishFailed = (errors) => {
    console.log(errors);
};

const cancel = () => {
    router.push({ name: "mvs" });
};
</script>

<style lang="stylus" scoped>
#login {
    width 250px
    height 250px
    margin 0 auto
    padding 100px 0 0

    h1 {
        font-weight bold
        color #ce1010
        margin-bottom 50px
    }
}
</style>