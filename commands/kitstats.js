module.exports = {
    name: ['kitstats'],
    description: 'Get all items in a kit',
    args: true,
    use: `kitstats [name]`,
    example:[`kitstats daredevil rank 3 variant`],
    execute(message, args) {
        //console.log(`me`)
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
        //console.log(map_id)
        //var folder_loc = Math.floor(id / 256)
        try {
            const client = message.client
            var item = require(`./../search/itemSets.json`);
            var id = args[0]

            //var data = item.Sets.find(a => (a.itemIDs.includes(args[0])))
            var data = item.Sets.find(a => (a.setName.toLowerCase().includes(search)))
            //var test = require(`./../search/itemSets.json/Sets/55/piecebonus3/armor`);


            //console.log(data.piecebonus4["armor"])

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
                //console.log(`./../objects/0/${folder_loc}/${data.itemIDs[i]}.json`)
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
                        //console.log(cooldownFile)
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
                    pieces = `${pieces}${data.itemIDs[i]}: **${lootdata.name}**\n**+**Armor: **${Armor}** Health: **${Health}** Imagination: **${Imagination}**\n`

                }

            }
            //data.piecebonus
            if(data.piecebonus2!=undefined){
                console.log(data.piecebonus2)
                totalArmor += parseInt(data.piecebonus2["armor"])
                totalHealth += parseInt(data.piecebonus2["health"])
                totalImagination += parseInt(data.piecebonus2["imagination"])
                pieces = `${pieces}**2 Piece Bonus**\n**+**Armor: **${data.piecebonus2["armor"]}** Health: **${data.piecebonus2["health"]}** Imagination: **${data.piecebonus2["imagination"]}**\n`
            }
            if(data.piecebonus3!=undefined){
                console.log(data.piecebonus3)
                totalArmor += parseInt(data.piecebonus3["armor"])
                totalHealth += parseInt(data.piecebonus3["health"])
                totalImagination += parseInt(data.piecebonus3["imagination"])
                pieces = `${pieces}**3 Piece Bonus**\n**+**Armor: **${data.piecebonus3["armor"]}** Health: **${data.piecebonus3["health"]}** Imagination: **${data.piecebonus3["imagination"]}**\n`
            }
            if(data.piecebonus4!=undefined){
                console.log(data.piecebonus4)
                totalArmor += parseInt(data.piecebonus4["armor"])
                totalHealth += parseInt(data.piecebonus4["health"])
                totalImagination += parseInt(data.piecebonus4["imagination"])
                pieces = `${pieces}**4 Piece Bonus**\n**+**Armor: **${data.piecebonus4["armor"]}** Health: **${data.piecebonus4["health"]}** Imagination: **${data.piecebonus4["imagination"]}**\n`
            }
            if(data.piecebonus5!=undefined){
                console.log(data.piecebonus5)
                totalArmor += parseInt(data.piecebonus5["armor"])
                totalHealth += parseInt(data.piecebonus5["health"])
                totalImagination += parseInt(data.piecebonus5["imagination"])
                pieces = `${pieces}**5 Piece Bonus**\n**+**Armor: **${data.piecebonus5["armor"]}** Health: **${data.piecebonus5["health"]}** Imagination: **${data.piecebonus5["imagination"]}**\n`
            }
            if(data.piecebonus6!=undefined){
                console.log(data.piecebonus6)
                totalArmor += parseInt(data.piecebonus6["armor"])
                totalHealth += parseInt(data.piecebonus6["health"])
                totalImagination += parseInt(data.piecebonus6["imagination"])
                pieces = `${pieces}**6 Piece Bonus**\n**+**Armor: **${data.piecebonus6["armor"]}** Health: **${data.piecebonus6["health"]}** Imagination: **${data.piecebonus6["imagination"]}**\n`
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