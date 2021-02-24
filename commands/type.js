module.exports = {
    name: ['type'],
    description: 'Gives type from ID',
    args: true,
    use: `type [id]`,
    example:[`type 7415`],
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        try {
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
            message.channel.send(`Object [${id}] Type: **${item.type}**`)
        } catch {
            message.channel.send("An object for this ID does not even exist.")
        }
    }
}