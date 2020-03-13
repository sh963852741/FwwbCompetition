const axios = require("axios");

let allFixDefTree = null;
let fixtureManager = {
    async getFixDefTree (departId, reload) {
        if (!allFixDefTree || reload) {
            let data = await axios.post("/api/fwwb/GetFixTree", { departId });
            allFixDefTree = data.data.data;
        }
        let fixDefTree = JSON.parse(JSON.stringify(allFixDefTree));
        fixDefTree.forEach(e => {
            if (e.children) e.children.forEach(e => delete e.children);
        });
        return fixDefTree;
    },
    async getFixDefs (WorkcellID) {
        let fixDefs = await axios.post("/api/fwwb/GetFixDefs", {departId: WorkcellID});
        return fixDefs.data.data;
    },
    async saveWorkCell (WorkcellInfo) {
        let res = await axios.post("/api/security/SaveDepartV2", {...WorkcellInfo});
        return res.data.success;
    },
    async removeFixDef (WorkcellID, fixtureID) {
        let res = await axios.post("/api/fwwb/RemoveFixDefs", {WorkcellID, ID: fixtureID});
        return res.data;
    },
    async saveFixture (fixtureInfo) {
        let res = await axios.post("/api/fwwb/SaveFix", {...fixtureInfo});
        return res.data;
    },
    async saveFixDef (fixDefInfo) {
        let res = await axios.post("/api/fwwb/SaveFixDef", {...fixDefInfo});
        return res.data;
    },
    async getWorkCellInfo () {
        let workcellInfo = await axios.post("/api/security/GetOrgDetail", {});
        return workcellInfo.data.data;
    },
    async getFixtures (WorkcellID, defId) {
        let fixtures = await axios.post("/api/fwwb/GetFixs", {WorkcellID, defId});
        return fixtures.data.data;
    },
    async removeFixture (id) {
        let res = await axios.post("/api/fwwb/RemoveFix", {id});
        return res.data;
    }
};
export default fixtureManager;
