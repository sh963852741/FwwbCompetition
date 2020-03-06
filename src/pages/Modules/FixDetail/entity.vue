<template>
    <i-form :model="modalData" ref="form" :rules="rules">
        <i-row type="flex" justify="space-between">
            <i-col span="24">
                <i-form-item label="夹具序列号" prop="SeqID">
                    <i-input v-model="modalData.SeqID"/>
                </i-form-item>
            </i-col>
        </i-row>
        <i-row type="flex" justify="space-between">
            <i-col span="11">
                <i-form-item label="采购单据号">
                    <i-input v-model="modalData.BillNo"/>
                </i-form-item>
            </i-col>
            <i-col span="11">
                <i-form-item label="建档日期" prop="RegDate">
                    <i-date-picker type="date" v-model="modalData.RegDate" format="yyyy年MM月dd日" />
                </i-form-item>
            </i-col>
        </i-row>
        <i-row type="flex" justify="space-between">
            <i-col span="11">
                <i-form-item label="生产日期" prop="ProduceDate">
                    <i-date-picker type="date" v-model="modalData.ProduceDate" format="yyyy年MM月dd日" />
                </i-form-item>
            </i-col>
            <i-col span="11">
                <i-form-item label="使用次数">
                    <i-input v-model="modalData.UsedCout"/>
                </i-form-item>
            </i-col>
        </i-row>
        <i-row type="flex" justify="space-between">
            <i-col span="11">
                <i-form-item label="上一次保养日期" prop="RepairDate">
                    <i-date-picker type="date" v-model="modalData.RepairDate" format="yyyy年MM月dd日" />
                </i-form-item>
            </i-col>
            <i-col span="11">
                <i-form-item label="负责人姓名">
                    <i-input v-model="modalData.Owner"/>
                </i-form-item>
            </i-col>
        </i-row>
    </i-form>
</template>

<script>
    const axios = require("axios");
    // const guidEmpty = "00000000-0000-0000-0000-000000000000";
    export default {
        props: {
            modalData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                rules: {}
            }
        },
        methods: {
            resetFields () {
                let form = this.$refs["form"];
                form.resetFields();
            },
            submit (callback) {
                let form = this.$refs["form"];
                form.validate(res => {
                    if (!res) return;
                    axios.post("/api/fwwb/SaveFix", this.modalData, msg => {
                        this.resetFields();
                        if (msg.success) {
                            callback(msg);
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                    });
                })
            }
        }
    }
</script>
