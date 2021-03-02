module.exports = {
    name: ['getkit', 'kitpiece'],
    description: 'Gets kit from an item',
    args: true,
    use: `getkit [id]`,
    example:[`getkit 7415`],
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

                pieces = `${pieces}**${item.Sets[i].kitName}**\n`
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
                var data = item.Sets.find(a => (a.itemIDs.includes(args[0])))
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
                for (var i = 0; i < (Object.keys(data.itemIDs).length); i++) {
                    //console.log(data.enemies[i])
                    let lootdata = loot.Sheet1.find(a => (a.id) == data.itemIDs[i])

                    pieces = `${pieces}${data.itemIDs[i]}: **${lootdata.name}**\n`
                }

                var totalMessage = `${pieces}`
                //message.channel.send(totalMessage)
                //console.log(pieces)
                //console.log(minibossesString)
                //var url = `https://lu-explorer.web.app/zones/${data.zoneID}`
                const func = require(`./embed.js`);
                try {
                    var url = `https://lu-explorer.web.app/zones/`
                    var pass = `https://lu-explorer.web.app/zones/`
                    func.execute(message, data.kitName, totalMessage, data.setImageURL, data.setImageURL);
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
