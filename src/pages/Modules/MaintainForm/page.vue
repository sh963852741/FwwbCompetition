<template>
    <div id="MaintainForm">
         <div class="paper">
            <div class="blankPage"></div>
            <p class="headLine">报修申请表</p>
            <p class="date">申请时间：{{io.currentStep==='填写申请表' ? nowDate : io.data.AppDate}}</p>
            <table border="1">
               <tr>
                    <td class="cellFirst">工作间</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.WorkCell === 'w' && io.isMyStep" v-model="io.data.WorkCell"/>
                        <p v-else>{{io.data.WorkCell}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">申请人</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.Owner === 'w' && io.isMyStep" v-model="io.data.Owner"/>
                        <p v-else>{{io.data.Owner}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">物品代码</td>
                    <td class="cellSecond">
                        <i-input v-if="io.fieldAccess.Code === 'w' && io.isMyStep" v-model="io.data.Code"/>
                        <p v-else>{{io.data.Code}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">类别代码</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.Family === 'w' && io.isMyStep" v-model="io.data.Family"/>
                        <p v-else>{{io.data.Family}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">故障描述</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.Desc === 'w' && io.isMyStep" v-model="io.data.Desc"/>
                        <p v-else>{{io.data.Desc}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">寿命计数</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.UsedCount === 'w' && io.isMyStep" v-model="io.data.UsedCount"/>
                        <p v-else>{{io.data.UsedCount}}</p>
                    </td>
                </tr>
                <!-- <tr>
                    <td class="cellFirst" >故障照片</td>
                    <td class="cellSecond">
                        <Upload
                            v-if="formData == null && files.length == 0 &&io.fieldAccess.Photo === 'w' && io.isMyStep"
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            :before-upload="handleUpload">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>Click or drag photo here to upload</p>
                            </div>
                        </Upload>
                        <div v-if="formData !== null">
                            <i-row>
                                <Button type="text" style="text-align: left;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{formData.name}}</Button>
                                <Button type="text" @click="uploadFile" :loading="loadingStatus">上传</Button>
                                <Button type="text" @click="removeFormData"><Icon type="ios-close" /></Button>
                            </i-row>
                        </div>
                        <div v-if="files.length > 0">
                            <Divider v-if="formData !== null"/>
                            <template v-for="(item, index) in files">
                                <i-row :key="index">
                                    <a style="display: inline-block;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :href="'/api/cms/Download?id=' + item.ID" target="_blank">{{item.DisplayName}}</a>
                                    <Button style="margin-top: -30px;" @click="removeFile(item)" type="text" v-if="io.currentStep==='填写申请表' && io.isMyStep"><Icon type="ios-close" /></Button>
                                </i-row>
                            </template>
                        </div>
                        <div v-else-if="io.fieldAccess.Description === 'r' || !io.isMyStep">无照片</div>
                        <img :src="photo" v-show="photo"/>
                    </td>
                </tr> -->
                <tr v-show="io.fieldAccess.Repaired">
                    <td class="smallhang">处理情况</td>
                    <td class="longhang" colspan="4">
                        <div v-show="io.fieldAccess.Repaired === 'w' && io.isMyStep">
                            是否修复：
                            <i-radio-group v-model="io.data.Repaired">
                                <i-radio label="true" class="iview-type-size"> 是</i-radio>
                                <i-radio label="false" class="iview-type-size">否</i-radio>
                            </i-radio-group>
                            <i-button type="primary" size="small" class="button-position" @click="submit">确认</i-button>
                        </div>
                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="（维修描述）" v-model="io.data.RepairDesc" v-if="io.fieldAccess.RepairDesc === 'w' && io.isMyStep"/>
                        <p v-else>{{io.data.RepairDesc}}</p>
                        <div class="wen-zi-ju-you" v-show="io.fieldAccess.OperatorName">
                            <p>处理人（签名）：
                                <!-- <i-input v-model="io.data.SName" v-if="io.fieldAccess.AffiliatedDepart === 'w' && io.isMyStep"/> -->
                                <span>{{io.data.OperatorName}}</span>
                            </p>
                            <!-- <i-date-picker v-model="io.data.SDate" type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-if="io.fieldAccess.SDate === 'w' && io.isMyStep"/> -->
                            <p>{{io.data.OperatorDate}}</p>
                        </div>
                    </td>
                </tr>
            </table>
            <i-row class="headLine">
                <i-button  v-show="io.currentStep==='填写申请表' && io.isMyStep" style="width: 200px;margin: 18px auto;" type="primary" @click="submit">提交申请</i-button>
            </i-row>
        </div>
        <div class="paper" v-if="io.timelines.length > 0">
            <p class="smallhang"/>
            <p class="headline">流程执行步骤</p>
            <i-timeline style="padding: 20px;">
                <TimelineItem v-for="(item,index) in io.timelines" :key="index">
                    <i-row class="time">
                        <i-col>
                            <p>{{item.Key}}</p>
                        </i-col>
                    </i-row>
                    <i-row v-for="(item,index) in item.steps" :key="index" class="content">
                        <Alert v-if="item.State !== 0 && item.State !== 1" show-icon :type="icons[item.State]">{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
                        <Alert v-else show-icon>{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
                    </i-row>
                </TimelineItem>
            </i-timeline>
        </div>
    </div>
</template>

<script>
const enums = require("@/config/enums");
const axios = require("axios");
const table = "ActivityApplication";
const usage = "附件";
export default {
    data () {
        return {
            icons: [
                "",
                "",
                "success",
                "success",
                "error",
                "warning"
            ],
            photo: "",
            loadingStatus: false,
            files: [],
            formData: null,
            stepInfo: enums.stepInfo,
            stepId: "",
            instanceId: "",
            nowDate: '',
            upLoad: [],
            io: {
                fieldAccess: {},
                data: {},
                submitBtns: [],
                shouldUpload: [],
                allSteps: [],
                isMyStep: true,
                timelines: [],
                intstanceState: '',
                currentStep: ''
            },
            workCellID: ''
        }
    },
    methods: {
        handleUpload (file) {
            this.formData = file;
            var reader = new FileReader();
            var that = this;
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                that.photo = this.result;
            }
            return false;
        },
        uploadFile () {
            let param = new FormData();
            param.append("file", this.formData);
            param.append("id", this.instanceId);
            param.append("relateTable", table);
            param.append("usage", usage);
            param.append("single", false);
            param.append("fileName", this.formData.name);
            this.temp = param.get("file");
            let config = {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: e => {
                    let completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
                    this.progress = completeProgress;
                }
            };
            this.loadingStatus = true;
            axios._post("/api/cms/UploadFile", param, config).then((res) => {
                this.loadingStatus = false;
                if (res.data.success) {
                    this.$Message.success('success');
                    this.formData = null;
                    this.getFiles();
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
        },
        removeFormData () {
            this.formData = null;
            this.photo = "";
        },
        getFiles () {
            axios.post("/api/cms/GetAttachments", {id: this.instanceId, relateTable: table, usage: usage}, msg => {
                if (msg.success) {
                    this.files = msg.data;
                }
            })
        },
        removeFile (file) {
            axios.post("/api/cms/RemoveAttachment", {id: file.ID}, msg => {
                if (msg.success) {
                    this.$Message.success('删除文件成功');
                    this.getFiles();
                }
            })
        },
        submit () {
            this.io.shouldUpload.forEach(value => {
                this.upLoad[value] = this.io[value] || this.io.data[value]
            });
            axios.post("/api/workflow/SubmitInstance", {...this.upLoad}, msg => {
                if (msg.success) {
                    this.$Message.info("保存成功");
                } else {
                     this.$Message.warning(msg.msg);
                }
            })
        }
    },
    mounted () {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        this.nowDate = `${year}年${month}月${day}日`;
        if (this.$route.query.WorkCellID) {
            this.workCellID = this.$route.query.WorkCellID;
            axios.post("/api/fwwb/RepairApplicate", {ID: this.workCellID}, msg => {
                this.io = msg;
                this.instanceId = msg.instanceId;
                this.stepId = msg.stepId;
            })
        } else {
            this.instanceId = this.$route.query.InstanceId;
            this.stepId = this.$route.query.StepId;
            axios.post("/api/workflow/LoadInstance", {instanceId: this.instanceId, stepId: this.stepId, detail: this.detailMode}, msg => {
                if (msg.success) {
                    this.io = msg;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        }
    }
}
</script>

<style lang="less">
#MaintainForm
{
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
    }
    input {
        text-align: center;
    }
    .wei_zhi_ju_zuo {
        text-align: left;
    }
    .opinionForm .ivu-input {
    border:1px solid #dcdee2;
    }
    .wen-zi-ju-you{
        text-align: right;
    }
    .smallhang {
        width: 101px;
        height: 55px;
        padding: 0px 10px;
    }
    .button-position{
        margin-left: 30px;
    }
    .longhang {
        width: 471px;
        height: 55px;
        padding: 10px 10px;
        text-align: left;
    }
    .paper {
    width: 800px;
    height: 1300px;
    margin: 18px auto;
    background-color: white;
    border: solid 1px rgb(198, 198, 198);
    box-shadow:1px 1px 10px -2px #333333;
    }
    .blankPage{
        height:108px;
    }
    .headLine{
        margin: 25px auto;
        text-align: center;
        font-size: 32px;
        font-family: '';
    }
    .date{
    margin-bottom: 15px;
    margin-top: 15px;
    margin-left:467px;
    font-size: 16px;
    font-family: 'FangSong';
    display: inline-block;
    letter-spacing: 1px;
    }
    table{
    margin: 10px auto;
    border-collapse: collapse;
    text-align: center;
    font-family: 'FangSong';
    font-size: 20px;
    line-height: 40px;
    }
    .cellFirst{
    width: 114px;
    height: 40px;
    padding: 5px 10px;
    }
    .cellSecond{
        width:407px;
        height: 40px;
        padding: 5px 10px;
    }
    .wen_zi_kao_you{
        margin:0px;
        text-align: right;
    }
    .commentBox{
    min-height:180px;
    text-align: left;
    }
    .shu_zi_jian_ju{
        letter-spacing: 2px;
    }
    .headline {
        margin-top: 9px;
        text-align: center;
        font-size: 24px;
        font-family: '';
    }
}
</style>
