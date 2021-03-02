module.exports = {
    name: ['cooldowngroup',"cooldown", "group"],
    description: 'See other cooldowns that an item impacts',
    args: true,
    use: `cooldowngroup [id]`,
    example:[`cooldowngroup 51`],
    execute(message, args) {
        var id = args[0]
        var item = require(`./../search/cooldownsWithTimer.json`);
        var info = item.table.find(a => (a.cooldowngroup == id))
        var desc = ``
        const {iconURL, nexusLink} = require('./../config.json');
        const func = require(`./embed.js`);
        var title =`**Cooldown Group: ${info.cooldowngroup}**\n`

        //var details = info.objects.find(a => a.item)
        //console.log(info)
        //console.log(info.cooldowngroup)
        if(info.objects==undefined){
            console.log(`fail`)
            return
        }
        //console.log(info)
        for(var i=0;i<info.objects.length;i++) {
            var itemType = require(`./../objects/0/${Math.floor(info.objects[i].itemID/256)}/${info.objects[i].itemID}.json`);
            var type = itemType.type
            console.log(type)

            if(type == "Loot"){
                desc = `${desc}**${info.objects[i].name}** [${info.objects[i].itemID}]\n**${info.objects[i].cooldownTime}** Seconds\n`
            }else{
                console.log(`not an item`)
            }

            if(desc.length > 1940){
                var shortMessage = desc
                desc = ``
                func.execute(message, title, shortMessage, nexusLink, iconURL);

            }
            if(i==info.objects.length-1){
                var totalMessage = desc

                func.execute(message, title, totalMessage, nexusLink, iconURL);

            }
        }


    }
}
