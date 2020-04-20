<template>
    <div id="Scrap">
        <div class="paper">
            <i-row>
                <div class="blankPage"></div>
                <p class="headLine">报废申请表</p>
                <p class="date">填表时间：{{nowDate}}</p>
                <table border="1">
                    <tr>
                        <td class="cellFirst">申请人</td>
                        <td class="cellSecond">
                            <p>{{io.data.Owner}}</p>
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
                        <td class="cellFirst">物品寿命计数</td>
                        <td class="cellSecond shu_zi_jian_ju">
                            <p>{{io.data.UsedCount}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="cellFirst" >报废原因</td>
                        <td class="cellSecond">
                            <i-input  type="textarea" :rows= "3" v-if="io.fieldAccess.Reason === 'w' && io.isMyStep" v-model="io.data.Reason"/>
                            <p v-else>{{io.data.Reason}}</p>
                        </td>
                    </tr>
                    <tr v-show="io.fieldAccess.SOpinion">
                    <td class="smallhang">监管员审核意见</td>
                    <td class="longhang" colspan="4">
                        <div v-show="io.fieldAccess.SPass === 'w' && io.isMyStep">
                            是否通过：
                            <i-radio-group v-model="SPass">
                                <i-radio label="true" class="iview-type-size"> 是</i-radio>
                                <i-radio label="false" class="iview-type-size">否</i-radio>
                            </i-radio-group>
                            <i-button type="primary" size="small" class="button-position" @click="submit">确认</i-button>
                        </div>
                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-model="io.data.SOpinion" v-if="io.fieldAccess.SOpinion === 'w' && io.isMyStep"/>
                        <p v-else>{{io.data.SOpinion}}</p>
                        <div class="wen-zi-ju-you" v-show="io.fieldAccess.SName">
                            <p>审核人（签名）：
                                <!-- <i-input v-model="io.data.SName" v-if="io.fieldAccess.AffiliatedDepart === 'w' && io.isMyStep"/> -->
                                <span>{{io.data.SName}}</span>
                            </p>
                            <!-- <i-date-picker v-model="io.data.SDate" type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-if="io.fieldAccess.SDate === 'w' && io.isMyStep"/> -->
                            <p>{{io.data.SDate}}</p>
                        </div>
                    </td>
                </tr>
                <tr v-show="io.fieldAccess.MOpinion">
                    <td class="smallhang">经理审核意见</td>
                    <td class="longhang" colspan="4">
                        <div v-show="io.fieldAccess.MPass === 'w' && io.isMyStep">
                            是否通过：
                            <i-radio-group v-model="MPass">
                                <i-radio label="true" class="iview-type-size"> 是</i-radio>
                                <i-radio label="false" class="iview-type-size">否</i-radio>
                            </i-radio-group>
                            <i-button type="primary" size="small" class="button-position" @click="submit">确认</i-button>
                        </div>
                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-model="io.data.MOpinion" v-if="io.fieldAccess.MOpinion === 'w' && io.isMyStep"/>
                        <p v-else>{{io.data.MOpinion}}</p>
                        <div class="wen-zi-ju-you" v-show="io.fieldAccess.MName">
                            <p>审核人（签名）：
                                <!-- <i-input v-model="io.data.SName" v-if="io.fieldAccess.AffiliatedDepart === 'w' && io.isMyStep"/> -->
                                <span>{{io.data.MName}}</span>
                            </p>
                            <!-- <i-date-picker v-model="io.data.SDate" type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-if="io.fieldAccess.SDate === 'w' && io.isMyStep"/> -->
                            <p>{{io.data.MDate}}</p>
                        </div>
                    </td>
                </tr>
                </table>
            </i-row>
            <i-row class="add1 headline">
                <i-button  v-show="io.currentStep==='填写申请表' && io.isMyStep" style="width: 200px;margin: 18px auto;" type="primary"  @click="submit">提交申请</i-button>
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
const axios = require("axios");
const enums = require("@/config/enums");
export default {
    mounted () {
        this.getFromPrepage();
        const date = new Date();
        const year = date.getFullYear(); // 获取当前年份
        const month = date.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
        const day = date.getDate();
        this.nowDate = `${year}年${month}月${day}日`; // 显示在最上方的填写日期
    },
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
            SPass: "",
            MPass: "",
            upLoad: [],
            io: {
                fieldAccess: {},
                data: {},
                submitBtns: [],
                shouldUpload: [],
                allSteps: [],
                isMyStep: false,
                timelines: [],
                intstanceState: '',
                currentStep: '',
                workcellNName: "",
                stepid: "",
                instanceId: "",
                version: ''
            },
            nowDate: "",
            stepInfo: enums.stepInfo,
            instanceId: "",
            stepId: "",
            detailMode: false
        };
    },
    methods: {
        getFromPrepage () {
            this.instanceId = this.$route.query.InstanceId;
            this.stepId = this.$route.query.StepId;
            this.detailMode = false;
            this.getFieldAccess();
        },
        getFieldAccess () {
            axios.post("/api/workflow/LoadInstance", {instanceId: this.instanceId, stepId: this.stepId, detail: this.detailMode}, msg => {
                if (msg.success) {
                    this.io = msg;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        submit () {
            if (this.io.data.SPass !== undefined) {
                this.io.data.SPass = this.SPass;
            }
            if (this.io.data.MPass !== undefined) {
                this.io.data.MPass = this.MPass;
            }
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
    }
}
</script>

<style lang="less">
#Scrap
{
    input {
        text-align: center;
    }
    .wei_zhi_ju_zuo {
        text-align: left;
    }
    .wen-zi-ju-you{
        text-align: right;
    }
    .smallhang {
        width: 101px;
        height: 55px;
        padding: 0px 10px;
    }
    .longhang {
        width: 471px;
        height: 55px;
        padding: 10px 10px;
        text-align: left;
    }
    .paper {
        width: 800px;
        height: 1400px;
        margin: 18px auto;
        background-color: white;
        border: solid 1px rgb(198, 198, 198);
        box-shadow:1px 1px 10px -2px #333333;
    }
    .blankPage {
        height:108px;
    }
    .button-position{
        float:right;
        margin-top: 10px;
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
        font-size: 24px;
        line-height: 40px;
    }
    .cellFirst{
        width: 155px;
        height: 100px;
        padding: 5px 10px;
    }
    .cellSecond{
        width:450px;
        height: 100px;
        padding: 5px 10px;
    }
    .shu_zi_jian_ju{
        letter-spacing: 2px;
    }
    .commentBox{
        min-height:180px;
        text-align: left;
    }
    .wen_zi_kao_you{
        margin:0px;
        text-align: right;
    }
    .add1 {
            height: 80px;
    }
    .headline {
        margin-top: 9px;
        text-align: center;
        font-size: 24px;
        font-family: '';
    }
}
</style>
