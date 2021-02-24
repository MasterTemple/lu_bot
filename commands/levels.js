module.exports = {
    name: 'level',
    description: 'Info about the levels in LEGO Universe',
    args: true,
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        //`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`

        try{
            var item = require(`./../tables/LevelProgressionLookup/index.json`);
            console.log(item._embedded.LevelProgressionLookup[id-1].requiredUScore)
            var required = item._embedded.LevelProgressionLookup[id-1].requiredUScore
            var this_level = item._embedded.LevelProgressionLookup[id-1].requiredUScore - item._embedded.LevelProgressionLookup[id-2].requiredUScore
            required = required.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this_level = this_level.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        catch{
            message.channel.send(`${id} is not an available level.`)
            return
        }

        if(isNaN(id)){
            message.channel.send(`Soldier that's not an Enemy!\nObject ${id} Type: ${item.type}`)
            return;
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

        var iconURL = `https://static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest?cb=20121121213649`

        /*
        https://xiphoseer.github.io/lu-res/textures/ui/../../textures/auramar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/ui/amar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/auramar/ui/inventory/hands/kiteshield_bat.png
         */

        console.log(iconURL)
        //console.log(`https://xiphoseer.github.io/lu-res/textures/ui/..\\..\\textures\\ui\\inventory\\faction kits\\sorcerer_shoulder_3.png`.replace('\\', '/'))
        //https://xiphoseer.github.io/lu-res/textures/ui/inventory/faction%20kits/sorcerer_shoulder_3.png

        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`

        var title = `Level ${id}!`


        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            //.setDescription(allSkills)

            .setThumbnail(iconURL)
            .addFields(
                { name: `Requirements`, value: `**For Level ${id}:**`, inline: true },
                { name: `From Level ${id-1}`, value: `${this_level} Experience `, inline: true },
                { name: `Total`, value: `${required} Experience`, inline: true },


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