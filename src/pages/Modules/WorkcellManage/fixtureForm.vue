<template>
    <i-row>
        <i-form>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="夹具定义ID">
                        <i-cascader v-model="formData.DefId" :data="defList"/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="夹具序列号">
                        <i-input v-model="formData.SeqID"/>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="采购单据号">
                        <i-input v-model="formData.BillNo"/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="生产日期">
                        <i-input v-model="formData.ProduceDate"/>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" justify="space-between">
                <i-col span="11">
                    <i-form-item label="上一次保养时间">
                        <i-input v-model="formData.RepairDate"/>
                    </i-form-item>
                </i-col>
                <i-col span="11">
                    <i-form-item label="责任人">
                        <i-input v-model="formData.Owner"/>
                    </i-form-item>
                </i-col>
            </i-row>
        </i-form>
    </i-row>
</template>
<script>
import getFixDefs from "./fixDefList.js";
const axios = require("axios");
export default {
    props: {
        formData: {
            required: true,
            type: Object
        }
    },
    data () {
        return {
            defList: []
        }
    },
    methods: {
        submit (WorkcellId, callback) {
            axios.post("/api/fwwb/SaveFix", {...this.formData}, msg => {
                this.resetFields();
                if (msg.success) {
                    callback();
                } else {
                    this.$Message.warning(msg.msg);
                }
            });
        }
    },
    mounted () {
        let defListPromise = getFixDefs(this.formData.WorkcellID);
        defListPromise.then(msg => {
            msg[0].lable = "这里要改";
            this.defList = msg;
        });
    }
}
</script>
