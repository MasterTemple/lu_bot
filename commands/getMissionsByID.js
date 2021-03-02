module.exports = {
    name: ['missionid',`mid`],
    description: 'Search mission by key word(s), order does not matter',
    args: true,
    use: `missionid [args]`,
    example:[`missionid 1665`, `mid 228`],
    execute(message, args) {
        //const client = message.client;
        //

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

        desc = `**Giver:**\n${npc.displayName}`
        desc = `${desc}\n**Description:**\n${text[args[0]].accept_chat_bubble}`
        desc = `${desc}\n**Objective:**\n${text[args[0]].in_progress}`
        //desc = `${desc}\n**On Completion:**\n${text[args[0]].completion_succeed_tip}`

        if(info.reward_item1 != -1) {
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n**Reward:**\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}`
        }
        if(info.reward_item2 != -1 && info.isChoiceReward == true){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n**Rewards (Choose One):**\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}\n${reward.name} [${info.reward_item2}] x ${info.reward_item2_count}`
        }else if(info.reward_item2 != -1){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n**Rewards:**\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}\n${reward.name} [${info.reward_item2}] x ${info.reward_item2_count}`
        }
        if(info.reward_item3 != -1){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}`
        }
        if(info.reward_item4 != -1){
            var reward = require(`./../objects/0/${Math.floor(info.reward_item1/256)}/${info.reward_item1}.json`);
            desc = `${desc}\n${reward.name} [${info.reward_item1}] x ${info.reward_item1_count}`
        }

        desc = `${desc}\n**Universe Score:**\n${info.LegoScore} Points`
        if(info.repeatable == true){
            name = `${name} (Repeatable)`
        }

//DO ICON URL
        var iconUrl
        if(iconUrl == undefined){
            iconUrl = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`

        }
        //console.log(args[0],args[1],args[2],args[3])


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

                .setThumbnail(iconUrl)

                .setTimestamp()
                .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

            client.channels.cache.get(channel).send(Embed);



    }
}
