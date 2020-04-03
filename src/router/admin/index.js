module.exports = {
    FixManager: {
        path: "/manage/dashboard",
        layout: "admin",
        component: () => import(/* webpackChunkName: "FixManager" */"@p/Modules/FixManager")
    },
    WorkflowConfig: {
        path: "/manage/wwf/config",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/WorkflowConfig")
    },
    WorkcellManage: {
        path: "/manage/workcell",
        layout: "admin",
        component: () => import(/* webpackChunkName: "FixManager" */"@p/Modules/WorkcellManage")
    },
    FixDetail: {
        path: "/manage/fixdetail",
        layout: "admin",
        component: () => import(/* webpackChunkName: "FixDetail" */"@p/Modules/FixDetail")
    },
    MaintainForm: {
        path: "/manage/maintainform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "MaintainForm" */"@p/Modules/MaintainForm")
    },
    PurchaseForm: {
        path: "/manage/purchaseform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "PurchaseForm" */"@p/Modules/PurchaseForm")
    },
    IOPutForm: {
        path: "/manage/ioputform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "IOPutForm" */"@p/Modules/IOPutForm")
    },
    ScrapForm: {
        path: "/manage/scrapform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "ScrapForm" */"@p/Modules/ScrapForm")
    }
};
