module.exports = {
    name: ['npc'],
    description: 'Info about an NPC in LEGO Universe',
    args: true,
    use: `npc [id]`,example:[`npc 12261`],
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        var missionNamesString

        //`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`
        try{
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
        }
        catch{
            message.channel.send("An object for this ID does not even exist.")
            return
        }
        if(item.type != "NPC" && item.type != "UserGeneratedNPCs"){
            message.channel.send(`Soldier that's not an NPC!\nObject ${id} Type: ${item.type}`)
            return;
        }
        var quest = item.components["73"]
        console.log(quest)
        if (quest != undefined){
            var missions = require(`./../tables/MissionNPCComponent/0/${quest}.json`)
            var missionsFromNPC = []
            var missionNames = []
            try{
                for (var i = 0; i < missions.missions.length; i++) {
                    missionsFromNPC.push(missions.missions[i].missionID)
                    var missionName = require(`./../locale/Missions/${Math.floor(missions.missions[i].missionID / 256)}.json`)
                    console.log(`./../locale/Missions/${Math.floor(missions.missions[i].missionID / 256)}.json`)
                    missionNames.push(missionName[missions.missions[i].missionID].name)
                    console.log(missionName)
                }
                missionNamesString = ``
                for(var i=0; i<missionNames.length; i++){
                    missionNamesString= `${missionNamesString}, ${missionNames[i]}`
                }
            }
            catch{

            }

            console.log(missionsFromNPC)
            console.log(`MISSIONS ${missions.missions[0].missionID}`)
        }
        console.log(`${item.name}`)

        var isWeapon = false
        var Armor = 0
        var Health = 0
        var Imagination = 0
        var dmg = ``
        var dmg_component = ``
        var cooldowngroup
        var cooldown
        var dmg_combo
        var title = item.name
        console.log(item)
        var displayName = item.displayName
        var internalNotes = item._internalNotes
        var description = item.description
        var extra_desc = ''
        var renderID = item.components["2"]
        console.log(`renderID: ${renderID}`)
        var renderFolder = Math.floor(renderID/256)
        var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        console.log(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        var iconID = renderComponent.IconID
        //var icons = require(`./../tables/Icons/${iconID}.json`)
        console.log(`./../tables/Icons/${iconID}.json`)
        //var iconPath = icons.IconPath
        var iconPath = renderComponent.icon_asset



        const client = message.client;
        var channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        console.log(`chan: ${channel}`)
        const Discord = require('discord.js');
        var url = `https://lu-explorer.web.app/objects/${id}/2`;
        const img = `https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png`;
        //var displayNameClean = item.displayName.replace(/\s/g, '_')
        //var thumbnail = `https://static.wikia.nocookie.net/legouniverse/images/5/5f/${displayNameClean}.png`
        //console.log(`thumbnail ${thumbnail}`)
        var maudeLink = `https://cdn.discordapp.com/attachments/641133444746838016/813618015320408074/200.png`
        if(iconPath != null) {
            iconPath = iconPath.replace('DDS', 'png')
            iconPath = iconPath.replace('dds', 'png')
            iconPath = iconPath.replace(/\\/g, "/");
            iconPath = iconPath.replace(` `, "%20");
            iconPath = iconPath.toLowerCase()
            var iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
        } else if(quest == undefined) {
            var iconURL = `https://xiphoseer.github.io//lu-res/mesh//overhead_indicators//icon_vendor.png`
        }
        else{
            var iconURL = `https://cdn.discordapp.com/attachments/717825273604603944/813874900476493844/bob_mag.png`
        }
        /*
        https://xiphoseer.github.io/lu-res/textures/ui/../../textures/auramar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/ui/amar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/auramar/ui/inventory/hands/kiteshield_bat.png
         */

        console.log(iconURL)
        //console.log(`https://xiphoseer.github.io/lu-res/textures/ui/..\\..\\textures\\ui\\inventory\\faction kits\\sorcerer_shoulder_3.png`.replace('\\', '/'))
        //https://xiphoseer.github.io/lu-res/textures/ui/inventory/faction%20kits/sorcerer_shoulder_3.png

        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        if(cooldown==undefined || cooldown==null || cooldown==``){
            cooldown= "None"
        }if(cooldowngroup==undefined || cooldowngroup==null || cooldowngroup==``){
            cooldowngroup= "None"
        }if(dmg_combo==undefined || dmg_combo==null || dmg_combo==``){
            dmg_combo= "None"
        }if(displayName==undefined || displayName==null || displayName==``){
            displayName= "None"
        }if(internalNotes==undefined || internalNotes==null || internalNotes==``){
            internalNotes= "None"
        }if((description==undefined || description==null || description==``) && (quest != null || quest != undefined)){
            description= "None"
        }
        var chargeUp= "None"

        console.log(`displayName: ${displayName}`)
        if(description != null){
            if (description.includes("__MG__")) {
                description = description.replace('__MG__', "");
            }
        }else{
            description = "None"
        }
        console.log(missionNames)
        if(quest == undefined){
           missionNamesString = `None`
        }
        console.log(missionNamesString)
        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(`**Quests**\n${missionNames.join(", ")}`)

            .setThumbnail(iconURL)
            .addFields(
                { name: 'Display Name', value: displayName, inline: true },
                { name: 'Internal Notes', value: internalNotes, inline: true },
                { name: 'Description', value: description, inline: true },

            )
            .addFields(
                //{ name: 'Quests', value: missionNames, inline: false },
                //{ name: 'Sells', value: "IDK YET", inline: false },

            )

            // .addFields(
            //     { name: 'ChargeUp', value: chargeUp, inline: true },
            //     { name: 'Cooldown Time', value: `${cooldown} Seconds`, inline: true },
            //     { name: 'Cooldown Group', value: cooldowngroup, inline: true },
            // )
            // .addFields(
            //     {name: 'Armor', value: Armor, inline: true},
            //     {name: 'Health', value: Health, inline: true},
            //     {name: 'Imagination', value: Imagination, inline: true},
            // )
            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);
    }
}