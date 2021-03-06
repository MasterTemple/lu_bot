module.exports = {
    name: ['missionid',`mid`],
    description: 'Get mission by ID',
    args: true,
    use: `missionid [id]`,
    example:[`missionid 1665`, `mid 228`],
    execute(args) {
        //const client = message.client;
        //
        var data = {}
        data.id = args[0]
        data.rewards = []
        data.type = "Mission"

        var item
        var desc = ''
        var name
        if(isNaN(args[0])==false){
            item = require(`./../locale/Missions/${Math.floor(args[0]/256)}.json`);
            // console.log(item[args[0]].name)

            try{
                name = item[args[0]].name
                data.title = name
            }catch{
                data.title = "Hidden"
            }

            // console.log()
        }else{
            return
        }

        var text = require(`./../locale/MissionText/${Math.floor(args[0]/256)}.json`);
        var info = require(`./../tables/Missions/${Math.floor(args[0]/256)}/${args[0]}.json`);
        var npc = require(`./../objects/0/${Math.floor(info.offer_objectID/256)}/${info.offer_objectID}.json`);
        var npcGiver = require(`./../objects/0/${Math.floor(info.offer_objectID/256)}/${info.offer_objectID}.json`);
        var npcReturn = require(`./../objects/0/${Math.floor(info.target_objectID/256)}/${info.target_objectID}.json`);

        data.giverID = info.offer_objectID
        data.giverName = npcGiver.displayName
        data.returnToID = info.target_objectID
        data.returnToName = npcReturn.displayName

        desc = `**Giver:**\n${npc.displayName}`
        //desc = `${desc}\n**Description:**\n${text[args[0]].accept_chat_bubble}`

        try{
            var description = text[args[0]].accept_chat_bubble
            try{
                //var description = text[args[0]].description
                //console.log(description)
                //if(description.includes(`<`)){
                    var descriptionArray = description.split(`<`)
                    for (var i = 0; i < descriptionArray.length - 1; i++) {
                        description = description.replace(/<[^>]*>/, '')
                    }
                    //console.log(description)
                //}
                data.description = description

            }catch{
                data.objective = undefined
            }

        }catch{}

        //desc = `${desc}\n**Objective:**\n${text[args[0]].in_progress}
        //`
        try{
            var description = text[args[0]].in_progress

            try{
                //var description = text[args[0]].description
                //console.log(description)
                //if(description.includes(`<`)){
                var descriptionArray = description.split(`<`)
                for (var i = 0; i < descriptionArray.length - 1; i++) {
                    description = description.replace(/<[^>]*>/, '')
                }
                //console.log(description)
                //}
                data.objective = description

            }catch{
                data.objective = undefined
            }

        }catch{}
        //desc = `${desc}\n**On Completion:**\n${text[args[0]].completion_succeed_tip}`


        if(info.isChoiceReward){
            data.chooseOne = 1
        }else{
            data.chooseOne = 0
        }

        if(info.reward_item1 != -1 && info.reward_item1 != -0) {
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n**Reward:**\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item1,
                count: info.reward_item1_count
            }
            data.rewards.push(obj)
        }
        if(info.reward_item2 != -1 && info.reward_item2 != -0){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            var obj = {
                name:reward.name,
                itemID: info.reward_item2,
                count: info.reward_item2_count
            }
            data.rewards.push(obj)
        }
        if(info.reward_item3 != -1 && info.reward_item3 != -0){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item3/256)}/${info.reward_item3}.json`);
            desc = `${desc}\n${reward.name} [${info.reward_item3}] x ${info.reward_item3_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item3,
                count: info.reward_item3_count
            }
            data.rewards.push(obj)
        }
        if(info.reward_item4 != -1 && info.reward_item4 != -0){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item4/256)}/${info.reward_item4}.json`);
            desc = `${desc}\n${reward.name} [${info.reward_item4}] x ${info.reward_item4_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item4,
                count: info.reward_item4_count
            }
            data.rewards.push(obj)
        }

        if(info.reward_emote != -1){
            var reward = require(`./../Emote.json`);

            data.emote_rewardID = info.reward_emote
            data.emote_rewardName = reward.animationName

        }


        data.stats = []
        if(info.reward_maximagination != -1 && info.reward_maximagination < 2 && info.reward_maximagination != 0){
            desc = `${desc}\n **+${info.reward_maximagination}** Imagination Point`
            var obj = {
                statType: `Imagination`,
                count: info.reward_maximagination,
                statName: `Imagination Point`,
            }
            data.stats.push(obj)
        }
        if(info.reward_maximagination != -1 && info.reward_maximagination > 1 && info.reward_maximagination != 0){
            desc = `${desc}\n **+${info.reward_maximagination}** Imagination Points`
            var obj = {
                statType: `Imagination`,
                count: info.reward_maximagination,
                statName: `Imagination Point`,
            }
            data.stats.push(obj)
        }
        if(info.reward_maxhealth != -1 && info.reward_maxhealth < 2 && info.reward_maxhealth != 0){
            desc = `${desc}\n **+${info.reward_maxhealth}** Health Point`
            var obj = {
                statType: `Health`,
                count: info.reward_maxhealth,
                statName: `Health Point`,
            }
            data.stats.push(obj)
        }
        if(info.reward_maxhealth != -1 && info.reward_maxinventory > 1 && info.reward_maxinventory != 0){
            desc = `${desc}\n **+${info.reward_maxhealth}** Health Points`
            var obj = {
                statType: `Health`,
                count: info.reward_maxhealth,
                statName: `Health Point`,
            }
            data.stats.push(obj)
        }
        if(info.reward_maxinventory != -1 && info.reward_maxinventory < 2 && info.reward_maxinventory != 0){
            desc = `${desc}\n **+${info.reward_maxinventory}** Inventory Slot`
            var obj = {
                statType: `Inventory`,
                count: info.reward_maxinventory,
                statName: `Inventory Slot`,
            }
            data.stats.push(obj)
        }
        if(info.reward_maxinventory != -1 && info.reward_maxinventory > 1 && info.reward_maxinventory != 0){
            desc = `${desc}\n **+${info.reward_maxinventory}** Inventory Slots`
            var obj = {
                statType: `Inventory`,
                count: info.reward_maxinventory,
                statName: `Inventory Slot`,
            }
            data.stats.push(obj)
        }
        data.LEGOScore = info.LegoScore
        data.rewardCoins = info.reward_currency

        desc = `${desc}\n**Universe Score:**\n${info.LegoScore} Points`
        if(info.repeatable == true){
            name = `${name} (Repeatable)`
            data.isRepeatable = 1
        }else{
            data.isRepeatable = 0
        }
        if(info.reward_bankinventory != null) {
            data.vaultSpace = info.reward_bankinventory
        }else{
            data.vaultSpace = 0
        }
//DO ICON URL
        var MissionTasks = require(`./../tables/MissionTasks/${Math.floor(args[0]/256)}/${args[0]}.json`);
        try{
            var iconID = MissionTasks.tasks[0].IconID
            var icon = require(`./../tables/Icons/${iconID}.json`)
            var iconPath = icon.IconPath
            if (iconPath != null) {
                iconPath = iconPath.replace('DDS', 'png')
                iconPath = iconPath.replace('dds', 'png')
                iconPath = iconPath.replace(/\\/g, "/");
                iconPath = iconPath.replace(` `, "%20");
                iconPath = iconPath.toLowerCase()
                var iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
            } else {
                var iconURL = `https://github.com/MasterTemple/lu_bot/blob/master/src/unknown.png?raw=true`
                //question mark
            }
            data.iconurl = iconURL
        }catch{
                data.iconurl = ` https://xiphoseer.github.io/lu-res/textures/ui/missioncomics/genericicons/avant_gardens.png`
        }


        // console.log(data)
        return data




    }
}
