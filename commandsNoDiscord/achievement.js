module.exports = {
    name: ['a'],
    description: 'Get mission by ID',
    args: true,
    use: `missionid [id]`,
    example:[`a 206`],
    execute(args) {
        //const client = message.client;
        //
        var data = {}
        data.id = args[0]
        data.rewards = []
        data.type = "Achievement"
        var item
        var desc = ''
        var name
        if(isNaN(args[0])==false){
            item = require(`./../locale/Missions/${Math.floor(args[0]/256)}.json`);
            // console.log(item[args[0]].name)
            name =item[args[0]].name
            data.title = name

            // console.log()
        }else{
            return
        }

        var text = require(`./../locale/MissionText/${Math.floor(args[0]/256)}.json`);
        var info = require(`./../tables/Missions/${Math.floor(args[0]/256)}/${args[0]}.json`);
        //var npc = require(`./../objects/0/${Math.floor(info.offer_objectID/256)}/${info.offer_objectID}.json`);

        //desc = `**Giver:**\n${npc.displayName}`
        desc = `${desc}\n**Objective:**\n${text[args[0]].description}`
        data.objective = text[args[0]].description

        //desc = `${desc}\n**Objective:**\n${text[args[0]].in_progress}`
        //desc = `${desc}\n**On Completion:**\n${text[args[0]].completion_succeed_tip}`

        if(info.reward_item1 != -1 && info.reward_item2 == -1) {
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n**Reward:**\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item1,
                count: info.reward_item1_count
            }
            data.rewards.push(obj)
        }
        if(info.reward_item2 != -1 && info.isChoiceReward == true){
            var reward1 = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            var reward2 = require(`./../objects/0/${Math.floor(info.reward_item2/256)}/${info.reward_item2}.json`);
            desc = `${desc}\n**Rewards (Choose One):**\n${reward1.name} [${info.reward_item1}] x ${info.reward_item1_count}\n${reward2.name} [${info.reward_item2}] x ${info.reward_item2_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item2,
                count: info.reward_item2_count
            }
            data.rewards.push(obj)
        }else if(info.reward_item2 != -1){
            var reward1 = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            var reward2 = require(`./../objects/0/${Math.floor(info.reward_item2/256)}/${info.reward_item2}.json`);
            desc = `${desc}\n**Rewards:**\n${reward1.name} [${info.reward_item1}] x ${info.reward_item1_count}\n${reward2.name} [${info.reward_item2}] x ${info.reward_item2_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item2,
                count: info.reward_item2_count
            }
            data.rewards.push(obj)
        }
        if(info.reward_item3 != -1){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item3/256)}/${info.reward_item3}.json`);
            desc = `${desc}\n${reward.name} [${info.reward_item3}] x ${info.reward_item3_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item3,
                count: info.reward_item3_count
            }
            data.rewards.push(obj)
        }
        if(info.reward_item4 != -1){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item4/256)}/${info.reward_item4}.json`);
            desc = `${desc}\n${reward.name} [${info.reward_item4}] x ${info.reward_item4_count}`
            var obj = {
                name:reward.name,
                itemID: info.reward_item4,
                count: info.reward_item4_count
            }
            data.rewards.push(obj)
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

        desc = `${desc}\n**Universe Score:**\n${info.LegoScore} Points`
        data.LEGOScore = info.LegoScore
        data.rewardCoins = info.reward_currency
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

        // //console.log(info.)

//DO ICON URL

        var MissionTasks = require(`./../tables/MissionTasks/${Math.floor(args[0]/256)}/${args[0]}.json`);
        var iconID = MissionTasks.tasks[0].IconID
        var icon = require(`./../tables/Icons/${iconID}.json`)
        var iconPath = icon.IconPath
        // console.log(iconPath)
        //var iconURL
        if(iconPath != null) {
            iconPath = iconPath.replace('DDS', 'png')
            iconPath = iconPath.replace('dds', 'png')
            iconPath = iconPath.replace(/\\/g, "/");
            iconPath = iconPath.replace(` `, "%20");
            iconPath = iconPath.toLowerCase()
            var iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
        }else{
            var iconURL = `https://github.com/MasterTemple/lu_bot/blob/master/src/unknown.png?raw=true`
            //question mark
        }

        data.iconurl = iconURL
        // if(iconUrl == undefined){
        //     iconUrl = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        //
        // }
        // //console.log(args[0],args[1],args[2],args[3])
        // console.log(data)
        return data




    }
}
