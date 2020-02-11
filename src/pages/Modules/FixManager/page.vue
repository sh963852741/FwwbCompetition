<template>
    <i-card :padding="50">
        <i-row  type="flex">
            <i-col span="3" style="text-align: center;margin-top: 10px">
                <Avatar style="height: 80px;width: 80px" :src="app.userInfo.avatar" />
            </i-col>
            <i-col span="20">
                <i-row class="username">{{app.userInfo.realName}}</i-row>
                <i-row class="tip">
                    <i-col span="6">工作ID：0000-0000</i-col>
                    <i-col span="6">工作间：某某某工作间</i-col>
                </i-row>
            </i-col>
        </i-row>
        <Divider />
        <i-row class="title">待办事项</i-row>
        <i-row>
            <List v-if="message.length >0" :header="`您有${message.length}条待办事项`">
                <template v-for="(item,index) in message" >
                    <ListItem :key="index">
                        <ListItemMeta :title="`${item.Owner}提交的${item.WorkflowName}流程已到达您的步骤`" :description="`到达时间:${item.ArriveOn}`"></ListItemMeta>
                        <template slot="action">
                            <li @click="dealWorkflow(item.InstanceId, item.StepId)"><a>{{item.StepName}}</a></li>
                        </template>
                    </ListItem>
                </template>
            </List>
            <template v-else>
                <i-row class="layout-con"><img :src="pic" /></i-row>
            </template>
        </i-row>
        <i-row class="title">常用入口</i-row>
        <i-row  type="flex">
            <i-col span="7"  v-for="(item,index) in functionArray" :key="index">
                <i-card class="layout-con" :to="item.routerTo">
                    <i-avatar class="margin" :icon="item.icon" />{{item.title}}
                </i-card>
            </i-col>
        </i-row>
    </i-card>
</template>

<script>
// const axios = require("axios");
const app = require("@/config");
let pic = require("@/assets/icon.png");
export default {
    data () {
        return {
            app,
            pic,
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
                    icon: "md-person-add"
                },
                {
                    title: "入库申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "采购入库申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "保修申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "报废申请",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "管理本WorkCell以及夹具",
                    routerTo: {
                        name: "WorkflowConfig",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
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
    .layout-con {
        margin-bottom: 24px;
        margin-right: 20px;
        text-align: center;
        color: #515a6e;
    }
    .username {
        font-size: 32px;
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
