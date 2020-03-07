<template>
    <i-card :padding="100">
        <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row style="font-size:30px; margin-bottom:10px">夹具名称：{{entityName}}</i-row>
                    <i-row>
                        <i-col>夹具实体数量：{{tableData.length}}</i-col>
                    </i-row>
                </i-col>
            </i-row>
        <i-tabs v-model="tabSelect" style="margin-top: 20px">
            <i-tab-pane label="夹具实体列表" name="entity">
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
                        <i-table row-key="ID" stripe :columns="tableCol.fix" :data="tableData" :loading="tableLoading">
                            <template slot="Action" slot-scope="{row}">
                                <i-button @click="modifyEntity(row)">修改</i-button>
                                <i-button @click="delEntity(row.ID)">删除</i-button>
                            </template>
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
            <i-tab-pane label="工具夹实体定位" name="Location">
                <i-row style="margin-left: 15px;">
                    内容待定
                </i-row>
            </i-tab-pane>
        </i-tabs>
        <i-modal :z-index="10" v-model="modalShow" :title="component.title || '暂无'" @on-ok="submit()" @on-cancel="cancel()">
            <component :is="component.name" ref="Form" :modalData="recordData"></component>
        </i-modal>
    </i-card>
</template>

<script>
import entityForm from "./entity";
const app = require("@/config");
const tableCol = require("./tableCol");
const axios = require("axios");
export default {
    components: {
        "entity-form": entityForm
    },
    data () {
        return {
            app,
            tableCol,
            entityName: "宋润涵的夹具",
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
            isSaving: false,
            tableData: [],
            pager: {
                total: 0,
                page: 1,
                pageSize: 10
            },
            keyword: '',
            id: "",
            WorkcellID: "",
            component: {
                name: "",
                title: ""
            },
            recordData: {},
            callbackFunc: () => {},
            modalShow: false
        }
    },
    methods: {
        submit () {
            let form = this.$refs["Form"];
            form.submit(this.callbackFunc);
        },
        cancel () {
        },
        modifyEntity (row) {
            axios.post("/api/fwwb/GetFix", {id: row.ID}, msg => {
                if (!msg.success) {
                    this.recordData = msg.data;
                    // 假数据 应删
                    this.recordData = row;
                    this.component.name = "entity-form";
                    this.component.title = "修改夹具实体";
                    this.modalShow = true;
                    this.callbackFunc = this.getFixEntity;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        delEntity (ID) {
            axios.post("/api/fwwb/RemoveFix", {id: ID}, msg => {
                if (msg.success) {
                    this.$Message.success("部门信息保存成功");
                } else {
                    this.$Message.warning(msg.msg);
                }
                this.getFixEntity(this.id, this.WorkcellID);
            })
        },
        getFixTable (page, pageSize) {
        },
        getFixEntity (id, WorkcellID) {
            this.tableLoading = true;
            axios.post("/api/fwwb/GetFixs", {WorkcellId: WorkcellID, defId: id}, msg => {
                this.tableData = msg.data;
                this.tableData = [
                    {
                        ID: "id123456",
                        Code: "code123456",
                        DefId: "defId123456",
                        SeqID: "1",
                        BillNo: "2019-12-1-0001",
                        RegDate: "2020/3/6",
                        ProduceDate: "2019/3/6",
                        UsedCout: 0,
                        Location: "A-113-c",
                        RepairDate: "",
                        Owner: "sly"
                    }
                ]
                this.tableLoading = false;
            })
        }
    },
    mounted () {
        app.title = "夹具管理";
        this.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', '正在获取夹具实体列表信息，请稍候……')
                ])
            }
        });
        this.id = "6a9cf94f-39b7-4355-aa3e-43ba92cd0aa4";// this.$route.query.id; "6a9cf94f-39b7-4355-aa3e-43ba92cd0aa4"
        this.WorkcellID = "7c19253d-7aa3-4b79-8d07-2958c46fc684";// this.$route.query.WorkcellID;
        this.getFixEntity(this.id, this.WorkcellID);
        this.tabSelect = this.$route.query.tabSelect || "entity";
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
