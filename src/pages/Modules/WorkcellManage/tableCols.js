let tableCols = {
    binTableCol: [
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
            key: 'UsedCount'
        },
        {
            title: '存放库位',
            key: 'binName'
        }
    ],
    userTableCol: [
        {
            title: '姓名',
            key: 'RealName'
        }, {
            title: '工号',
            key: 'Code'
        }, {
            title: '角色',
            slot: 'Role'
        }, {
            title: "操作",
            slot: 'Action'
        }
    ],
    fixtureTableCol: [
        {
            title: '夹具序列号',
            key: 'SeqID'
        }, {
            title: '采购单据号',
            key: 'BillNo'
        }, {
            title: '入库日期',
            key: 'RegDate'
        }, {
            title: '已使用次数',
            key: 'UsedCount'
        }, {
            title: '存放库位',
            key: 'Location'
        }, {
            title: '操作',
            slot: 'Action'
        }
    ]
}
export default tableCols;
