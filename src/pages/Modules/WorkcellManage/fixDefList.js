const axios = require("axios");

let fixDefs = null;
export default async function getFixDefs (departId, reload) {
    if (!fixDefs || reload) {
        let data = await axios.post("/api/fwwb/GetFixTree", {departId});
        fixDefs = data.data.data;
    }
    return fixDefs;
}
