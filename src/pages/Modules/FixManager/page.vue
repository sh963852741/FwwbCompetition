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
                    <i-col>工作间：{{workcellInfo.Name}}</i-col>
                </i-row>
            </i-col>
        </i-row>
        <i-row type="flex">
            <i-col offset="2" class="pending-tip">{{messageNum === 0 ? "待办已经全部完成" : `您当前有${messageNum}条待办事项`}}</i-col>
        </i-row>
        <i-row>
            <i-col span="4" class="message-zone" offset="1" scroll-y>
                <Scroll :height="210">
                    <template v-for="(item, index) in message">
                        <i-row style="margin-top: 15px" :key="index">
                            <a :href="'/manage/' + pagePath[item.WorkflowName] + '?InstanceId=' + item.InstanceId + '&StepId=' + item.StepId">
                                <i-col span="1" style="margin-left: 30px">
                                    <Icon size="24" style="float: right;" type="ios-pricetag" />
                                </i-col>
                                <i-col span="12" style="font-weight: bold;margin-left: 6px">{{item.Owner}}提交的{{item.WorkflowName}}已经到达您的步骤：{{item.StepName}}</i-col>
                            </a>
                        </i-row>
                    </template>
                </Scroll>
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
            messageNum: 0,
            pagePath: {
                '采购入库申请': 'purchaseform',
                '报废申请': 'scrapform',
                '夹具维修申请': 'maintainform'
            },
            userInfo: app.userInfo,
            bgImg: {
                backgroundImage: 'url(' + require("@/assets/bg2.png") + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '100%',
                height: '100%'
            },
            message: [],
            workcellInfo: {
                WorkCellID: ''
            },
            functionArray: [
                {
                    title: "出库申请",
                    routerTo: {
                        name: "IOPutForm"
                    },
                    icon: "ios-cloud-download"
                },
                {
                    title: "入库申请",
                    routerTo: {
                        name: "IOPutForm"
                    },
                    icon: "ios-cloud-upload"
                },
                {
                    title: "采购入库申请",
                    routerTo: {
                        name: "PurchaseForm",
                        query: {
                            WorkCellID: this.ID
                        }
                    },
                    icon: "ios-cart"
                },
                {
                    title: "报修申请",
                    routerTo: {
                        name: "MaintainForm",
                        query: {
                            WorkCellID: this.ID
                        }
                    },
                    icon: "md-hammer"
                },
                {
                    title: "报废申请",
                    routerTo: {
                        name: "ScrapForm",
                        query: {
                            workcellID: this.ID,
                            InstanceId: this.ID,
                            StepId: this.ID
                        }
                    },
                    icon: "md-trash"
                }
            ]
        }
    },
    methods: {
        getPending () {
            axios.post("/api/workflow/Pending", {pageSize: 100}, msg => {
                this.message = msg.data;
                this.messageNum = msg.totalRow;
            })
        },
        dealWorkflow (instanceId, stepId) {
            window.open("/manage/org/activityform?instanceId=" + instanceId + '&stepId=' + stepId);
        },
        routerTo (router) {
            if (router.name === 'ScrapForm') {
               axios.post("/api/fwwb/DiscardApplicate", {id: router.query.workcellID}, msg => {
                    if (msg.success) {
                        this.functionArray[4].routerTo.query.InstanceId = msg.instanceId;
                        this.functionArray[4].routerTo.query.StepId = msg.stepId;
                        this.$router.push(router);
                    } else {
                        this.$Message.warning(msg.msg);
                    }
                })
            } else if (router.name === "PurchaseForm") {
                this.functionArray[2].routerTo.query.WorkCellID = this.workcellInfo.ID;
                this.$router.push(router);
            } else if (router.name === "MaintainForm") {
                this.functionArray[3].routerTo.query.WorkCellID = this.workcellInfo.ID;
                this.$router.push(router);
            }
        },
        async getWorkCellInfo () {
            await fixtureManager.getWorkCellInfo().then(res => {
                this.functionArray[4].routerTo.query.workcellID = res.ID;
                this.workcellInfo = res;
            })
        }
    },
    mounted () {
        app.title = "工作间管理";
        this.getWorkCellInfo();
        this.getPending();
    }
}
</script>

<style lang="less" scoped>
    a:link {color: black}
    a:visited {color: black;}
    a:hover {color: blue;}
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
