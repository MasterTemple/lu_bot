module.exports = {
    name: ['raw'],
    description: 'Search any object with all related content',
    args: true,
    use: `raw [id]`,
    example:[`raw 13843`],
    execute(message, args) {
        var item = require(`./../search/Objects.json`);
        var id = args[0]
        var ok = item.Sheet1.find(a => a.id == id)
        var info = `id: ${ok.id}\nname: ${ok.name}\nplaceable: ${ok.placeable}\ntype: ${ok.type}\ndescription: ${ok.description}\nlocalize: ${ok.localize}\ninteractionDistance: ${ok.interactionDistance}\nnametag: ${ok.nametag}\nlocStatus: ${ok.locStatus}\n_internalNotes: ${ok._internalNotes}\nHQ_valid: ${ok.HQ_valid}\nundefined: ${ok.undefined}`
        message.channel.send(`\`\`\`${info}\`\`\``)

    }
}