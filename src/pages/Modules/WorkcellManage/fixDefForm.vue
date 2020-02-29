<template>
    <i-row>
        <i-card :padding="100" :style="bgImg">
            <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row>
                        <i-row class="title">WorkCell JW-05</i-row>
                        <i-col class="tip" span="3">访问级别：管理员</i-col>
                        <i-col class="tip" span="3">WorCellID：7</i-col>
                    </i-row>
                </i-col>
            </i-row>
            <i-tabs>
                <i-tab-pane label="基本信息">
                    <i-row>
                        <i-col span="4">
                            <Tree :data="fixs"></Tree>
                        </i-col>
                        <i-col span="19">
                            <i-row>
                                <i-col span="6">
                                    <div id="bin1" style="width:300px;height:250px"/>
                                </i-col>
                                <i-col span="6" offset="2">
                                    <div id="bin2" style="width:300px;height:250px"/>
                                </i-col>
                                <i-col span="6" offset="2">
                                    <div id="bin3" style="width:300px;height:250px"/>
                                </i-col>
                            </i-row>
                            <i-row style="padding-bottom: 10px;padding-top:10px">
                                <i-input search enter-button placeholder="搜索夹具" style="float:right;width: 300px;height:20px"/>
                            </i-row>
                            <Collapse>
                                <Panel v-for="(item, key) in binData" :key="key">
                                    {{item.name}}
                                    <i-table stripe :columns="binTableCol" :data="item.fix" slot="content"/>
                                </Panel>
                            </Collapse>
                        </i-col>
                    </i-row>
                </i-tab-pane>
                <i-tab-pane label="工夹具管理" style="background-color: rgba(255, 255, 255, 0.75);">
                </i-tab-pane>
                <i-tab-pane label="用户管理" style="background-color: rgba(255, 255, 255, 0.75);">
                    <i-row type="flex" :gutter="16">
                        <i-col><i-button type="primary">添加成员</i-button></i-col>
                        <i-col><i-input search enter-button placeholder="搜索成员"/></i-col>
                    </i-row>
                    <br/>
                    <i-table :columns="userTableCol" :data="userTable"/>
                </i-tab-pane>
            </i-tabs>
        </i-card>
    </i-row>
</template>
<script>
const app = require("@/config");
const echarts = require("echarts");
export default {
    data () {
        return {
            app,
            bgImg: {
                backgroundImage: 'url(' + require("@/assets/bg3.png") + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: '100% 100%'
            },
            fixs: [
                {
                    title: 'JW005工作间',
                    expand: true,
                    children: [
                        {
                            title: '夹具柜01',
                            children: [
                                {
                                    title: 'bin位'
                                }
                            ]
                        },
                        {
                            title: '夹具柜01',
                            children: [
                                {
                                    title: 'bin位'
                                }
                            ]
                        },
                        {
                            title: '夹具柜01',
                            children: [
                                {
                                    title: 'bin位'
                                }
                            ]
                        }
                    ]
                }
            ],
            binData: [
                {
                    name: '库位A1',
                    fix: [
                        {
                            SeqID: '1',
                            BillNo: 'BO19070500000002',
                            RegDate: '2019/7/5 16:42:43',
                            UsedCount: '3',
                            binName: '库位A1'
                        },
                        {
                            SeqID: '1',
                            BillNo: 'BO19070500000002',
                            RegDate: '2019/7/5 16:42:43',
                            UsedCount: '3',
                            binName: '库位A1'
                        }
                    ]
                },
                {
                    name: '库位A2',
                    fix: [
                        {
                            SeqID: '1',
                            BillNo: 'BO19070500000002',
                            RegDate: '2019/7/5 16:42:43',
                            UsedCount: '3',
                            binName: '库位A2'
                        },
                        {
                            SeqID: '1',
                            BillNo: 'BO19070500000002',
                            RegDate: '2019/7/5 16:42:43',
                            UsedCount: '3',
                            binName: '库位A2'
                        }
                    ]
                },
                {
                    name: '库位A3',
                    fix: [
                        {
                            SeqID: '1',
                            BillNo: 'BO19070500000002',
                            RegDate: '2019/7/5 16:42:43',
                            UsedCount: '3',
                            binName: '库位A3'
                        },
                        {
                            SeqID: '1',
                            BillNo: 'BO19070500000002',
                            RegDate: '2019/7/5 16:42:43',
                            UsedCount: '3',
                            binName: '库位A3'
                        }
                    ]
                }
            ],
            binTableCol: [
                {
                    title: '夹具序列号',
                    key: 'SeqID'
                },
                {
                    title: '采购单据号',
                    key: 'BillNo'
                },
                {
                    title: '入库日期',
                    key: 'RegDate'
                },
                {
                    title: '已使用次数',
                    key: 'UsedCount'
                },
                {
                    title: '存放库位',
                    key: 'binName'
                }
            ],
            userTableCol: [
                {
                    title: '姓名',
                    key: 'Name'
                }, {
                    title: '工号',
                    key: 'Code'
                }, {
                    title: '角色',
                    key: 'Role'
                }, {
                    title: "操作",
                    slot: 'Action'
                }
            ],
            userTable: [],
            bin1: {
                backgroundColor: '#fff',
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                title: {
                        text: '工夹具使用情况',
                        left: '50%',
                        top: '5%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#515A6E',
                            fontSize: '20',
                            fontWeight: 'bolder'
                        }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 290, name: '维修次数'},
                            {value: 260, name: '借用次数'},
                            {value: 220, name: '返还日期'},
                            {value: 320, name: '入库日期'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        itemStyle: {
                            color: '#c23531'
                        },
                        label: {
                                    position: 'outer',
                                    fontSize: '15'
                        },
                        left: 0,
                        right: '0',
                        top: 0,
                        bottom: 0
                    }
                ]
            },
            bin2: {
                backgroundColor: '#fff',
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                title: {
                        text: '工夹具使用情况',
                        left: '50%',
                        top: '5%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#515A6E',
                            fontSize: '20',
                            fontWeight: 'bolder'
                        }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 290, name: '维修次数'},
                            {value: 260, name: '借用次数'},
                            {value: 220, name: '返还日期'},
                            {value: 320, name: '入库日期'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        itemStyle: {
                            color: '#c23531'
                        },
                        label: {
                                    position: 'outer',
                                    fontSize: '15'
                        },
                        left: 0,
                        right: '0',
                        top: 0,
                        bottom: 0
                    }
                ]
            },
            bin3: {
                backgroundColor: '#fff',
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                title: {
                        text: '工夹具使用情况',
                        left: '50%',
                        top: '5%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#515A6E',
                            fontSize: '20',
                            fontWeight: 'bolder'
                        }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 290, name: '维修次数'},
                            {value: 260, name: '借用次数'},
                            {value: 220, name: '返还日期'},
                            {value: 320, name: '入库日期'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        itemStyle: {
                            color: '#c23531'
                        },
                        label: {
                                    position: 'outer',
                                    fontSize: '15'
                        },
                        left: 0,
                        right: '0',
                        top: 0,
                        bottom: 0
                    }
                ]
            }
        }
    },
    mounted () {
        app.title = "夹具柜管理";
        let ele = document.getElementById("bin1");
        let instance = echarts.init(ele);
        instance.setOption(this.bin1);
        let ele2 = document.getElementById("bin2");
        let instance2 = echarts.init(ele2);
        instance2.setOption(this.bin2);
        let ele3 = document.getElementById("bin3");
        let instance3 = echarts.init(ele3);
        instance3.setOption(this.bin3);
    }
}
</script>
