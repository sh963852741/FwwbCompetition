<template>
    <i-row>
        <i-card :padding="100">
            <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row>
                        <i-row style="font-size:30px; margin-bottom:10px">OperatorI</i-row>
                        <i-col span="3">ID：</i-col>
                        <i-col span="3">部门：</i-col>
                    </i-row>
                </i-col>
            </i-row>
            <i-tabs>
                <i-tab-pane label="基本信息">
                    <i-row>
                        <i-col>
                            <i-form>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="工作间名称">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="工作间ID">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="22">
                                        <i-form-item label="工作间位置" span="8">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="工夹具数量">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="工作间">
                                            <i-input/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                            </i-form>
                        </i-col>
                    </i-row>
                </i-tab-pane>
                <i-tab-pane label="工夹具管理"></i-tab-pane>
                <i-tab-pane label="用户管理"></i-tab-pane>
            </i-tabs>
        </i-card>
    </i-row>
</template>
<script>
const app = require("@/config");
export default {
data () {
    return {
        app
    }
},
mounted () {
    app.title = "工作间管理"
}
}
</script>
