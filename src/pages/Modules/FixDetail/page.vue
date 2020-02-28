<template>
    <i-card :padding="100">
        <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row style="font-size:30px; margin-bottom:10px">夹具名称：名字字字字字</i-row>
                    <i-row>
                        <i-col>夹具实体数量：00</i-col>
                    </i-row>
                </i-col>
            </i-row>
        <i-tabs v-model="tabSelect" style="margin-top: 20px">
            <i-tab-pane label="基本信息" name="basicInfo">
                <i-row style="margin-left: 15px">
                    <i-spin fix size="large" v-show="tableLoading"></i-spin>
                    <i-col span="16">
                        <i-form :model="fixInfo" :rules="ruleForBasic" ref="form">
                            <i-row type="flex" justify="space-between">
                                <i-col span="22">
                                    <i-form-item label="夹具名称" span="8" prop="Name">
                                        <i-input v-model="fixInfo.Name"/>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="夹具代码" prop="Code">
                                        <i-input v-model="fixInfo.Code" />
                                    </i-form-item>
                                </i-col>
                                <i-col span="10" offset="2">
                                    <i-form-item label="夹具用途" prop="UsedFor">
                                        <i-input v-model="fixInfo.UsedFor" />
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="夹具所属类别">
                                        <i-input v-model="fixInfo.Family"/>
                                    </i-form-item>
                                </i-col>
                                <i-col span="10" offset="2">
                                    <i-form-item label="夹具模组">
                                        <i-input v-model="fixInfo.Model"/>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="夹具料号">
                                        <i-input v-model="fixInfo.PartNo"/>
                                    </i-form-item>
                                </i-col>
                                <i-col span="10" offset="2">
                                    <i-form-item label="建档日期" prop="DocDate">
                                        <i-date-picker type="date" v-model="fixInfo.DocDate" format="yyyy年MM月dd日" />
                                    </i-form-item>
                                </i-col>
                            </i-row>
                        </i-form>
                        <i-button type="primary" @click="savefixDetail()" :loading="isSaving">保存</i-button>
                    </i-col>
                    <i-col span="7" offset="1">
                        <i-button @click="showLog = !showLog" type="text" style="float:right; padding-top: 12px;">查看修改记录</i-button>
                        <i-drawer title="修改记录" v-model="showLog" scrollable width="20">
                            <i-timeline class="timeline i-scrollbar-hide">
                                <TimelineItem v-for="(item,index) in logs" :key="index">
                                    <i-row>
                                        <p class="time">{{item.OperateOn}} {{item.Operator}}</p>
                                        <p class="content">
                                            <i-row v-for="(d,index) in item.Details" :key="index">
                                                {{d}}
                                            </i-row>
                                        </p>
                                    </i-row>
                                </TimelineItem>
                            </i-timeline>
                        </i-drawer>
                    </i-col>
                </i-row>
            </i-tab-pane>
            <i-tab-pane label="工具夹实体" name="entity">
                <i-card dis-hover>
                        <i-row type="flex" justify="space-between" align="middle" slot="title">
                            <i-col>
                                <i-row type="flex" align="middle" :gutter="16">
                                    <i-col>工作夹实体</i-col>
                                </i-row>
                            </i-col>
                            <i-col>
                                <i-row type="flex" :gutter="16">
                                    <i-col>
                                        <i-input prefix="ios-search" placeholder="搜索工具夹实体" v-model="keyword" @keyup.enter.native="getFixTable()"/>
                                    </i-col>
                                </i-row>
                            </i-col>
                        </i-row>
                        <i-table stripe :columns="tableCol.fix" :data="tableData.fix" :loading="tableLoading">
                        </i-table>
                        <br/>
                        <i-page show-sizer show-total :total="pager.total" @on-change="getFixTable($event, null)" @on-page-size-change="getFixTable(null, $event)" />
                    </i-card>
            </i-tab-pane>
            <i-tab-pane label="夹具出入库记录" name="IORecords">
                <i-row style="margin-left: 15px;">
                    <i-row>
                        <i-spin fix size="large" v-show="tableLoading"></i-spin>
                        <i-row class="title" v-if="inRecords.length>0">出库记录:</i-row>
                        <template v-for="(item,index) in inRecords">
                            <Alert type="success" :key="index">{{item.Code}}-{{item.SeqID}}由{{item.RecByName}}于{{item.RecOn}}入库成功</Alert>
                        </template>
                    </i-row>
                    <i-row class="title" v-if="outRecords.length>0">入库记录:</i-row>
                    <i-row>
                        <i-spin fix size="large" v-show="tableLoading"></i-spin>
                        <template v-for="(item,index) in outRecords">
                            <Alert type="error" :key="index">{{item.Code}}-{{item.SeqID}}由{{item.RecByName}}于{{item.RecOn}}出库成功</Alert>
                        </template>
                    </i-row>
                    <i-row v-if="inRecords.length==0 && outRecords.length==0">
                        <!--img :src="pic" /-->此处需要一张表示没有记录的图片
                    </i-row>
                </i-row>
            </i-tab-pane>
            <i-tab-pane label="夹具维修/报废记录" name="MSRecords">
                <i-row style="margin-left: 15px;">
                    <i-row>
                        <i-spin fix size="large" v-show="tableLoading"></i-spin>
                        <i-row class="title" v-if="maintRecords.length>0">出库记录:</i-row>
                        <template v-for="(item,index) in maintRecords">
                            <Alert type="success" :key="index">{{item.Code}}-{{item.SeqID}}由{{item.RecByName}}于{{item.RecOn}}维修成功</Alert>
                        </template>
                    </i-row>
                    <i-row class="title" v-if="scrapRecords.length>0">入库记录:</i-row>
                    <i-row>
                        <i-spin fix size="large" v-show="tableLoading"></i-spin>
                        <template v-for="(item,index) in scrapRecords">
                            <Alert type="error" :key="index">{{item.Code}}-{{item.SeqID}}由{{item.RecByName}}于{{item.RecOn}}报废成功</Alert>
                        </template>
                    </i-row>
                    <i-row v-if="scrapRecords.length==0 && maintRecords.length==0">
                        <!--img :src="pic" /-->此处需要一张表示没有记录的图片>
                    </i-row>
                </i-row>
            </i-tab-pane>
            <i-tab-pane label="工具夹寿命预测" name="lifePredic">
                <i-row style="margin-left: 15px;">
                    内容待定
                </i-row>
            </i-tab-pane>
        </i-tabs>
    </i-card>
