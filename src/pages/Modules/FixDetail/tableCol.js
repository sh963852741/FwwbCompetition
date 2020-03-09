let tableCol = {
    fix: [
        {
            title: '夹具代码',
            key: 'Code'
        },
        {
            title: '夹具序列号',
            key: 'SeqID'
        },
        {
            title: '采购单据号',
            key: 'BillNo'
        },
        {
            title: '入库日期',
            key: 'RegDate'
        },
        {
            title: '已使用次数',
            key: "UsedCount"
        },
        {
            title: '生产日期',
            key: 'ManufacDate'
        },
        {
            title: '经办人',
            key: 'Owner'
        },
        {
            title: '操作',
            width: 200,
            slot: 'Action'
        }
    ]
};
module.exports = tableCol;
