module.exports = {
    name: ['cooldowngroup'],
    description: 'Info about an item in LEGO Universe',
    args: true,
    use: `cooldowngroup [id]`,
    example:[`cooldowngroup 1`],
    execute(message, args) {
        var id = args[0]
        var item = require(`./../search/cooldowns.json`);
        var info = item.table.objects.find(a => (a.itemID == id))
        //var details = info.objects.find(a => a.item)
        //console.log(info)
        //console.log(info.cooldowngroup)
        if(info.objects==undefined){
            console.log(`fail`)
            return
        }
        //console.log(info)
        for(var i=0;i<info.objects.length;i++) {
            console.log(info.objects[i].name)
            console.log(info.objects[i].itemID)
        }
        //console.log(info.objects[0])
        //console.log(info.objects[0][0])






    }
}