</template>

<script>
const app = require("@/config");
const tableCol = require("./tableCol");
export default {
    data () {
        return {
            app,
            tableCol,
            showLog: false,
            inRecords: [
                {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }
            ],
            outRecords: [
                {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }
            ],
            maintRecords: [
                {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }
            ],
            scrapRecords: [
                {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }, {
                    Code: 'oooo-oooo',
                    SeqID: 0,
                    RecByName: "OOO",
                    RecOn: "0000年00月00日 00：00"
                }
            ],
            tabSelect: "",
            tableLoading: false,
            fixInfo: {},
            ruleForBasic: {},
            isSaving: false,
            logs: [],
            tableData: {},
            pager: {
                total: 0,
                page: 1,
                pageSize: 10
            },
            keyword: ''
        }
    },
    methods: {
        savefixDetail () {
        },
        getFixTable (page, pageSize) {
        }
    },
    mounted () {
        this.tabSelect = "basicInfo";
    }
}
</script>

<style lang="less">
.title {
    font-size: 20px;
    color: #17233d;
    padding: 10px 0px;
    margin-top: 10px;
}
.ivu-form-item .ivu-date-picker{
    width: 100%;
}
.spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.ivu-poptip-body-content {
    overflow: hidden;
}
.tip {
    font-size: 13px;
    font-weight: bold;
}
.username {
    font-size: 34px;
    color: #17233d;
    padding: 5px 0;
    font-weight: bold;
}
</style>
