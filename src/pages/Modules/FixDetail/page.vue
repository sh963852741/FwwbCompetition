<template>
    <i-card :padding="100">
        <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row style="font-size:30px; margin-bottom:10px">Code: {{Data.Code}}</i-row>
                    <i-row style="font-size:30px; margin-bottom:10px">SeqID: {{Data.SeqID}}</i-row>
                </i-col>
            </i-row>
        <i-tabs v-model="tabSelect" style="margin-top: 20px">
            <i-tab-pane label="实体信息" name="entityInfo">
                <i-row style="margin-left: 15px">
                    <i-spin fix size="large" v-show="tableLoading"></i-spin>
                    <i-col span="16">
                        <i-form :model="Data" :rules="ruleForEntity" ref="form">
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="夹具位置" prop="Bin">
                                        <i-input v-model="Data.Bin" />
                                    </i-form-item>
                                </i-col>
                                <i-col span="10" offset="2">
                                    <i-form-item label="采购单据号" prop="BillNo">
                                        <i-input v-model="Data.BillNo" />
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="建档日期" prop="RegDate">
                                        <i-date-picker type="date" v-model="Data.RegDate" format="yyyy年MM月dd日" />
                                    </i-form-item>
                                </i-col>
                                <i-col span="10" offset="2">
                                    <i-form-item label="生产日期" prop="ProduceDate">
                                        <i-date-picker type="date" v-model="Data.ProduceDate" format="yyyy年MM月dd日" />
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="使用次数" prop="UsedCount">
                                        <i-input v-model="Data.UsedCount"/>
                                    </i-form-item>
                                </i-col>
                                <i-col span="10" offset="2">
                                    <i-form-item label="维修日期" prop="RepairDate">
                                        <i-date-picker type="date" v-model="Data.RepairDate" format="yyyy年MM月dd日" />
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row type="flex">
                                <i-col span="10">
                                    <i-form-item label="负责人" prop="Owner">
                                        <i-input v-model="Data.Owner"/>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                        </i-form>
                        <i-button type="primary" @click="saveEntity()" :loading="isSaving">保存</i-button>
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
                <i-row style="margin: 15px;">
                    <i-col span="7">
                        <p class="p">总维修次数</p>
                        <p class="p" style="margin-top: 24px;">000,000</p>
                        <p class="p1">
                            <span>000</span>
                            <span style="vertical-align: top;font-size: 14px;">
                                <Icon type="md-arrow-up" color="#da5953"/>本月新增
                            </span>
                        </p>
                    </i-col>
                    <i-col span="8">
                        <p class="p">总维原因</p>
                        <div id="reason" style="width:300px;height:200px"></div>
                    </i-col>
                    <i-col span="9">
                        <p class="p">寿命预测</p>
                        <p class="p2 center">剩余：0000年00月00日</p>
                    </i-col>
                </i-row>
                <i-row style="margin: 15px;">
                    <i-col span="15">
                        <p class="p">每月维修量</p>
                        <div id="count" style="width:500px;height:400px"></div>
                    </i-col>
                    <i-col span="8">
                        <p class="p" style="margin-bottom: 35px">维修记录</p>
                        <template v-for="(item, index) in logList.maintainLogs">
                            <p :key=index>{{item}}</p>
                        </template>
                    </i-col>
                </i-row>
            </i-tab-pane>
            <i-tab-pane label="工具夹实体定位" name="Location">
                <i-row style="margin-left: 15px;">
                    内容待定
                </i-row>
            </i-tab-pane>
        </i-tabs>
    </i-card>
</template>

<script>
const echarts = require("echarts");
const app = require("@/config");
const axios = require("axios");
export default {
    data () {
        return {
            app,
            logs: [],
            logList: {
                maintainLogs: [
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复",
                    "xxxx年xx月xx日报修，xx年xx月xx日修复"
                ]
            },
            showLog: false,
            entityName: "",
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
            Data: {
                Code: ''
            },
            EntityID: "",
            // WorkcellID: "",
            ruleForEntity: {},
            reason: {
                title: {
                    // text: '社团类型',
                    // left: '50%',
                    // top: '80%',
                    // textAlign: 'center',
                    // textStyle: {
                    //     color: '#515A6E',
                    //     fontSize: '20',
                    //     fontWeight: 'normal'
                    // }
                },
                series: [{
                    type: 'pie',
                    radius: '35%',
                    center: ['50%', '50%'],
                    data: [{
                        name: '报修原因1',
                        value: 10
                    }, {
                        name: '报修原因2',
                        value: 5
                    }, {
                        name: '报修原因3',
                        value: 10
                    }, {
                        name: '报修原因4',
                        value: 15
                    }, {
                        name: '报修原因5',
                        value: 8
                    }
                    ],
                    label: {
                        position: 'outer',
                        fontSize: '15'
                    },
                    left: 0,
                    right: '0',
                    top: 0,
                    bottom: 0
                }]
            },
            count: {
                title: {
                   // text: '每月维修量'
                },
                tooltip: {},
                legend: {
                    data: ['维修量']
                },
                xAxis: {
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                yAxis: {},
                series: [{
                    name: '维修量',
                    type: 'bar',
                    data: [5, 2, 3, 0, 1, 4, 0, 1, 7, 15, 1, 7]
                }]
            }
        }
    },
    methods: {
        saveEntity () {
            this.isSaving = true;
            let form = this.$refs["form"];
            form.validate(res => {
                if (!res) return;
                axios.post("/api/fwwb/SaveFix", this.Data, msg => {
                    if (msg.success) {
                        this.$Message.success("实体信息修改成功");
                    } else {
                        this.$Message.warning(msg.msg);
                    }
                    form.resetFields();
                    this.isSaving = false;
                    this.getFixEntity();
                });
            })
        },
        getFixEntity () {
            axios.post("/api/fwwb/GetFix", {id: this.EntityID}, msg => {
                this.Data = msg.data;
            })
        }
    },
    mounted () {
        app.title = "夹具实体";
        let ele = document.getElementById("reason");
        let instance = echarts.init(ele);
        instance.setOption(this.reason);
        let ele2 = document.getElementById("count");
        let instance2 = echarts.init(ele2);
        instance2.setOption(this.count);
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
                    h('div', '正在获取夹具实体信息，请稍候……')
                ])
            }
        });
        this.EntityID = this.$route.query.EntityID; // "6a9cf94f-39b7-4355-aa3e-43ba92cd0aa4";// "6a9cf94f-39b7-4355-aa3e-43ba92cd0aa4";//
        // this.WorkcellID = this.$route.query.WorkcellID;// "7c19253d-7aa3-4b79-8d07-2958c46fc684";//
        this.getFixEntity();
        this.tabSelect = this.$route.query.tabSelect || "entityInfo";
        this.$Spin.hide();
    }
}
</script>

<style lang="less" scoped>
.center {
    margin-top: 40px;
    margin-bottom: 10px;
}
.p {
    font-weight: bold;
    font-size: 32px;
}
.p1 {
    color: #da5953;
    font-size: 32px;
    font-weight: bold;
}
.p2 {
    color: #da5953;
    font-size: 36px;
    font-weight: bold;
}
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
