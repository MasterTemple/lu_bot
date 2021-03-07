module.exports = {
    name: ['npc'],
    description: 'Info about an NPC in LEGO Universe',
    args: true,
    use: `npc [id]`,
    example:[`npc 12261`],
    execute(args) {
        var data = {}
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        var missionNamesString
        var missionNamesStr = ``

        try{
            var item = require(`./objects/0/${Math.floor(id / 256)}/${id}.json`);
        }catch{
            return
            //console.log(`fail`)
        }

        data.objectID = args[0]
        data.type = item.type

        try{
            var quest = item.components["73"]
        }catch{}
        try{
            var vendor = item.components["16"]
        }catch{}

        var sell1 = ``
        var sell2 = ``
        // //console.log(quest)
        if (quest != undefined){
            data.isMissionGiver = true
            var missions = require(`./../tables/MissionNPCComponent/0/${quest}.json`)
            var missionsFromNPC = []
            var missionNames = []
            data.missionInfo = []
            try{
                for (var i = 0; i < missions.missions.length; i++) {
                    missionsFromNPC.push(missions.missions[i].missionID)
                    var missionName = require(`./../locale/Missions/${Math.floor(missions.missions[i].missionID / 256)}.json`)
                    // //console.log(`./../locale/Missions/${Math.floor(missions.missions[i].missionID / 256)}.json`)
                    missionNames.push(missionName[missions.missions[i].missionID].name)
                    // //console.log(missionName)
                    var obj = {
                        missionID: missions.missions[i].missionID,
                        missionName: missionName[missions.missions[i].missionID].name
                    }
                    data.missionInfo.push(obj)
                }
                //`${missionNamesStr},`
                //missionNames = missionNames.join(", ")
                missionNamesString = ``
                for(var j=0; j<missionNames.length; j++){
                    missionNamesString= `${missionNamesString}, ${missionNames[j]}`
                }
                // //console.log(`MN:${missionNames}`)
            }
            catch{

            }
            //data.missionIDs = missionsFromNPC
            //data.missionNames = missionNames

            // //console.log(missionsFromNPC)
            // //console.log(`MISSIONS ${missions.missions[0].missionID}`)
        }else{
            data.isMissionGiver = false
        }
        if(vendor != undefined){
            data.isVendor = true
            data.soldItems = []
            var soldObjects = require(`./../tables/VendorComponent/0/${vendor}.json`)
            var lootMatrixIndex = soldObjects.LootMatrixIndex
            var lootMatrixTable = require(`./../tables/LootMatrix/${Math.floor(lootMatrixIndex/256)}/${lootMatrixIndex}.json`)
            var lootTableIndex = lootMatrixTable["elements"][0].LootTableIndex
            var lootTable = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootTableIndex/256)}/${lootTableIndex}.json`)
            // //console.log(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootTableIndex/256)}/${lootTableIndex}.json`)
            // //console.log(lootTable["elements"])
            for(let k=0;k<lootTable["elements"].length;k++){
                // //console.log(lootTable["elements"][k].itemid)
                var soldItemName = require(`./../objects/0/${Math.floor(lootTable["elements"][k].itemid/256)}/${lootTable["elements"][k].itemid}.json`);
                var itemName = soldItemName.name
                sell1 = `${sell1}\n${itemName} [${lootTable["elements"][k].itemid}]`
                var obj = {
                    soldItemID: lootTable["elements"][k].itemid,
                    soldItemIDName: soldItemName.name,
                    soldItemIDDisplayName: soldItemName.displayName,
                }
                data.soldItems.push(obj)
            }

        }else{
            data.isVendor = false
        }
        // //console.log(`${item.name}`)


        try{
            data.name = item.name
        }catch{}
        try{
            data.displayName = item.displayName
        }catch{}
        try{
            data.description = item.description
            var description = item.description
        }catch{}
        try{
            data.internalNotes = item._internalNotes
        }catch{}
        var extra_desc = ''
        try{
            var renderID = item.components["2"]

        // console.log(`renderID: ${renderID}`)
        var renderFolder = Math.floor(renderID/256)
        var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        // console.log(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        var iconID = renderComponent.IconID
        //var icons = require(`./../tables/Icons/${iconID}.json`)
        // console.log(`./../tables/Icons/${iconID}.json`)
        //var iconPath = icons.IconPath
        var iconPath = renderComponent.icon_asset
        }catch{
            var iconPath = null
        }

        if(iconPath != null) {
            iconPath = iconPath.replace('DDS', 'png')
            iconPath = iconPath.replace('dds', 'png')
            iconPath = iconPath.replace(/\\/g, "/");
            iconPath = iconPath.replace(` `, "%20");
            iconPath = iconPath.toLowerCase()
            data.iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
        }
       else if(data.isVendor = true){
           data.iconURL = `https://xiphoseer.github.io//lu-res/mesh//overhead_indicators//icon_vendor.png`
       }else{
           data.iconURL = `https://github.com/MasterTemple/lu_bot/blob/master/src/unknown.png?raw=true`
       }


        if(description != null){
            if (description.includes("__MG__")) {
                description = description.replace('__MG__', "");
                data.description = description
            }
        }else{
            description = "None"
        }
        // //console.log(missionNames)


        const brickVendorsIDs = [2264, 3921, 7429, 9705, 9706, 9707, 13379]

        // //console.log(lootTable["elements"].length)

        if(sell1 != `` && brickVendorsIDs.includes(parseInt(id))){
            // console.log(`here`)
            for(var i=0;i<lootTable["elements"].length/32;i++) {
                var bricksSold = ``
                for (var k = (i*32); k < (lootTable["elements"].length/(lootTable["elements"].length/32))+(i*32); k++) {
                    // //console.log(lootTable["elements"][k])
                    try{
                        var soldItemName = require(`./../objects/0/${Math.floor(lootTable["elements"][k].itemid / 256)}/${lootTable["elements"][k].itemid}.json`);
                        var itemName = soldItemName.name
                        bricksSold = `${bricksSold}\n${itemName} [${lootTable["elements"][k].itemid}]`
                        var obj = {
                            soldItemID: lootTable["elements"][k].itemid,
                            soldItemIDName: soldItemName.name,
                            soldItemIDDisplayName: soldItemName.displayName,
                        }
                        data.soldItems.push(obj)
                    }catch{}
                }
            }
        }
        return data
    }
}
