<template>
    <i-row>
        <i-form>
            <i-form-item label="姓名">
                <i-input v-model="formData.RealName"/>
            </i-form-item>

            <i-form-item label="工号">
                <i-input v-model="formData.Code"/>
            </i-form-item>

            <i-form-item label="职位">
                <i-select transfer v-model="formData.position">
                    <i-option value="Operator I" :key="3">Operator I</i-option>
                    <i-option value="Operator II" :key="4">Operator II</i-option>
                    <i-option value="Supervisor" :key="1">Supervisor</i-option>
                    <i-option value="Manager" :key="2">Manager</i-option>
                    <i-option value="Admin" :key="5">Admin</i-option>
                </i-select>
            </i-form-item>
        </i-form>
    </i-row>
</template>
<script>
const axios = require("axios");
export default {
    props: {
        formData: {
            required: true,
            type: Object
        }
    },
    methods: {
        submit (departId, callback) {
            axios.post("/api/security/SaveUserAndPosition", {...this.formData, departId}, msg => {
                if (msg.success) callback();
                else this.$Message.warning(msg.msg);
                // this.resetFields();
            });
        }
    }
}
</script>
