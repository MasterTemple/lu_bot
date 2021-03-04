module.exports = {
    name: ['npc'],
    description: 'Info about an NPC in LEGO Universe',
    args: true,
    use: `npc [id]`,
    example:[`npc 12261`],
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        var missionNamesString
        var missionNamesStr = ``


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
        var vendor = item.components["16"]
        var sell1 = ``
        var sell2 = ``

        //console.log(quest)
        if (quest != undefined){
            var missions = require(`./../tables/MissionNPCComponent/0/${quest}.json`)
            var missionsFromNPC = []
            var missionNames = []
            try{
                for (var i = 0; i < missions.missions.length; i++) {
                    missionsFromNPC.push(missions.missions[i].missionID)
                    var missionName = require(`./../locale/Missions/${Math.floor(missions.missions[i].missionID / 256)}.json`)
                    //console.log(`./../locale/Missions/${Math.floor(missions.missions[i].missionID / 256)}.json`)
                    missionNames.push(missionName[missions.missions[i].missionID].name)
                    //console.log(missionName)

                }
                //`${missionNamesStr},`
                //missionNames = missionNames.join(", ")
                missionNamesString = ``
                for(var j=0; j<missionNames.length; j++){
                    missionNamesString= `${missionNamesString}, ${missionNames[j]}`
                }
                //console.log(`MN:${missionNames}`)
            }
            catch{

            }

            //console.log(missionsFromNPC)
            //console.log(`MISSIONS ${missions.missions[0].missionID}`)
        }
        if(vendor != undefined){
            var soldObjects = require(`./../tables/VendorComponent/0/${vendor}.json`)
            var lootMatrixIndex = soldObjects.LootMatrixIndex
            var lootMatrixTable = require(`./../tables/LootMatrix/${Math.floor(lootMatrixIndex/256)}/${lootMatrixIndex}.json`)
            var lootTableIndex = lootMatrixTable["elements"][0].LootTableIndex
            var lootTable = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootTableIndex/256)}/${lootTableIndex}.json`)
            console.log(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootTableIndex/256)}/${lootTableIndex}.json`)
            //console.log(lootTable["elements"].length)
            for(let k=0;k<lootTable["elements"].length/2;k++){
                //console.log(lootTable["elements"][k].itemid)
                var soldItemName = require(`./../objects/0/${Math.floor(lootTable["elements"][k].itemid/256)}/${lootTable["elements"][k].itemid}.json`);
                var itemName = soldItemName.name
                sell1 = `${sell1}\n${itemName} [${lootTable["elements"][k].itemid}]`
            }
            for(let l=parseInt(lootTable["elements"].length/2);l<lootTable["elements"].length;l++){
                //console.log(lootTable["elements"][k].itemid)
                var soldItemName = require(`./../objects/0/${Math.floor(lootTable["elements"][l].itemid/256)}/${lootTable["elements"][l].itemid}.json`);
                var itemName = soldItemName.name
                sell2 = `${sell2}\n${itemName} [${lootTable["elements"][l].itemid}]`
            }
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
        }
        else if(sell1 != ``) {
            var iconURL = `https://xiphoseer.github.io//lu-res/mesh//overhead_indicators//icon_vendor.png`
        }
        else{
            var iconURL = `https://github.com/MasterTemple/lu_bot/blob/master/src/unknown.png?raw=true`
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
        //console.log(missionNames)

        if(missionNames != undefined){
            for (var j = 0; j < missionNames.length; j++) {
                if (j == missionNames.length - 1) {
                    missionNamesStr = `${missionNamesStr}${missionNames[j]}`
                } else {
                    missionNamesStr = `${missionNamesStr}${missionNames[j]}, `

                }
            }
        }
        if(quest == undefined){
           missionNamesString = `None`
        }
        if(missionNames==undefined){
            missionNames="None"
        }
        console.log(`[${missionNamesStr}]`)
        if(missionNamesStr == `` ){
            missionNamesStr = `None`
        }




            console.log(missionNamesString)
        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(`**Quests**\n${missionNamesStr}`)

            .setThumbnail(iconURL)
            .addFields(
                { name: 'Display Name', value: displayName, inline: true },
                { name: 'Description', value: description, inline: true },
                { name: 'Internal Notes', value: internalNotes, inline: true },


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

        //console.log(sell1)
        //console.log(sell2)
        const brickVendorsIDs = [2264, 3921, 7429, 9705, 9706, 9707, 13379]

        if(sell1 != `` && brickVendorsIDs.includes(parseInt(id)) == false){
        devoEmbed.addFields(
                //{ name: 'Quests', value: missionNames, inline: false },
                { name: 'Sells:', value: sell1, inline: true },
                { name: '឵឵ ឵឵ ឵឵ ', value: sell2, inline: true },


            )
        }
        console.log(lootTable["elements"].length)

        if(sell1 != `` && brickVendorsIDs.includes(parseInt(id))){
            console.log(`here`)
            for(var i=0;i<lootTable["elements"].length/32;i++) {
                var bricksSold = ``
                for (var k = (i*32); k < (lootTable["elements"].length/(lootTable["elements"].length/32))+(i*32); k++) {
                    //console.log(lootTable["elements"][k])
                    try{
                        var soldItemName = require(`./../objects/0/${Math.floor(lootTable["elements"][k].itemid / 256)}/${lootTable["elements"][k].itemid}.json`);
                        var itemName = soldItemName.name
                        bricksSold = `${bricksSold}\n${itemName} [${lootTable["elements"][k].itemid}]`
                    }catch{}

                }

                if(i==0){
                    devoEmbed.addFields({name: 'Sells:', value: bricksSold, inline: true})
                }else{
                    devoEmbed.addFields({ name: '឵឵ ឵឵ ឵឵ ', value: bricksSold, inline: true })
                }


            }

        }

        client.channels.cache.get(channel).send(devoEmbed);
    }
}
