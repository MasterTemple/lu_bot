module.exports = {
    name: ['missionid',`mid`],
    description: 'Get mission by ID',
    args: true,
    use: `missionid [id]`,
    example:[`missionid 1665`, `mid 228`],
    execute(message, args) {
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
            console.log(item[args[0]].name)
            name =item[args[0]].name
            console.log()
        }else{
            message.channel.send("This is not a valid mission ID")
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
        desc = `${desc}\n**Description:**\n${text[args[0]].accept_chat_bubble}`
        data.description = text[args[0]].accept_chat_bubble

        desc = `${desc}\n**Objective:**\n${text[args[0]].in_progress}`
        data.objective = text[args[0]].in_progress

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
        data.LEGOScore = info.LegoScore
        data.rewardCoins = info.reward_currency

        desc = `${desc}\n**Universe Score:**\n${info.LegoScore} Points`
        if(info.repeatable == true){
            name = `${name} (Repeatable)`
            data.isRepeatable = 1
        }else{
            data.isRepeatable = 0
        }
        data.vaultSpace = info.reward_bankinventory

//DO ICON URL
        var MissionTasks = require(`./../tables/MissionTasks/${Math.floor(args[0]/256)}/${args[0]}.json`);
        var iconID = MissionTasks.tasks[0].IconID
        var icon = require(`./../tables/Icons/${iconID}.json`)
        var iconPath = icon.IconPath
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

        //console.log(args[0],args[1],args[2],args[3])

        console.log(data)
            var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
            var url = `https://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=52288&scope=bot`
            var client = message.client
            var channel = message.channel.toString()
            channel = channel.substring(2, channel.length-1);
            if(desc == ''){
                desc = "**0 Results**"
            }
            const Discord = require('discord.js');
            //var title = `${name} : ${npc.displayName}`
        var title = `${name}`

        const Embed = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle(title)
                .setURL(url)
                .setAuthor(`Nexus Force`, nexusLink, url)
                .setDescription(desc)

                .setThumbnail(iconURL)

                .setTimestamp()
                .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

            client.channels.cache.get(channel).send(Embed);



    }
}
