<template>
    <i-row>
        <i-form>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="夹具代码">
                        <i-input v-model="formData.Code"/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="夹具名称">
                        <i-input v-model="formData.Name"/>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="所属大类">
                        <i-input/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="夹具模组">
                        <i-input/>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="夹具料号">
                        <i-input/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="配备的数量">
                        <i-input/>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" justify="space-between">
                <i-col span="24">
                    <i-form-item label="用途">
                        <i-input/>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="保养点检周期">
                        <i-input/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="责任人">
                        <i-input/>
                    </i-form-item>
                </i-col>
            </i-row>
        </i-form>
    </i-row>
</template>
<script>
let axios = require("axios");
export default {
    props: {
        formData: {
            required: true,
            type: Object
        }
    },
    data () {
        return {}
    },
    methods: {
        submit (WorkcellId, callback) {
            axios.post("/api/fwwb/SaveFixDef", {WorkcellId, ...this.formData}, msg => {
                this.resetFields();
                if (msg.success) {
                    callback();
                } else {
                    this.$Message.warning(msg.msg);
                }
            });
        }
    }
}
</script>
