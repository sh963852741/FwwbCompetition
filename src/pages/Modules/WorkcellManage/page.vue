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
                    <i-form>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工作间名称">
                                    <i-input/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工作间位置">
                                    <i-input/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工作间">
                                    <i-input/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row type="flex">
                            <i-col span="10">
                                <i-form-item label="工具夹最大容纳数">
                                    <i-input/>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-button type="primary">保存</i-button>
                    </i-form>
                </i-tab-pane>
                <i-tab-pane label="工夹具管理" style="background-color: rgba(255, 255, 255, 0.75);">
                    <i-row>
                        <i-col span="6"><Tree :data="fixtureTree" @on-select-change="test"></Tree></i-col>
                        <i-col span="18">
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
        <i-modal>
            <component :is="'user-form'"></component>
        </i-modal>
    </i-row>
</template>
<script>
const app = require("@/config");
const userForm = require("./userform");
export default {
    components: {
        "user-form": userForm
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
                    children: [
                        {
                            title: 'EF2189 夹具定义',
                            expand: true,
                            children: [
                                {
                                    title: '1号夹具'
                                },
                                {
                                    title: '2号夹具'
                                }
                            ]
                        },
                        {
                            title: 'EF0789 夹具定义',
                            expand: true,
                            children: [
                                {
                                    title: '1号夹具'
                                },
                                {
                                    title: '2号夹具'
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
    },
    methods: {
        test (e) {
            if (!e[0].children) {
                alert("还没有夹具实体详细页");
            }
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
</style>
