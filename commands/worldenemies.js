module.exports = {
    name: ['worldenemies'],
    description: 'List enemies by planet',
    args: true,
    use: `worldenemies [map]`,
    example:[`worldenemies AG`, 'worldenemies 1000'],
    execute(message, args) {
        function err(){
            const func = require(`./embed.js`);
            try {
                var totalMessage = `Enter **AG** or **1000** for **Avant Gardens**\nEnter **RVE** or **1001** for **Return to Venture Explorer**\nEnter **GF** or **1300** for **Gnarled Forest**\nEnter **FV** or **1400** for **Forbidden Valley**\nEnter **AM** or **1800** for **Crux Prime**\nEnter **NJ** or **2000**  for **Ninjago**`
                func.execute(message, "ZoneIDs", totalMessage, "https://lu-explorer.web.app/zones", "https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png");
            } catch (error) {
                console.error(error);
            }
        }
        if(args.length == 0){
            err()
            return
        }
        var map_id = args[0]
        map_id = map_id.toLowerCase()
        console.log(map_id)
        //var folder_loc = Math.floor(id / 256)
        try {
            var data
            const client = message.client
            var item = require(`./../search/enemies.json`);

            if(args[0].length == (2 || 3)){
                data = item.Enemies.find(a => (a.map).toLowerCase() == map_id)
            }else if(!isNaN(args[0])){
                data = item.Enemies.find(a => (a.zoneID) == map_id)
            }else{return}
            console.log(data)

            //console.log(data)
            var enemiesString = `**Enemies:**\n`
            var minibossesString = `**MiniBosses:**\n`
            for (var i = 0; i < (Object.keys(data.enemies).length);i++) {
                //console.log(data.enemies[i])
                enemiesString = `${enemiesString}${data.enemies[i]} `
            }
            for (var j = 0; j < (Object.keys(data.enemies).length);j++) {
                //console.log(data.minibosses[j])
                if(data.minibosses[j] == undefined){
                    minibossesString = `${minibossesString}None`
                    break
                }else {
                    minibossesString = `${minibossesString}${data.minibosses[j]} `
                }
            }
            var totalMessage = `${enemiesString}\n${minibossesString}`
            //message.channel.send(totalMessage)
            //console.log(enemiesString)
            //console.log(minibossesString)
            var url = `https://lu-explorer.web.app/zones/${data.zoneID}`
            const func = require(`./embed.js`);
            try {
                func.execute(message, data.mapName, totalMessage, url, data.mapURL);
            } catch (error) {
                console.error(error);
            }
        }catch (error){
            err()
            console.log(error)


            //message.channel.send(`Enter **AG** or **1000** for **Avant Gardens**\nEnter **RVE** or **1001** for **Return to Venture Explorer**\nEnter **GF** or **1300** for **Gnarled Forest**\nEnter **FV** or **1400** for **Forbidden Valley**\nEnter **AM** or **1800** for **Crux Prime**\nEnter **NJ** or **2000**  for **Ninjago**`)
        }
    }
}
