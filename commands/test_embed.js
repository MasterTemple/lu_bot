module.exports = {
    name: 'item',
    description: 'Info about the arguments',
    args: true,
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        //`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`
        var item = require(`C:/Users/Blake The Great/Downloads/lubot/lu-json-master/objects/0/${folder_loc}/${item_loc}.json`);
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
        for (var i = 0; i < item.skills.length; i++) {

            var skillID = (item.skills[i].skillID)
            var behav_folder_loc = Math.floor(skillID / 256)
            var skillBehavior = require(`C:/Users/Blake The Great/Downloads/lubot/lu-json-master/locale/SkillBehavior/${behav_folder_loc}.json`)
            console.log(skillBehavior[skillID])
            var abilityName = skillBehavior[skillID].name
            //dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);
            if(skillBehavior[skillID].descriptionUI.includes(`(ChargeUp)`)) {
                var chargeUpLoc = (skillBehavior[skillID].descriptionUI.search(`(ChargeUp)`)) + 9
                console.log(`chargeUpLoc ${chargeUpLoc}`)
                var chargeUp = skillBehavior[skillID].descriptionUI.substring(chargeUpLoc);
            } else if(skillBehavior[skillID].descriptionUI.includes(`(Description)`)){
                var descriptionLoc = (skillBehavior[skillID].descriptionUI.search(`(Description)`)) + `(Description)`.length-1
                console.log(`desc ${descriptionLoc}`)
                var description = skillBehavior[skillID].descriptionUI.substring(descriptionLoc);
                extra_desc = `${extra_desc}\n${abilityName}: ${description}`
            } else if(skillBehavior[skillID].descriptionUI.includes(`+`)==false){
                extra_desc = `${extra_desc}\n${skillBehavior[skillID].descriptionUI}`
            }
            if(item.name.includes(`Wand`)){
                var chargeUpLoc = (skillBehavior[skillID].descriptionUI.search(`(ChargeUp)`)) + 9
                var chargeUp = skillBehavior[skillID].descriptionUI.substring(chargeUpLoc);
                extra_desc = `${extra_desc}\n${skillBehavior[skillID].name}: ${chargeUp}`
                console.log(`I AM A WAND`)
            }
            console.log(`chargeUp: ${chargeUp}`)
            var cooldownFile = require(`C:/Users/Blake The Great/Downloads/lubot/lu-json-master/tables/SkillBehavior/${skillID}.json`)
            console.log(cooldownFile)
            //console.log(`cool: ${cooldownFile.cooldown}`)
            if(cooldownFile.cooldown != 0) {
                cooldowngroup = cooldownFile.cooldowngroup
                cooldown = cooldownFile.cooldown
                console.log(`Cooldown Group: ${cooldownFile.cooldowngroup}\nItem Cooldown: ${cooldownFile.cooldown} seconds`)
            }


            if(cooldownFile.armorBonusUI != null){
                Armor = cooldownFile.armorBonusUI
            }
            if(cooldownFile.lifeBonusUI != null){
                Health = cooldownFile.lifeBonusUI
            }
            if(cooldownFile.imBonusUI != null){
                Imagination = cooldownFile.imBonusUI
            }

            if(i == item.skills.length-1) {
                console.log(`Bonuses:`)
                console.log(`Armor: ${Armor}`)
                console.log(`Health: ${Health}`)
                console.log(`Imagination: ${Imagination}`)
            }
            console.log(`dmg: ${skillBehavior[skillID].descriptionUI[16]},${skillBehavior[skillID].descriptionUI[18]},${skillBehavior[skillID].descriptionUI[20]}`)
            if(skillBehavior[skillID].descriptionUI[16]==`+` && skillBehavior[skillID].descriptionUI[18] == `+`&& skillBehavior[skillID].descriptionUI[20] == `+`){
                dmg_combo = skillBehavior[skillID].descriptionUI.substring(15, 22);
            }else if(skillBehavior[skillID].descriptionUI[16]==`+` && skillBehavior[skillID].descriptionUI[18] == `+`){
                dmg_combo = skillBehavior[skillID].descriptionUI.substring(15, 20);
            }else if(skillBehavior[skillID].descriptionUI[16]==`+`){
                dmg_combo = skillBehavior[skillID].descriptionUI.substring(15, 18);
            }else if((skillBehavior[skillID].descriptionUI[15]>= '0' && skillBehavior[skillID].descriptionUI[15]<= '9')&&item.name.includes('Wand')){
                dmg_combo  = skillBehavior[skillID].descriptionUI[15];

                //dmg_combo=`None`
            }else if((skillBehavior[skillID].descriptionUI[15]>= '0' && skillBehavior[skillID].descriptionUI[15]<= '9')){
                //dmg_combo  = skillBehavior[skillID].descriptionUI[15];
                dmg_combo=`None`
            }

        }

        if(isWeapon){
            var desc = `${dmg_component}\nBonuses:\nArmor: ${Armor}\nHealth: ${Health}\nImagination: ${Imagination}`
        }else{
            var desc = `Bonuses:\nArmor: ${Armor}\nHealth: ${Health}\nImagination: ${Imagination}`

        }

        const client = message.client;
        var channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        console.log(`chan: ${channel}`)
        const Discord = require('discord.js');
        var url = `https://lu-explorer.web.app/objects/${id}/2`;
        const img = `https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png`;
        var displayNameClean = item.displayName.replace(/\s/g, '_')
        var thumbnail = `https://static.wikia.nocookie.net/legouniverse/images/5/5f/${displayNameClean}.png`
        console.log(`thumbnail ${thumbnail}`)
        var maudeLink = `https://cdn.discordapp.com/attachments/641133444746838016/813618015320408074/200.png`
        var iconURL = `https://media.discordapp.net/attachments/641133444746838016/812137478139543552/lego_universe_hand.png?width=676&height=676`
        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        if(cooldown==undefined){
            cooldown= "None"
        }if(cooldowngroup==undefined){
            cooldowngroup= "None"
        }if(dmg_combo==undefined){
            dmg_combo= "None"
        }if(displayName==undefined){
            displayName= "None"
        }if(internalNotes==undefined){
            internalNotes= "None"
        }if(description==undefined){
            description= "None"
        }if(chargeUp==undefined){
            chargeUp= "None"
        }

        var item_description = `**Description**${extra_desc}`

        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(item_description)

            .setThumbnail(thumbnail)
            .addFields(
                { name: 'Display Name', value: displayName, inline: true },
                { name: 'Internal Notes', value: internalNotes, inline: true },
                { name: 'Damage Combo', value: dmg_combo, inline: true },

            )
            .addFields(
                { name: 'ChargeUp', value: chargeUp, inline: true },
                { name: 'Cooldown Time', value: cooldown, inline: true },
                { name: 'Cooldown Group', value: cooldowngroup, inline: true },
            )
            .addFields(
                { name: 'Armor', value: Armor, inline: true },
                { name: 'Health', value: Health, inline: true },
                { name: 'Imagination', value: Imagination, inline: true },
            )
            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);
    }
}