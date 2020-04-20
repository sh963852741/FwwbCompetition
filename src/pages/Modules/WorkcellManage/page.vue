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
                        <i-col class="tip" span="4">访问级别：管理员</i-col>
                        <i-col class="tip" span="4">WorCellID：{{workcellInfo.Code||'待填写'}}</i-col>
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
                                    <i-input v-model="workcellInfo.Location"/>
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
                        <i-col span="5"><Tree :data="fixtureTree" @on-select-change="selectTreeNode" :render="renderContent"></Tree></i-col>
                        <i-col span="18" offset="1">
                            <i-form>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="6">
                                        <i-form-item label="夹具代码">
                                            <i-input v-model="fixDefInfo.Code"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="夹具名称">
                                            <i-input v-model="fixDefInfo.Name"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="所属大类">
                                            <i-input v-model="fixDefInfo.Family"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="6">
                                        <i-form-item label="夹具模组">
                                            <i-input v-model="fixDefInfo.Model"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="夹具料号">
                                            <i-input v-model="fixDefInfo.PartNo"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="配备的数量">
                                            <i-input v-model="fixDefInfo.Upl"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" justify="space-between">
                                    <i-col span="6">
                                        <i-form-item label="用途">
                                            <i-input v-model="fixDefInfo.UsedFor"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="保养点检周期">
                                            <i-input v-model="fixDefInfo.PMPeriod"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="6">
                                        <i-form-item label="责任人">
                                            <i-input v-model="fixDefInfo.Owner"/>
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
                                <i-button type="primary" @click="saveFixDef()">保存</i-button>
                                <i-button type="text">修改记录</i-button>
                            </i-form>
                            <i-divider />
                            <i-input search enter-button placeholder="搜索夹具"/>
                            <br>
                            <i-table :columns="fixtureTableCol" :data="fixtures">
                                <template slot="Action" slot-scope="{row}">
                                    <i-button @click="toDetail(row)">修改</i-button>
                                    <i-button @click="removeFixture(row)">删除</i-button>
                                </template>
                            </i-table>
                        </i-col>
                    </i-row>
                </i-tab-pane>
                <!-- <i-tab-pane label="夹具柜" style="background-color: rgba(255, 255, 255, 0.75);">
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
                </i-tab-pane> -->
                <i-tab-pane label="用户管理" style="background-color: rgba(255, 255, 255, 0.75);">
                    <i-row type="flex" :gutter="16">
                        <i-col><i-button type="primary" @click="addUser()">添加成员</i-button></i-col>
                        <i-col><i-input search enter-button placeholder="搜索成员"/></i-col>
                    </i-row>
                    <br/>
                    <i-table :columns="userTableCol" :data="userTable">
                        <template slot="Role" slot-scope="{row}">
                            <i-select transfer v-model="row.position" @on-change="setPositon(row, $event)">
                                <i-option value="Operator I" :key="3">Operator I</i-option>
                                <i-option value="Operator II" :key="4">Operator II</i-option>
                                <i-option value="Supervisor" :key="1">Supervisor</i-option>
                                <i-option value="Manager" :key="2">Manager</i-option>
                                <i-option value="Admin" :key="5">Admin</i-option>
                            </i-select>
                        </template>
                        <template slot="Action" slot-scope="{row}">
                            <i-button @click="setPassword(row)">重置密码</i-button>
                            <i-button @click="delUser(row)" type="warning">移除</i-button>
                        </template>
                    </i-table>
                </i-tab-pane>
            </i-tabs>
            <i-button-group></i-button-group>
        </i-card>
        <i-modal v-model="showModal" :title="modalTitle"  @on-ok="submit()">
            <component :is="bindingForm" ref="form" :formData="formData"></component>
        </i-modal>
    </i-row>
