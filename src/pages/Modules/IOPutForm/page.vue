<template>
    <div>
        <div class="paper">
            <div class="blankPage"></div>
            <p class="headLine">出/入库申请表</p>
            <p class="date">填表时间：0000年00月00日</p>
            <table border="1">
                <tr>
                    <td class="cellFirst">领用人</td>
                    <td class="cellSecond">初级用户</td>
                </tr>
                <tr>
                    <td class="cellFirst">操作人</td>
                    <td class="cellSecond">初级用户</td>
                </tr>
                <tr>
                    <td class="cellFirst">产线</td>
                    <td class="cellSecond">OOOOOO-OOO-OOOO</td>
                </tr>
                <tr>
                    <td class="cellFirst">日期</td>
                    <td class="cellSecond shu_zi_jian_ju">0000年00月0日</td>
                </tr>
                <tr>
                    <td class="cellFirst">物品代码</td>
                    <td class="cellSecond">OOOOOO-OOO-OOOO</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
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
