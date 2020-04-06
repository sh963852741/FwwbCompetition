<template>
    <i-card :padding="50" :style="bgImg">
        <i-row type="flex">
            <i-col style="margin-top: 10px;margin-right: 40px" offset="2">
                <i-row class="username">{{userInfo.realName}}</i-row>
            </i-col>
            <i-col style="margin-top: 25px">
                <i-row>
                    <i-col>ID：0000-0000</i-col>
                </i-row>
                <i-row>
                    <i-col>工作间：某某某工作间</i-col>
                </i-row>
            </i-col>
        </i-row>
        <i-row type="flex">
            <i-col offset="2" class="pending-tip">{{message.length === 0 ? "待办已经全部完成" : `您当前有${message.length}条待办事项`}}</i-col>
        </i-row>
        <i-row>
            <i-col span="4" class="message-zone" offset="1">
                <template v-for="(item, index) in message">
                    <i-row style="margin-top: 15px" :key="index">
                        <a :href="['/manage/dashboard/discard?instanceId=' + item.InstanceId + '&stepId=' + item.StepId]">
                            <i-col span="1" style="margin-left: 30px">
                                <Icon size="24" style="float: right;" type="ios-pricetag" />
                            </i-col>
                            <i-col span="12" style="font-weight: bold;margin-left: 6px">{{item.Owner}}提交的{{item.WorkflowName}}已经到达您的步骤：{{item.StepName}}</i-col>
                        </a>
                    </i-row>
                </template>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="2" style="height: 1px;margin-right: 5px"></i-col>
            <i-col span="2" v-for="(item,index) in functionArray" class="my-button" :key="index">
                <a @click="routerTo(item.routerTo)">
                    <i-card style="color: white;" class="layout-con">
                        <i-icon size="30" style="display: block" class="margin" :type="item.icon"/>{{item.title}}
                    </i-card>
                </a>
            </i-col>
        </i-row>
    </i-card>
</template>

<script>
import fixtureManager from "../fixtureManager.js";
const axios = require("axios");
const app = require("@/config");
export default {
    data () {
        return {
            userInfo: app.userInfo,
            bgImg: {
                backgroundImage: 'url(' + require("@/assets/bg2.png") + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '100%',
                height: '100%'
            },
            message: [],
            ID: "",
            workcellInfo: {},
            functionArray: [
                {
                    title: "出库申请",
                    routerTo: {
                        name: "WorkflowConfig"
                    },
                    icon: "ios-cloud-download"
                },
                {
                    title: "入库申请",
                    routerTo: {
                        name: "WorkflowConfig"
                    },
                    icon: "ios-cloud-upload"
                },
                {
                    title: "采购入库申请",
                    routerTo: {
                        name: "WorkflowConfig"
                    },
                    icon: "ios-cart"
                },
                {
                    title: "报修申请",
                    routerTo: {
                        name: "WorkflowConfig"
                    },
                    icon: "md-hammer"
                },
                {
                    title: "报废申请",
                    routerTo: {
                        name: "DiscardApplication",
                        query: {
                            instanceId: this.ID,
                            stepId: this.ID,
                            workcellID: this.ID
                        }
                    },
                    icon: "md-trash"
                }
            ]
        }
    },
    methods: {
        getPending () {
            axios.post("/api/workflow/Pending", {}, msg => {
                this.message = msg.data;
            })
        },
        dealWorkflow (instanceId, stepId) {
            window.open("/manage/org/activityform?instanceId=" + instanceId + '&stepId=' + stepId);
        },
        routerTo (router) {
            if (router.name === 'DiscardApplication') {
               axios.post("/api/fwwb/DiscardApplicate", {id: this.ID}, msg => {
                    if (msg.success) {
                        this.functionArray[4].routerTo.query.instanceId = msg.instanceId;
                        this.functionArray[4].routerTo.query.stepID = msg.stepId;
                        this.$router.push(router);
                    } else {
                        this.$Message.warning(msg.msg);
                    }
                })
            } else {
                this.$router.push(router);
            }
        },
        async getWorkCellInfo () {
            this.workcellInfo = await fixtureManager.getWorkCellInfo().then((res) => {
                this.$nextTick(() => {
                    console.log(res);
                    this.ID = res.ID;
                    this.functionArray[4].routerTo.query.workcellID = res.ID;
                })
            })
        }
    },
    mounted () {
        app.title = "工作间管理";
        this.getWorkCellInfo()
        this.getPending();
    }
}
</script>

<style lang="less" scoped>
    a:link {color: black}
    .layout-con {
        width: 100%;
        height: 100%;
        background-color: #063559;
        margin-bottom: 24px;
        margin-right: 20px;
        text-align: center;
    }
    .pending-tip{
        color:#515a6e;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .username {
        font-size: 42px;
        color: #17233d;
        padding: 10px 0;
        font-weight: bold;
    }
    .margin {
        margin: 10px;
    }
    .message-zone{
        width: 80%;
        height: 280px;
        background-color: #d1f0f0;
        opacity: 0.75;
    }
    .my-button{
        margin-right: 60px;
        margin-top: -65px;
        height: 130px;
        background-color: #063559;
    }
</style>
