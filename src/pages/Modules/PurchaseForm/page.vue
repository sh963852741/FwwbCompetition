<template>
    <div>
        <div class="paper">
            <div class="blankPage"></div>
            <p class="headLine">采购入库申请表</p>
            <p class="date">填表时间：{{nowDate}}</p>
            <table border="1">
                <tr>
                    <td class="cellFirst">申请人</td>
                    <td class="cellSecond">
                        <i-input  v-if="io.fieldAccess.applicant === 'w' && io.isMyStep" v-model="io.data.applicant"/>
                        <p v-else>{{io.data.applicant}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst">采购入库单据号</td>
                    <td class="cellSecond">OOOOOO-OOO-OOOO</td>
                </tr>
                <tr>
                    <td class="cellFirst">采购入库日期</td>
                    <td class="cellSecond shu_zi_jian_ju">0000年00月0日</td>
                </tr>
                <tr>
                    <td class="cellFirst">物品代码</td>
                    <td class="cellSecond">OOOOOO-OOO-OOOO</td>
                </tr>
                <tr>
                    <td class="cellFirst">类别代码</td>
                    <td class="cellSecond">OOOOOO-OOO-OOOO</td>
                </tr>
                <tr>
                    <td class="cellFirst" >物品照片</td>
                    <td class="cellSecond" style="height: 390px;"></td>
                </tr>
                <tr>
                    <td class="cellFirst" rowspan="2">监管员审核意见</td>
                    <td class="cellSecond">
                        <div class="commentBox">同意</div>
                    </td>
                <tr>
                     <td class="cellSecond" style=" border-top: dashed 1px rgb(198, 198, 198);">
                        <p class="wen_zi_kao_you">审核人签名：监管员</p>
                        <p class="wen_zi_kao_you shu_zi_jian_ju">0000年00月00日</p>
                    </td>
                </tr>
                <tr>
                    <td class="cellFirst" rowspan="2">经理审核意见</td>
                    <td class="cellSecond">
                        <div class="commentBox">同意</div>
                    </td>
                <tr>
                    <td class="cellSecond" style=" border-top: dashed 1px rgb(198, 198, 198);">
                        <p class="wen_zi_kao_you">审核人签名：工作间经理</p>
                        <p class="wen_zi_kao_you shu_zi_jian_ju">0000年00月00日</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
export default {
    data () {
        return {
            nowDate: '',
            io: {
                fieldAccess: {
                    applicant: 'w'
                },
                data: {
                    applicant: ''
                },
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
    method: {

    },
    mounted () {
        this.workCellID = this.$route.query.WorkCellID;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        this.nowDate = `${year}年${month}月${day}日`; // 显示在最上方的填写日期
        axios.post("/api/fwwb/RegInApplicate", {ID: this.workCellID}, msg => {
            console.log("...");
        })
    }
}
</script>

<style lang="less">
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
</style>
