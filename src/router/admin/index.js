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
        component: () => import(/* webpackChunkName: "FixManager" */"@p/Modules/FixDetail")
    }
};
