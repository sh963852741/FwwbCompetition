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
import fixtureManager from "../fixtureManager.js";
// const axios = require("axios");
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
        async submit (WorkcellId, callback) {
            let res = await fixtureManager.saveFixture({...this.formData, DefId: this.formData.DefId[1]});
            if (res.success) callback();
            else this.$Message.warning(res.msg);
            // this.resetFields();
        }
    },
    async mounted () {
        this.defList = await fixtureManager.getFixDefTree(this.formData.WorkcellID);
    }
}
</script>
