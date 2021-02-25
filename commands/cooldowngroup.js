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
        //var details = info.objects.find(a => a.item)
        //console.log(info)
        //console.log(info.cooldowngroup)
        if(info.objects==undefined){
            console.log(`fail`)
            return
        }
        //console.log(info)
        for(var i=0;i<info.objects.length;i++) {
            desc=`${desc}**${info.objects[i].name}** [${info.objects[i].itemID})]\n**${info.objects[i].cooldownTime}** Seconds\n`
        }
        //console.log(info.objects[0])
        //console.log(info.objects[0][0])

        //message.channel.send(desc)
        var title =`**Cooldown Group: ${info.cooldowngroup}**\n`
        var totalMessage = desc
        const {iconURL, nexusLink} = require('./../config.json');
        const func = require(`./embed.js`);
        try {
            var url = `https://lu-explorer.web.app/zones/`
            var pass = `https://lu-explorer.web.app/zones/`
            func.execute(message, title, totalMessage, nexusLink, iconURL);
        } catch (error) {
            console.error(error);
        }



    }
}
