module.exports = {
    name: ['kitstats'],
    description: 'Get all items in a kit',
    args: true,
    use: `kitstats [name]`,
    example:[`kitstats daredevil rank 3 variant`],
    execute(message, args) {
        console.log(`me`)
        function err(){
            const func = require(`./embed.js`);
            try {
                var totalMessage = `None`
                func.execute(message, "Kits", totalMessage, "https://lu-explorer.web.app/zones", "https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png");
            } catch (error) {
                console.error(error);
            }
        }
        var search = args[0]
        for(var i=1; i<args.length;i++){
            search = `${search} ${args[i]}`
        }
        if(args.length == 0){
            err()
            return
        }
        if(args[0] == "all"){
            var item = require(`./../search/itemSets.json`);
            const func = require(`./embed.js`);
            var totalMessage = `None`
            var url = `https://lu-explorer.web.app/`
            var pass = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
            var pieces = ``
            for (var i = 0; i < (Object.keys(item.Sets).length);i++) {
                //console.log(data.enemies[i])

                pieces = `${pieces}**${item.Sets[i].setName}**\n`
            }
            func.execute(message, "All kits:", pieces, url, pass);
            return
        }
        //if(isNaN(parseInt(args[0]))==false) {
        var map_id = args[0]
        map_id = map_id.toLowerCase()
        console.log(map_id)
        //var folder_loc = Math.floor(id / 256)
        try {
            const client = message.client
            var item = require(`./../search/itemSets.json`);
            var id = args[0]

            //var data = item.Sets.find(a => (a.itemIDs.includes(args[0])))
            var data = item.Sets.find(a => (a.setName.toLowerCase().includes(search)))
            //console.log(data)

            //var data = item.Sets.some((val) => {
            //    return Object.keys(val).includes(args[0]);
            //})

            //var arrFound = Object.keys(item).filter(function(key) {
            //    return item[key].Sets.itemIDs == (id);
// to cast b//ack from an array of keys to the object, with just the passing ones
            //})
            //console.log(arrFound)

            //console.log(data)
            var loot = require(`./../search/allLoot.json`);
            //data = item.Enemies.find(a => (a.map).toLowerCase() == map_id)

            var pieces = `**Pieces:**\n`
            //var minibossesString = `**MiniBosses:**\n`
            console.log(data)
            var totalArmor = 0
            var totalHealth = 0
            var totalImagination = 0
            for (var i = 0; i < (Object.keys(data.itemIDs).length); i++) {

                var folder_loc = Math.floor(data.itemIDs[i] / 256)
                var stat = require(`./../objects/0/${folder_loc}/${data.itemIDs[i]}.json`);
                console.log(`./../objects/0/${folder_loc}/${data.itemIDs[i]}.json`)
                if (stat.skills != undefined) {
                    //console.log(stat.skills)
                    var Armor = 0
                    var Health = 0
                    var Imagination = 0
                    for (var j = 0; j < stat.skills.length; j++) {


                        var skillID = (stat.skills[j].skillID)
                        //var behav_folder_loc = Math.floor(skillID / 256)
                        //var skillBehavior = require(`./../locale/SkillBehavior/${behav_folder_loc}.json`)
                        var cooldownFile = require(`./../tables/SkillBehavior/${skillID}.json`)
                        console.log(cooldownFile)
                        //console.log(data.enemies[i])

                        if (cooldownFile.armorBonusUI != null) {
                            Armor = cooldownFile.armorBonusUI
                        }
                        if (cooldownFile.lifeBonusUI != null) {
                            Health = cooldownFile.lifeBonusUI
                        }
                        if (cooldownFile.imBonusUI != null) {
                            Imagination = cooldownFile.imBonusUI
                        }
                        if (cooldownFile.armorBonusUI != null) {
                            totalArmor += parseInt(cooldownFile.armorBonusUI)
                        }
                        if (cooldownFile.lifeBonusUI != null) {
                            totalHealth += parseInt(cooldownFile.lifeBonusUI)
                        }
                        if (cooldownFile.imBonusUI != null) {
                            totalImagination += parseInt(cooldownFile.imBonusUI)
                        }

                    }


                    let lootdata = loot.Sheet1.find(a => (a.id) == data.itemIDs[i])
                    pieces = `${pieces}${data.itemIDs[i]}: **${lootdata.name}**\nArmor: **${Armor}** Health: **${Health}** Imagination: **${Imagination}**\n`

                }

            }
            pieces = `${pieces}\n**Total**\nArmor: **${totalArmor}** Health: **${totalHealth}** Imagination: **${totalImagination}**\n`


            var totalMessage = `${pieces}`
            //message.channel.send(totalMessage)
            //console.log(pieces)
            //console.log(minibossesString)
            //var url = `https://lu-explorer.web.app/zones/${data.zoneID}`
            const func = require(`./embed.js`);
            try {
                var url = `https://lu-explorer.web.app/zones/`
                var pass = `https://lu-explorer.web.app/zones/`
                func.execute(message, data.setName, totalMessage, data.setImageURL, data.setImageURL);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            err()
            console.log(error)

        }
        //}
    }
}