</template>
<script>
import fixtureManager from "../fixtureManager.js";
import userForm from "./userForm";
import fixDefForm from "./fixDefForm";
import fixtureForm from "./fixtureForm";
import tableCols from "./tableCols";
const app = require("@/config");
// const echarts = require("echarts");
const axios = require("axios");
const md5 = require("md5");
export default {
    components: {
        "user-form": userForm,
        "fix-def-form": fixDefForm,
        "fixture-form": fixtureForm
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
            userTableCol: tableCols.userTableCol,
            fixtureTableCol: tableCols.fixtureTableCol,
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
            fixDefInfo: {},
            fixtures: [],
            callbackFunc: () => {},
            renderContent: (h, { root, node, data }) => {
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
                            float: 'right',
                            width: '64px'
                        },
                        class: 'ivu-btn-group'
                    }, [
                        h('Button', {
                            style: {
                                width: '50%'
                            },
                            props: {
                                size: 'small',
                                icon: data.isParent !== undefined ? 'md-add' : 'md-create'
                            },
                            on: {
                                click: () => {
                                    if (data.isParent !== undefined) {
                                        this.addFixture(data)
                                    } else {
                                        this.toDetail(data)
                                    }
                                }
                            }
                        }),
                        h('Button', {
                            style: {
                                width: '50%'
                            },
                            props: {
                                size: 'small',
                                icon: data.isParent !== undefined ? 'md-remove' : 'ios-close'
                            },
                            on: {
                                click: () => {
                                    if (data.isParent !== undefined) {
                                        this.removeFixDef(data)
                                    } else {
                                        this.removeFixture(data)
                                    }
                                }
                            }
                        })
                    ])
                ]);
            }
        }
    },
    mounted () {
        app.title = "工作间管理"
        this.init();
        // let ele = document.getElementById("bin1");
        // let instance = echarts.init(ele);
        // instance.setOption(this.bin1);
        // let ele2 = document.getElementById("bin2");
        // let instance2 = echarts.init(ele2);
        // instance2.setOption(this.bin2);
        // let ele3 = document.getElementById("bin3");
        // let instance3 = echarts.init(ele3);
        // instance3.setOption(this.bin3);
    },
    methods: {
            init (refreshTree) {
                axios.post("/api/security/GetOrgDetail", {}, msg => {
                this.workcellInfo = msg.data;
                axios.post("/api/fwwb/GetFixDefs", {departId: this.workcellInfo.ID}, msg => {
                    this.fixtureTree[0].children = msg.data;
                    let i = 0;
                    let j = 0;
                    for (i = 0; i < this.fixtureTree[0].children.length; i++) {
                        this.$set(this.fixtureTree[0].children[i], 'title', this.fixtureTree[0].children[i].Name);
                        this.$set(this.fixtureTree[0].children[i], 'children', this.fixtureTree[0].children[i].Entities);
                        this.$set(this.fixtureTree[0].children[i], 'isParent', true);
                        for (j = 0; j < this.fixtureTree[0].children[i].Entities.length; j++) {
                            this.$set(this.fixtureTree[0].children[i].Entities[j], 'title', this.fixtureTree[0].children[i].Entities[j].SeqID);
                        }
                    }
                    if (refreshTree) { // 这里是增加的时候才展开，增加后会刷新
                        for (var x = 0; x < this.fixtureTree[0].children.length; x++) {
                            this.$set(this.fixtureTree[0].children[x], 'expand', true);
                        }
                        this.getRefreshFixture(); // 刷新右下角的内容
                    }
                });
                this.getUserTable();
            });
        },
        async getRefreshFixture () {
            this.fixtures = await fixtureManager.getFixtures(this.fixDefInfo.WorkcellId, this.fixDefInfo.ID);
        },
        async selectTreeNode (e) { // 如果是夹具实体只有点击修改笔的按钮才能跳转
            if (e[0] !== undefined) { // 如果是夹具定义
                if (e[0].isParent) {
                    this.fixDefInfo = e[0];
                    this.fixtures = await fixtureManager.getFixtures(this.fixDefInfo.WorkcellId, this.fixDefInfo.ID);
                }
            }
        },
        addFixDef (data) {
            this.bindingForm = "fix-def-form";
            this.modalTitle = "新增夹具定义";
            this.showModal = true;
        },
        addFixture (data) {
            this.bindingForm = "fixture-form";
            this.modalTitle = "新增夹具实体";
            this.formData.WorkcellID = this.workcellInfo.ID;
            this.showModal = true;
        },
        addUser () {
            this.bindingForm = "user-form";
            this.modalTitle = "新增用户";
            this.callbackFunc = this.getUserTable;
            this.showModal = true;
        },
        delUser (userData) {
            axios.post("/api/security/RemoveUser", {userId: userData.ID, departId: this.workcellInfo.ID}, msg => {
                if (msg.success) {
                    this.$Message.success('已删除');
                }
                this.getUserTable();
            });
        },
        async getWorkCellInfo () {
            this.workcellInfo = await fixtureManager.getWorkCellInfo();
        },
        async getFixDefs () {
            this.fixtureTree = await fixtureManager.getFixDefs(this.workcellInfo.ID);
        },
        async saveWorkCell () {
            await fixtureManager.saveWorkCell(this.workcellInfo);
        },
        removeFixDef (data) {
            this.$Modal.confirm({
                title: "确认删除该夹具定义？",
                onOk: async () => {
                    let res = await fixtureManager.removeFixDef(this.workcellInfo.ID, data.ID);
                    if (res.success) {
                        this.$Message.success('已删除');
                        this.fixDefInfo = {}; // 清空右边的内容，防止删了后字段还是原来的
                        this.init();// 刷新一下
                    }
                }
            });
        },
        removeFixture (data) {
            this.$Modal.confirm({
                title: "确认删除该夹具实体？",
                onOk: async () => {
                    let res = await fixtureManager.removeFixture(data.ID);
                    if (res.success) {
                        this.$Message.success('已删除');
                        this.init(true);
                    }
                }
            });
        },
        async saveFixDef () {
            let res = await fixtureManager.saveFixDef(this.fixDefInfo);
            if (res.success) {
                this.$Message.success('保存成功');
            }
        },
        submit () {
            let form = this.$refs["form"];
            form.submit(this.workcellInfo.ID, this.callbackFunc);
            if (form.$vnode.componentOptions.tag === "fixture-form") {
                this.init(true);
                this.formData = {};// 清空表单
            } else if (form.$vnode.componentOptions.tag === "fix-def-form") {
                this.init();
                this.formData = {};// 清空表单
            }
        },
        toDetail (data) {
            if (data.nodeKey !== 0) this.$router.push({name: 'FixDetail', query: {EntityID: data.ID}});
        },
        getUserTable () {
            axios.post("/api/security/GetUsers", {departId: this.workcellInfo.ID}, msg => {
                this.userTable = msg.data;
            });
        },
        setPassword (row) {
            axios.post("/api/security/SetPassword", {userId: row.ID, departId: this.workcellInfo.ID, password: md5('123456')}, msg => {
                if (msg.success) this.$Message.success('密码重置为123456');
            })
        },
        setPositon (userInfo, position) {
            axios.post("/api/security/SetPositionByUser", {departId: this.workcellInfo.ID, userId: userInfo.ID, position}, msg => {
                this.$Message.success('职位已更新');
            });
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
