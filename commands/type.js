module.exports = {
    name: ['type','id', 'object', 'obj'],
    description: 'Gives type from ID',
    args: true,
    use: `type [id]`,
    example:[`type 7415`],
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        try {
            const client = message.client
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
            //message.channel.send(`Object [${id}] Type: **${item.type}**`)
            var type = item.type
            console.log(`Type: ${type}`)
            if(type == (undefined || null || ``)){
                type = 'undefined'
            }


            if (type == (`NPC` || `UserGeneratedNPCs`)) {
                const func = require(`./npc.js`);
                try {
                    func.execute(message, args);
                } catch (error) {
                    console.error(error);
                }
                return
            } else if (type == 'Loot') {
                const func = require(`./item.js`);
                try {
                    func.execute(message, args);
                } catch (error) {
                    console.error(error);
                }
                return
            } else if (type == 'Enemies') {
                const func = require(`./enemies.js`);
                //func.execute()
                try {
                    func.execute(message, args);
                } catch (error) {
                    console.error(error);
                }
                return
            } else if (type == 'LEGO brick') {
                const func = require(`./brick.js`);
                //func.execute()
                try {
                    func.execute(message, args);
                } catch (error) {
                    console.error(error);
                }
                return
            } else {
                message.channel.send(`Object [${id}] Type: **${type}**`)
                message.channel.send("This datatype is not currently supported.")
            }
        } catch {
            message.channel.send("An object for this ID does not even exist.")
        }
    }
}