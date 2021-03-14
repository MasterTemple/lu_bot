module.exports = {
    name: ['missionid',`mid`],
    description: 'Get mission by ID',
    args: true,
    use: `missionid [id]`,
    example:[`missionid 1665`, `mid 228`],
    execute(args) {

        var data = {}
        data.itemID = args[0]
        var missionRewardFile = require(`./../search/missionsAndRewards.json`)
        try{
            var item = require(`./../objects/0/${Math.floor(args[0]/256)}/${args[0]}.json`);
        }
        catch{
            // console.log("An object for this ID does not even exist.")
            return
        }
        //console.log(item)

        data.name = item.name
        data.displayName = item.displayName
        data.description = item.description
        try{
            var renderID = item.components["2"]
            var renderFolder = Math.floor(renderID/256)
            var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
            var iconID = renderComponent.IconID
            var iconPath = renderComponent.icon_asset

        }catch{}
        var iconURL
        if(iconPath != null) {
            iconPath = iconPath.replace('DDS', 'png')
            iconPath = iconPath.replace('dds', 'png')
            iconPath = iconPath.replace(/\\/g, "/");
            iconPath = iconPath.replace(` `, "%20");
            iconPath = iconPath.toLowerCase()
            iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
        }else{
            iconURL = `https://github.com/MasterTemple/lu_bot/blob/master/src/unknown.png?raw=true`
        }
        data.iconURL = iconURL


        //var missionID = missionRewardFile.table.every(a => parseInt(a.reward_item1) === args[0] || parseInt(a.reward_item2) === args[0] || parseInt(a.reward_item3) === args[0] || parseInt(a.reward_item4) === args[0])
        //var missionID = missionRewardFile.table.find(a => parseInt(a.reward_item1) === args[0] || parseInt(a.reward_item2) === args[0] || parseInt(a.reward_item3) === args[0] || parseInt(a.reward_item4) === args[0])
        var missionIDFiltered = missionRewardFile.table.filter(a => parseInt(a.reward_item1) === args[0] || parseInt(a.reward_item2) === args[0] || parseInt(a.reward_item3) === args[0] || parseInt(a.reward_item4) === args[0])
        console.log(missionIDFiltered)
        //console.log(missionID)
        data.table = []

        for (var i=0;i<missionIDFiltered.length;i++){
            var item = require(`./../locale/Missions/${Math.floor(missionIDFiltered[i].id / 256)}.json`);
            var text = require(`./../locale/MissionText/${Math.floor(missionIDFiltered[i].id / 256)}.json`);


            try {
                var description = text[missionIDFiltered[i].id].description
                //console.log(text[missionID.id])
                try {
                    //var description = text[args[0]].description
                    //console.log(description)
                    if (description.includes(`<`)) {
                        //console.log(true)

                        var descriptionArray = description.split(`<`)
                        for (var i = 0; i < descriptionArray.length - 1; i++) {
                            description = description.replace(/<[^>]*>/, '')
                        }
                        //console.log(description)
                    } else {
                        //return
                    }
                    //data.objective = description

                } catch (e) {
                    data.objective = undefined
                    console.log(e)
                }

            } catch {
            }
            var obj = {
                missionID: missionIDFiltered[i].id,
                name: item[missionIDFiltered[i].id].name,
                objective: description
            }
            data.table.push(obj)
        }

        return data




    }
}
