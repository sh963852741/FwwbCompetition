<template>
    <i-row>
        <i-card :padding="100" :style="bgImg">
            <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row>
                        <i-row class="title">{{workcellInfo.Name}}</i-row>
                        <i-col class="tip" span="3">访问级别：管理员</i-col>
                        <i-col class="tip" span="3">WorCellID：{{workcellInfo.Code||'待填写'}}</i-col>
                    </i-row>
                </i-col>
            </i-row>
            <i-tabs>
                <i-tab-pane label="基本信息">
                    <i-form>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工作间名称">
                                    <i-input v-model="workcellInfo.Name"/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                         <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工作间ID">
                                    <i-input v-model="workcellInfo.Code"/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工作间位置">
                                    <i-input v-model="workcellInfo.FixContainerNum"/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="夹具柜数量">
                                    <i-input v-model="workcellInfo.FixContainerNum"/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工具夹最大容纳数">
                                    <i-input v-model="workcellInfo.FixCapacity"/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-button type="primary" @click="saveWorkCell()">保存</i-button>
                    </i-form>
                </i-tab-pane>
                <i-tab-pane label="工夹具管理" style="background-color: rgba(255, 255, 255, 0.75);">
                    <i-row>
                        <i-col span="5"><Tree :data="fixtureTree" @on-select-change="test"></Tree></i-col>
                        <i-col span="18" offset="1">
                            <i-form>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="6">
                                        <i-form-item label="夹具代码">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="夹具名称">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="所属大类">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="6">
                                        <i-form-item label="夹具模组">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="夹具料号">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="配备的数量">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="6">
                                        <i-form-item label="用途">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="保养点检周期">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="责任人">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="10">
                                        <i-form-item label="录入日期">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10">
                                        <i-form-item label="修改日期">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-button type="primary">保存</i-button>
                                <i-button type="text">修改记录</i-button>
                            </i-form>
                            <i-divider />
                            <i-input search enter-button placeholder="搜索夹具"/>
                            <br>
                            <i-table :columns="fixtureTableCol"/>
                        </i-col>
                    </i-row>
                </i-tab-pane>
                <i-tab-pane label="夹具柜" style="background-color: rgba(255, 255, 255, 0.75);">
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
                <i-tab-pane label="用户管理" style="background-color: rgba(255, 255, 255, 0.75);">
                    <i-row type="flex" :gutter="16">
                        <i-col><i-button type="primary" @click="addUser()">添加成员</i-button></i-col>
                        <i-col><i-input search enter-button placeholder="搜索成员"/></i-col>
                    </i-row>
                    <br/>
                    <i-table :columns="userTableCol" :data="userTable"/>
                </i-tab-pane>
            </i-tabs>
        </i-card>
        <i-modal v-model="showModal" :title="modalTitle"  @on-ok="submit()">
            <component :is="bindingForm" ref="form" :formData="formData"></component>
        </i-modal>
    </i-row>
</template>
<script>
import userForm from "./userForm";
import fixDefForm from "./fixDefForm";
const app = require("@/config");
const echarts = require("echarts");
const axios = require("axios");
export default {
    components: {
        "user-form": userForm,
        "fix-def-form": fixDefForm
    },
    data () {
        return {
            app,
            bgImg: {
                backgroundImage: 'url(' + require("@/assets/bg3.png") + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: '100% 100%'
            },
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
            fixtureTableCol: [
                {
                    title: '夹具序列号',
                    key: 'SeqID'
                }, {
                    title: '采购单据号',
                    key: 'BillNo'
                }, {
                    title: '入库日期',
                    key: 'RegDate'
                }, {
                    title: '已使用次数',
                    key: 'UsedCount'
                }, {
                    title: '存放库位',
                    key: 'Location'
                }
            ],
            userTable: [],
            fixtureTree: [
                {
                    title: 'JW05 工作间',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right'
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        icon: 'ios-add',
                                        type: 'primary'
                                    },
                                    style: {
                                        width: '64px'
                                    },
                                    on: {
                                        click: () => { this.addFixDef(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    children: []
                }
            ],
            bindingForm: "user-form",
            showModal: false,
            modalTitle: '',
            workcellInfo: {},
            formData: {},
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
            ]
        }
    },
    mounted () {
        app.title = "工作间管理"
        axios.post("/api/security/GetOrgDetail", {}, msg => {
            this.workcellInfo = msg.data;
            axios.post("/api/fwwb/GetFixDefs", {departId: this.workcellInfo.ID}, msg => {
                this.fixtureTree.children = msg.data;
            })
        });
        let ele = document.getElementById("bin1");
        let instance = echarts.init(ele);
        instance.setOption(this.bin1);
        let ele2 = document.getElementById("bin2");
        let instance2 = echarts.init(ele2);
        instance2.setOption(this.bin2);
        let ele3 = document.getElementById("bin3");
        let instance3 = echarts.init(ele3);
        instance3.setOption(this.bin3);
    },
    methods: {
        test (e) {
            if (!e[0].children) {
                alert("还没有夹具实体详细页");
            }
        },
        addFixDef (data) {
            this.bindingForm = "fix-def-form";
            this.modalTitle = "新增夹具定义";
            this.showModal = true;
        },
        addUser () {
            this.bindingForm = "user-form";
            this.modalTitle = "新增用户";
            this.showModal = true;
        },
        getWorkCellInfo (id) {
            axios.post("/api/security/GetOrgDetail", {}, msg => {
                this.workcellInfo = msg.data;
            })
        },
        getFixDefs () {
            axios.post("/api/fwwb/GetFixDefs", {departId: this.workcellInfo.ID}, msg => {
                this.fixtureTree = msg.data;
            })
        },
        saveWorkCell () {
            axios.post("/api/security/SaveDepartV2", {...this.workcellInfo}, msg => {

            })
        },
        submit () {
            let form = this.$refs["form"];
            form.submit(this.workcellInfo.ID, () => {});
        }
    }
}
</script>

<style>
.title {
    font-size:36px;
    font-weight: bold;
    margin-bottom:10px;
    color:#17233d;
}
.tip {
    color:#808695;
}
.ivu-tree-title{
        width: 100%;
}
</style>
