module.exports = {
    name: ['enemies'],
    description: 'Info about the Maelstrom in LEGO Universe',
    args: true,
    use: `enemies [id]`,
    example:[`enemies 4712`],
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        //`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`
        if(args.length == 0){
            message.channel.send("Please provide an ID.")
            return
        }
        try{
            //console.log(`./../objects/0/${folder_loc}/${item_loc}.json`)
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
        }
        catch(error){
            console.log(error)
            message.channel.send("An object for this ID does not even exist.")
            return
        }
        if(item.type != "Enemies"){
            message.channel.send(`Soldier that's not an Enemy!\nObject ${id} Type: ${item.type}`)
            return;
        }

        console.log(`${item.name}`)

        var dropData = {}
        dropData.table = []
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
        var destructibleComponentID = item.components["7"]
        var destructibleComponent = require(`./../tables/DestructibleComponent/${Math.floor(destructibleComponentID/256)}/${destructibleComponentID}.json`)
        var life = destructibleComponent.life
        var LootMatrixIndex = destructibleComponent.LootMatrixIndex
        var Armor = destructibleComponent.armor
        var CurrencyIndex = destructibleComponent.CurrencyIndex
        var LootMatrixIndexFile = require(`./../tables/LootMatrix/${Math.floor(LootMatrixIndex/256)}/${LootMatrixIndex}.json`)
        console.log(LootMatrixIndexFile["elements"].length)
        const roundToHundredth = (value) => {
            return Number(value.toFixed(2));
        };

        //console.log(roundToHundredth(parseFloat(LootMatrixIndexFile["elements"][k].percent)*100.0))
        for(var k=0;k<LootMatrixIndexFile["elements"].length;k++){
            console.log(`${roundToHundredth(parseFloat(LootMatrixIndexFile["elements"][k].percent)*100.0)}% Chance to Drop ${LootMatrixIndexFile["elements"][k].minToDrop}-${LootMatrixIndexFile["elements"][k].maxToDrop} Items:`)
            var LootTableFile = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(LootMatrixIndexFile["elements"][k].LootTableIndex/256)}/${LootMatrixIndexFile["elements"][k].LootTableIndex}.json`)
            for(var j=0;j<LootTableFile["elements"].length;j++){
                //console.log(LootTableFile["elements"][j].itemid)
                var dropItemFile = require(`./../objects/0/${Math.floor(LootTableFile["elements"][j].itemid/256)}/${LootTableFile["elements"][j].itemid}`)
                console.log(LootTableFile["elements"][j].itemid, dropItemFile.displayName)

            }

        }


        //console.log(`life:${destructibleComponent.life}`)
        //console.log(destructibleComponent.life)
        console.log(`renderID: ${renderID}`)
        var renderFolder = Math.floor(renderID/256)
        var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        console.log(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        var iconID = renderComponent.IconID
        //var icons = require(`./../tables/Icons/${iconID}.json`)
        console.log(`./../tables/Icons/${iconID}.json`)
        //var iconPath = icons.IconPath
        var iconPath = renderComponent.icon_asset
        var enemyCooldown
        var behaviorID
        var allSkills =`**Skills:**`
        if(item.skills != undefined || item.skills != null) {
            for (var i = 0; i < item.skills.length; i++) {
                var skillID = (item.skills[i].skillID)
                console.log(skillID)
                var behav_folder_loc = Math.floor(parseInt(skillID) / 256)
                //var skillBehavior = require(`./../locale/SkillBehavior/${behav_folder_loc}.json`)
                var skillBehavior = require(`./../tables/SkillBehavior/${skillID}.json`)
                var skillBehaviorName = require(`./../Search/BehaviorTemplateName.json`)


                console.log(`./../tables/SkillBehavior/${skillID}.json`)
                console.log(skillBehavior)
                enemyCooldown = skillBehavior.cooldown
                behaviorID = skillBehavior.behaviorID


                var behavior = require(`./../behaviors/${Math.floor(behaviorID/1024)}/${behaviorID}.json`)
                console.log(behavior)
                var templateID = behavior.templateID
                var data = skillBehaviorName.Sheet1.find(a => a.templateID == templateID)
                var behaviorName = data.name
                console.log(behaviorName)
                allSkills = `${allSkills}\n__**name:**__ ${behaviorName}\n**skillID:** ${skillID}\n**templateID:** ${templateID}\n**behaviorID:** ${behaviorID}`
                console.log(`./../behaviors/${Math.floor(behaviorID/1024)}/${behaviorID}.json`)
                //var skillTime = "npc skill time"
                var npcskilltime = behavior.parameters["npc skill time"]
                var max_range = behavior.parameters["max range"]
                var min_range = behavior.parameters["min range"]
                console.log(npcskilltime, max_range, min_range)
                //var abilityName = skillBehavior[skillID]
                ////dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);
                //console.log(`abilityName: ${abilityName}`)
                //console.log(`cool: ${cooldownFile.cooldown}`)


            }
        }


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
        } else if(false) {
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
        }if((description==undefined || description==null || description==``)){
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


        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(allSkills)

            .setThumbnail(iconURL)
            .addFields(
                { name: 'Display Name', value: displayName, inline: true },
                { name: 'Internal Notes', value: internalNotes, inline: true },
                { name: 'Description', value: description, inline: true },
                { name: 'Life', value: life, inline: true },
                { name: 'Armor', value: Armor, inline: true },
                { name: 'LootMatrixIndex', value: LootMatrixIndex, inline: true },
                { name: 'CurrencyIndex', value: CurrencyIndex, inline: true },



            )


            // .addFields(
            //     { name: 'ChargeUp', value: chargeUp, inline: true },
            //     { name: 'Cooldown Time', value: `${cooldown} Seconds`, inline: true },
            //     { name: 'Cooldown Group', value: cooldowngroup, inline: true },
            // )
            //.addFields(
            //    {name: 'Melee Attack', value: Imagination, inline: true},
            //    {name: 'Cool Down', value: `${enemyCooldown} Seconds`, inline: true},
            //    {name: 'Ranged Attack', value: Imagination, inline: true},
            //    {name: 'Armor', value: Armor, inline: true},
            //    {name: 'Health', value: Health, inline: true},
            //)
            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);
    }
}
