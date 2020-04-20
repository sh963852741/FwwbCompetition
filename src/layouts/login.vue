<template>
    <div id="login-layout">
        <div class="wrapper">
            <div class="layout-container">
                <div class="login-form">
                    <div class="main">
                        <div class="form-logo">
                            <router-link to="login">
                                <img :src="app.webInfo.avatar" />
                            </router-link>
                        </div>
                        <div class="form-slogon">
                            <div class="main-title">{{app.webInfo.title}}</div>
                            <div class="slogon-subtitle">{{app.webInfo.subtitle}}</div>
                        </div>
                        <div class="form-content">
                            <slot></slot>
                        </div>
                    </div>
                    <!-- main-form -->
                    <Dropdown v-if="app.debug" style="position: absolute; top: 40px; right: 40px" @on-click="quickLogin">
                        <Alert type="warning" show-icon>
                            已开启快速登录
                            <span slot="desc">该功能仅用于开发模式，鼠标放上来以进行快速登录。<br/>快来Pick你喜爱的小伙伴吧~</span>
                        </Alert>
                        <DropdownMenu slot="list">
                            <DropdownItem name="汪文青">文青（S）</DropdownItem>
                            <DropdownItem name="邵良颖">邵良（M）</DropdownItem>
                            <DropdownItem name="宋润涵">润涵（II）</DropdownItem>
                            <DropdownItem name="岳皓">岳皓（I）</DropdownItem>
                            <DropdownItem name="黄玺">王炸（A）</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let app = require("@/config");
const axios = require("axios");
let md5 = require("md5");
export default {
    data () {
        return {
            app,
            dic: {
                "汪文青": 1384552349,
                "宋润涵": 15102242667,
                "邵良颖": 15102242660,
                "黄玺": 13606924649,
                "岳皓": 13953246598
            }
        };
    },
    methods: {
        quickLogin (name) {
            axios.post("/api/security/Login", {method: 'password', username: this.dic[name], pwd: md5('123456'), isRemember: false, isPwd: true}, msg => {
                if (msg.success) {
                    app.userInfo = msg.userInfo;
                    let ps = app.userInfo.permissons;
                    app.checkPermission = (p) => {
                        return ps && ps.indexOf(p) >= 0;
                    }
                    this.$nextTick(() => {
                        if (msg.success) {
                            let path = this.$route.query.goto || app.dashboard;
                            path = path === "/" ? app.dashboard : path;
                            this.$router.push(path);
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                    });
                } else {
                    this.$Message.warning(msg.msg);
                }
            });
        }
    }
}
</script>

<style lang="less">
#login-layout {
    background-color: #fafafa;
    position: relative;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    .wrapper {
        width: 100%;
        min-height: calc(100vh);
        background: #fafafa;
    }
    .layout-container {
        max-width: 1056px;
        padding-left: 16px;
        padding-right: 16px;
        margin: 0 auto;
        height: 100%;
        .login-form {
            padding-top: 96px;
            width: 430px;
            margin: auto;
            .main {
                background-color: #fff;
                padding: 40px 8px 48px;
                margin-bottom: 64px;
                border: 1px solid #e9e9e9;
                border-radius: 4px;
                .form-logo {
                    max-width: 320px;
                    margin: 0 auto;
                    text-align: center;
                    padding-bottom: 20px;
                    img {
                        width: 64px;
                        height: 64px;
                    }
                }
                .form-slogon {
                    margin: 0 auto;
                    border-radius: 4px;
                    font-size: 14px;
                    text-align: center;
                    max-width: 340px;
                    .main-title {
                        font-size: 32px;
                        line-height: 32px;
                        color: #262626;
                    }
                    .slogon-subtitle {
                        color: #595959;
                        margin-top: 8px;
                        font-size: 18px;
                    }
                }
                .form-content {
                    margin: 0 auto;
                    border-radius: 4px;
                    font-size: 14px;
                    text-align: center;
                    max-width: 340px;
                    margin-top: 32px;
                }
            }
        }
    }
}
</style>
