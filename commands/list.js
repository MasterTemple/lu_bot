module.exports = {
    name: ['list'],
    description: 'Gives type from ID',
    args: true,
    use: `type [id]`,
    example:[`type 7415`],
    execute(message, args) {
        var map_id = args[0]
        map_id = map_id.toUpperCase()
        //var folder_loc = Math.floor(id / 256)
        try {
            const client = message.client
            var item = require(`./../search/enemies.json`);
            //var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
            //message.channel.send(`Object [${id}] Type: **${item.type}**`)
            //var type = data.type
            //console.log(item)
            var data = item.Enemies.find(a => a.map == map_id)
            //console.log(data)
            var enemiesString = `**Enemies:**\n`
            var minibossesString = `**MiniBosses:**\n`
            for (var i = 0; i < (Object.keys(data.enemies).length);i++) {
                //console.log(data.enemies[i])
                enemiesString = `${enemiesString}${data.enemies[i]} `
            }
            for (var j = 0; j < (Object.keys(data.enemies).length);j++) {
                //console.log(data.minibosses[j])
                minibossesString = `${minibossesString}${data.minibosses[j]} `
            }
            var totalMessage = `${enemiesString}\n${minibossesString}`
            message.channel.send(totalMessage)
            //console.log(enemiesString)
            //console.log(minibossesString)

        }catch (error){
            console.log(error)
            message.channel.send(`Enter **AG **for **Avant Gardens**\nEnter **RVE **for **Return to Venture Explorer**\nEnter **GF **for **Gnarled Forest**\nEnter **FV **for **Forbidden Valley**\nEnter **AM **for **Crux Prime**\nEnter **NJ** for **Ninjago**`)
        }
    }
}