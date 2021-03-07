module.exports = {
    name: ['drop'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `drop [args]`,
    example: [`drop 3100`],
    execute(message, args) {
        var data = {}
        data.table = []
        var itemID = args[0]
        var lootTableFile = require(`./../tables/LootTable/groupBy/itemid/${Math.floor(itemID / 256)}/${itemID}.json`)
        var itemNameFile = require(`./../objects/0/${Math.floor(itemID / 256)}/${itemID}.json`)
        var object = {
            "itemID": itemID,
            "itemName":itemNameFile.name,
            "itemDisplayName": itemNameFile.displayName,
            "packages": []
        }
        var lootTableIndexes = []
        for(var i=0;i<lootTableFile.elements.length;i++){
            lootTableIndexes.push(lootTableFile.elements[i].LootTableIndex)
        }
        //console.log(lootTableIndexes)
        var lootMatrixIndexes = []
        var lootMatrixFile = require(`./../LootMatrix.json`)

        for(var i=0;i<lootTableIndexes.length;i++){
            var lootMatrixID = lootMatrixFile.table.filter(a => parseInt(a.LootTableIndex) == lootTableIndexes[i])
            //console.log(lootMatrixID)
            //var lootMatrixFile = require(`./../tables/LootMatrix/${Math.floor(lootTableIndexes[i] / 256)}/${lootTableIndexes[i]}.json`)
            for(var k=0;k<lootMatrixID.length;k++) {
                lootMatrixIndexes.push(lootMatrixID[k].LootMatrixIndex)
            }
        }
        //console.log(lootMatrixIndexes)

        var packageInfo = require(`./../packageIDfromLootMatrixIndex.json`)
        var packageIDs = []
        for(var i=0;i<lootMatrixIndexes.length;i++){
            var packageID = packageInfo.table.find(a => parseInt(a.LootMatrixIndex) == lootMatrixIndexes[i])
            try{
                packageIDs.push(packageID.id)
            }catch{}
        }
        //console.log(packageIDs)

        const packageComponent = require(`./../objects/groupBy/component/53.json`)
        var itemInfoFromComponenets = []
        for(var i=0;i<packageIDs.length;i++){
            var packageComponentID = packageComponent.table.find(a => a.comp_val == packageIDs[i])
            //console.log(packageComponent[packageIDs[i]])
            //itemInfoFromComponenets.push(packageComponent[packageIDs[i]])
            itemInfoFromComponenets.push(packageComponentID)
        }
        //console.log(itemInfoFromComponenets)

        var obj = {
            "itemID": itemID,
            "itemInfo": itemInfoFromComponenets
        }
        data.table.push(obj)
        console.log(obj)
        console.log(data)

        //(`./../objects/groupBy/component/53.json`)



        }
}
