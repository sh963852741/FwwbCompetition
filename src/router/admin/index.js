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
    MyPending: {
        path: "/manage/workflow/pending",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/MyPending")
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
        component: () => import(/* webpackChunkName: "WorkflowForms" */"@p/Modules/MaintainForm")
    },
    PurchaseForm: {
        path: "/manage/purchaseform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowForms" */"@p/Modules/PurchaseForm")
    },
    IOPutForm: {
        path: "/manage/ioputform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowForms" */"@p/Modules/IOPutForm")
    },
    ScrapForm: {
        path: "/manage/scrapform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowForms" */"@p/Modules/ScrapForm")
    }
};
