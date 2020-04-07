<template>
    <div>
         <div class="paper">
            <div class="blankPage"></div>
            <p class="headLine">报修申请表</p>
            <p class="date">填表时间：0000年00月00日</p>
            <table border="1">
                <tr>
                    <td class="cellFirst">申请人</td>
                    <td class="cellSecond">初级用户</td>
                </tr>
                <tr>
                    <td class="cellFirst">物品代码</td>
                    <td class="cellSecond">OOOOOO-OOO-OOOO</td>
                </tr>
                <tr>
                    <td class="cellFirst" style="height: 147px;" >故障描述</td>
                    <td class="cellSecond" ></td>
                </tr>
                <tr>
                    <td class="cellFirst" style="height: 389px;" >故障照片</td>
                    <td class="cellSecond" ></td>
                </tr>
                <tr>
                    <td class="cellFirst">处理人</td>
                    <td class="cellSecond">高级用户</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {

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
