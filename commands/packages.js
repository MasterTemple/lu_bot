module.exports = {
    name: ['packages', 'p'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `packages [args]`,
    example: [`packages 7445`],
    execute(message, args) {
        var data = {}
        data.table = []
        var itemID = args[0]

        try{
            var object = require(`./../objects/0/${Math.floor(itemID / 256)}/${itemID}.json`);
        }
        catch{
            message.channel.send("An object for this ID does not even exist.")
            return
        }
        var packageComponentValue = object.components["53"]

        var packageComponent = require(`./../tables/PackageComponent/${packageComponentValue}.json`);
        var lootMatrixIndexValue = packageComponent.LootMatrixIndex

        var lootMatrixFile = require(`./../tables/LootMatrix/${Math.floor(lootMatrixIndexValue / 256)}/${lootMatrixIndexValue}.json`)
        //console.log(lootMatrixFile)
        //var lootTableIndexObj =
        for(var i=0;i<lootMatrixFile.elements.length;i++){
            var object = {
                "LootTableIndex": lootMatrixFile.elements[i].LootTableIndex ,
                "maxToDrop": lootMatrixFile.elements[i].maxToDrop ,
                "minToDrop": lootMatrixFile.elements[i].minToDrop ,
                "percent": lootMatrixFile.elements[i].percent,
                "items": []
            }
            //console.log(`LootTableIndex: ${lootMatrixFile.elements[i].LootTableIndex}`)
            //console.log(`maxToDrop: ${lootMatrixFile.elements[i].maxToDrop}`)
            //console.log(`minToDrop: ${lootMatrixFile.elements[i].minToDrop}`)
            //console.log(`percent: ${lootMatrixFile.elements[i].percent}`)

            var lootTableFile = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootMatrixFile.elements[i].LootTableIndex / 256)}/${lootMatrixFile.elements[i].LootTableIndex}.json`)
            for(var k=0;k<lootTableFile.elements.length;k++) {

                //console.log(lootTableFile.elements[k].itemid)
                var itemNameFile = require(`./../objects/0/${Math.floor(lootTableFile.elements[k].itemid / 256)}/${lootTableFile.elements[k].itemid}.json`)
                //console.log(itemNameFile.name)
                //console.log(itemNameFile.displayName)
                var itemObj = {
                    "itemID": lootTableFile.elements[k].itemid,
                    "itemName":itemNameFile.name,
                    "itemDisplayName": itemNameFile.displayName
                }
                object.items.push(itemObj)


            }

            data.table.push(object)
        }


        console.log(data)

        // const fs = require(`fs`)
        // fs.writeFile (`${itemID}.json`, JSON.stringify(data), function(err) {
        //         if (err) throw err;
        //         console.log('complete');
        //     }
        // );

    }
}
