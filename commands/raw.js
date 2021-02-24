module.exports = {
    name: ['raw'],
    description: 'Search any object by id, displays raw content',
    args: true,
    use: `raw [id]`,
    example:[`raw 13843`],
    execute(message, args) {
        var item = require(`./../search/Objects.json`);
        var id = args[0]
        var data = item.Sheet1.find(a => a.id == id)
        var info = `id: ${data.id}\nname: ${data.name}\nplaceable: ${data.placeable}\ntype: ${data.type}\ndescription: ${data.description}\nlocalize: ${data.localize}\ninteractionDistance: ${data.interactionDistance}\nnametag: ${data.nametag}\nlocStatus: ${data.locStatus}\n_internalNotes: ${data._internalNotes}\nHQ_valid: ${data.HQ_valid}\nundefined: ${data.undefined}`
        message.channel.send(`\`\`\`${info}\`\`\``)

    }
}