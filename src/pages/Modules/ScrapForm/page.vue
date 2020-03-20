<template>
    <div>
        <div class="paper">
            <div class="blankPage"></div>
            <p class="headLine">报废申请表</p>
            <p class="date">填表时间：0000年00月00日</p>
            <table border="1">
                <tr>
                    <td class="cellFirst">申请人</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.applicant === 'w' && io.isMyStep" v-model="io.data.applicant"/>
                        <p v-else>{{io.data.applicant}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">物品代码</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.fixCode === 'w' && io.isMyStep" v-model="io.data.fixCode"/>
                        <p v-else>{{io.data.fixCode}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">物品寿命计数</td>
                    <td class="cellSecond shu_zi_jian_ju">
                        <i-input  v-if="io.fieldAccess.usedCount === 'w' && io.isMyStep" v-model="io.data.usedCount"/>
                        <p v-else>{{io.data.usedCount}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst" >报废原因</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.scrapReason === 'w' && io.isMyStep" v-model="io.data.scrapReason"/>
                        <p v-else>{{io.data.scrapReason}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst" rowspan="2" style="height: 293px;">监管员审核意见</td>
                    <td class="cellSecond">
                        <div class="commentBox">
                            <i-input type="textarea"  class="opinionForm" v-if="io.fieldAccess.supervisorOpinion === 'w' && io.isMyStep" v-model="io.data.supervisorOpinion"/>
                            <p v-else>{{io.data.supervisorOpinion}}</p>
                        </div>
                    </td>
                <tr>
                     <td class="cellSecond iview-type-size" style=" border-top: dashed 1px rgb(198, 198, 198);">
                        <div v-show="io.fieldAccess.supervisorIsPass === 'w' && io.isMyStep">
                            是否通过：
                            <i-radio-group v-model="io.data.supervisorIsPass">
                                <i-radio label="true" class="iview-type-size" :disabled="io.fieldAccess.supervisorIsPass === 'r' || !io.isMyStep"> 是</i-radio>
                                <i-radio label="false" class="iview-type-size" :disabled="io.fieldAccess.supervisorIsPass === 'r' || !io.isMyStep">否</i-radio>
                            </i-radio-group>
                            <i-button type="primary" size="small" class="button-position" :disabled="io.fieldAccess.supervisorIsPass === 'r' || !io.isMyStep" @click="submit">确认</i-button>
                        </div>
                        <div class="wen-zi-ju-you">
                            <p >审核人（签名）：<i-input v-model="io.data.supervisor" v-if="io.fieldAccess.supervisor === 'w' && io.isMyStep"/>
                                <span v-else>{{io.data.supervisor}}</span>
                            </p>
                            <i-date-picker type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-model="io.data.supervisorTime" v-if="io.fieldAccess.supervisorTime === 'w' && io.isMyStep"/>
                            <p v-else>{{io.data.supervisorTime}}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst" rowspan="2" style="height: 293px;">经理审核意见</td>
                    <td class="cellSecond">
                        <div class="commentBox">
                            <i-input type="textarea" class="opinionForm" v-if="io.fieldAccess.managerOpinion === 'w' && io.isMyStep" v-model="io.data.managerOpinion"/>
                            <p v-else>{{io.data.managerOpinion}}</p>
                        </div>
                    </td>
                <tr>
                    <td class="cellSecond iview-type-size" style=" border-top: dashed 1px rgb(198, 198, 198);">
                        <div v-show="io.fieldAccess.managerIsPass === 'w' && io.isMyStep">
                            是否通过：
                            <i-radio-group v-model="io.data.managerIsPass">
                                <i-radio label="true" class="iview-type-size" :disabled="io.fieldAccess.managerIsPass === 'r' || !io.isMyStep"> 是</i-radio>
                                <i-radio label="false" class="iview-type-size" :disabled="io.fieldAccess.managerIsPass === 'r' || !io.isMyStep">否</i-radio>
                            </i-radio-group>
                            <i-button type="primary" size="small" class="button-position" :disabled="io.fieldAccess.managerIsPass === 'r' || !io.isMyStep" @click="submit">确认</i-button>
                        </div>
                        <div class="wen-zi-ju-you">
                            <p >审核人（签名）：<i-input v-model="io.data.manager" v-if="io.fieldAccess.manager === 'w' && io.isMyStep"/>
                                <span v-else>{{io.data.manager}}</span>
                            </p>
                            <i-date-picker type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-model="io.data.managerTime" v-if="io.fieldAccess.supervisorTime === 'w' && io.isMyStep"/>
                            <p v-else>{{io.data.managerTime}}</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            io: {
                fieldAccess: {
                    applicant: 'w',
                    fixCode: 'w',
                    usedCount: 'w',
                    scrapReason: 'w',
                    supervisorOpinion: 'w',
                    supervisorIsPass: 'w',
                    supervisor: 'w',
                    supervisorTime: 'w',
                    managerOpinion: 'w',
                    managerIsPass: 'w',
                    manager: 'w',
                    managerTime: 'w'
                },
                data: {
                    applicant: "高级用户",
                    fixCode: 'OOOOOO-OOO-OOOO',
                    usedCount: 1000,
                    scrapReason: "unknown",
                    supervisorOpinion: "同意",
                    supervisorIsPass: false,
                    supervisor: "监管员",
                    supervisorTime: "",
                    managerOpinion: "同意",
                    managerIsPass: false,
                    manager: "工作间经理",
                    managerTime: ""
                },
                submitBtns: [],
                shouldUpload: [],
                allSteps: [],
                isMyStep: true,
                timelines: [],
                intstanceState: '',
                currentStep: ''
            }
        }
    },
    methods: {
        submit () {
        }
    }
}
</script>

<style lang="less">
    .wen-zi-ju-you{
        text-align: right;
    }
    .opinionForm .ivu-input {
    border:1px solid #dcdee2;
    }
    .iview-type-size{
        font-size: 18.7px;
    }
    .paper {
    width: 800px;
    height: 1700px;
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
    font-size: 24px;
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
        text-align: left;
    }
    .wen_zi_kao_you{
        margin:0px;
        text-align: right;
    }
    .commentBox{
        text-align: left;
        height: 55px;
    }
    .shu_zi_jian_ju{
        letter-spacing: 2px;
    }
</style>
