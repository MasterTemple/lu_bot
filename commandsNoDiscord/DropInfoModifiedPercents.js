module.exports = {
    name: ['slot'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `slot [args]`,
    example: [`slot 12809`],
    execute(args) {
        var itemID = 7570
        const roundToHundredth = (value) => {
            return Number(value.toFixed(2));
        };

        var LootTable = require(`./../tables/LootTable/groupBy/itemid/${Math.floor(itemID / 256)}/${itemID}.json`)
// //console.log(LootTable)
        var LootTableIndexArray = []
        var LootMatrixIndexObject = {}
        var LootHolder = []
        for (var el = 0; el < LootTable["elements"].length; el++) {
            LootTableIndexArray.push(LootTable["elements"][el].LootTableIndex)
        }

        for (var r = 0; r < LootTableIndexArray.length; r++) {
            LootMatrixIndexObject[`${LootTableIndexArray[r]}`] = []
            //var LootMatrixFile = require(`./../search/LootMatrix.json`)
            var LootMatrixFile = require(`./../LootMatrix.json`)

            var lootMatrixID = LootMatrixFile.table.filter(a => a.LootTableIndex == (LootTableIndexArray[r]))
            //LootMatrixIndexObject[`${LootTableIndexArray[r]}`].push(lootMatrixID)
            //LootMatrixIndexObject[`${LootTableIndexArray[r]}`] = (lootMatrixID)
            var dropFile = require(`./../objects/groupBy/component/7.json`)

            // //console.log(lootMatrixID.length)
            for (var i = 0; i < lootMatrixID.length; i++) {
                var obj = {
                    //"LootMatrixIndex": lootMatrixID[i].LootMatrixIndex,
                    //"LootTableIndex": lootMatrixID[i].LootTableIndex,
                    //"RarityTableIndex": lootMatrixID[i].RarityTableIndex,
                    "percent": roundToHundredth(parseFloat(lootMatrixID[i].percent)*100.0),
                    "minToDrop": lootMatrixID[i].minToDrop,
                    "maxToDrop": lootMatrixID[i].maxToDrop,
                    "id": lootMatrixID[i].id,

                }
                //var LootTable = require('')
                var LootTableFile = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootMatrixID[i].LootTableIndex/256)}/${lootMatrixID[i].LootTableIndex}.json`)
                //console.log(LootTableFile.elements.length)
                obj.differentItemsToDropRange = LootTableFile.elements.length

                obj.destructibleComponents = []
                //var DCFile = require(`./../tables/DestructibleComponent/${Math.floor(lootMatrixID[i].LootMatrixIndex)}/${lootMatrixID[i].LootMatrixIndex}.json`)
                var DCFile = require(`./../search/destructibleComponent.json`)
                var DCIDs = DCFile.Sheet1.filter(a => a.LootMatrixIndex == lootMatrixID[i].LootMatrixIndex)
                // //console.log(lootMatrixID[i].LootMatrixIndex, DCIDs)
                for (var d = 0; d < DCIDs.length; d++) {
                    // console.log(DCIDs[d].id)

                    var enemy = dropFile.table.find(b => b.comp_val === parseInt(DCIDs[d].id))
                    // //console.log(enemy)
                    if (enemy != undefined) {
                        // console.log(enemy.id, enemy.name)
                        //}
                        var DisplayNameFile = require(`./../objects/0/${Math.floor(parseInt(enemy.id) / 256)}/${enemy.id}.json`)

                        //var dName = DisplayNameFile.displayName
                        if (DisplayNameFile.displayName !== null) {
                            //dName = enemy.name
                            //}
                            obj.destructibleComponents.push({
                                //componentID: DCIDs[d].id,
                                //name: enemy.name,
                                objectID: enemy.id,
                                displayName: DisplayNameFile.displayName
                            })
                        }
                    }
                }
                if(obj.destructibleComponents.length !== 0) {
                    LootMatrixIndexObject[`${LootTableIndexArray[r]}`].push(obj)
                }
            }


            //LootMatrixIndexObject[`${LootTableIndexArray[r]}`].destructibleComponents = 1
            //LootMatrixIndexObject[`${LootTableIndexArray[r]}`][lootMatrixID] = `ok`
            // //console.log(lootMatrixID)

            LootMatrixIndexObject[`${LootTableIndexArray[r]}`].push(obj)
            // var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(LootTableIndexArray[r]/256)}/${LootTableIndexArray[r]}.json`)
            // //console.log(LootMatrix)
        }

        return LootMatrixIndexObject
// //console.log(LootTableIndexArray)


// //console.log(LootMatrixIndexObject)
//
// fs.writeFile ("justTest.json", JSON.stringify(LootMatrixIndexObject,null,2), function(err) {
//         if (err) throw err;
// //         console.log('complete');
//     }
// );
    }
}
