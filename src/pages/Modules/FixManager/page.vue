<template>
    <i-card :padding="50" :style="bgImg">
        <i-row  type="flex">
            <i-col span="2" style="height: 1px;"></i-col>
            <i-col style="margin-top: 10px;margin-right: 40px">
                <i-row class="username">{{app.userInfo.realName}}</i-row>
            </i-col>
            <i-col style="margin-top: 25px">
                <i-row class="tip">
                    <i-col>ID：0000-0000</i-col>
                </i-row>
                <i-row class="tip">
                    <i-col>工作间：某某某工作间</i-col>
                </i-row>
            </i-col>
        </i-row>
        <i-row type="flex">
            <i-col span="2" style="height: 1px;margin-right: 1px"></i-col>
            <i-col v-if="message.length >0" style="font-weight: bold;margin-bottom: 20px">您当前有{{message.length}}条待办事项</i-col>
            <i-col style="font-weight: bold;margin-bottom: 20px" v-else>待办已经全部完成</i-col>
        </i-row>
        <i-row style="margin-left: 30px">
            <i-col span="4" style="width: 900px;height: 250px;background-color: #d1f0f0;opacity: 0.75">
                <template v-for="(item, index) in message">
                    <i-row style="margin-top: 15px" :key="index">
                        <a href="/manage/wwf/config">
                            <i-col span="1" style="margin-left: 30px"><Icon size="24" style="float: right;" type="ios-pricetag" /></i-col>
                            <i-col span="12" style="font-weight: bold;margin-left: 6px">{{item.Owner}}提交的{{item.WorkflowName}}已经到达您的步骤：{{item.StepName}}</i-col>
                            <!--<i-col span="2">
                                <Icon size="20" type="ios-arrow-forward" /><Icon size="20" type="ios-arrow-forward" />
                            </i-col>-->
                        </a>
                    </i-row>
                </template>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="2" style="height: 1px;margin-right: 5px"></i-col>
            <i-col span="2" v-for="(item,index) in functionArray" style="margin-right: 60px;margin-top: -65px;height: 130px;background-color: #063559;" :key="index">
                <i-card style="width: 100%;height: 100%;background-color: #063559;color: white" class="layout-con" :to="item.routerTo">
                    <Icon size="30" style="display: block" class="margin" :type="item.icon" />{{item.title}}
                </i-card>
            </i-col>
        </i-row>
    </i-card>
</template>

<script>
// const axios = require("axios");
const app = require("@/config");
export default {
    data () {
        return {
            app,
            bgImg: {
                backgroundImage: 'url(' + require("@/assets/bg2.png") + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '100%',
                height: '100%'
            },
            message: [
                {
                    instanceId: '',
                    stepId: '',
                    WorkflowName: "测试",
                    Version: '1.0',
                    Owner: 'liangyingshao',
                    StepName: '管理员审核',
                    State: 1,
                    ExecStatus: 0,
                    ArriveOn: '2020年2月11日'
                },
                {
                    instanceId: '',
                    stepId: '',
                    WorkflowName: "测试",
                    Version: '1.0',
                    Owner: 'liangyingshao',
                    StepName: '管理员审核',
                    State: 1,
                    ExecStatus: 0,
                    ArriveOn: '2020年2月11日'
                }
            ],
            functionArray: [
                {
                    title: "出库申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "ios-cloud-download"
                },
                {
                    title: "入库申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "ios-cloud-upload"
                },
                {
                    title: "采购入库申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "ios-cart"
                },
                {
                    title: "报修申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-hammer"
                },
                {
                    title: "报废申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-trash"
                }
            ]
        }
    },
    methods: {

    },
    mounted: {

    }
}
</script>

<style lang="less">
    a:link {color: black}
    .tip {
        font-size: 13px;
        // font-family: "黑体";
        font-weight: bold;
    }
    .layout-con {
        margin-bottom: 24px;
        margin-right: 20px;
        text-align: center;
        color: #515a6e;
    }
    .username {
        font-size: 34px;
        color: #17233d;
        padding: 10px 0;
        font-weight: bold;
    }
    .title {
        font-size: 28px;
        color: #17233d;
        padding: 10px 0px;
        margin-top: 10px;
    }
    .margin {
        margin: 10px;
    }
</style>
