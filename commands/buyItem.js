module.exports = {
    name: ['buy'],
    description: 'Info about an NPC in LEGO Universe',
    args: true,
    use: `buy [id]`,
    example: [`buy 7415`],
    execute(message, args) {
        var itemID = parseInt(args[0])
        const LootMatrixIndex = require(`./../search/LootMatrixIndex.json`)
        const LootTable = require(`./../tables/LootTable/groupBy/itemid/${Math.floor(itemID/256)}/${itemID}.json`)
        const objectComponent = require(`./../objects/groupBy/component/16.json`)
        //console.log(`len ${LootTable["elements"].length}`)
        var soldByVendor = []
        var vendorsIDs = []
        var vendorsNames = []

        console.log(LootMatrixIndex["table"])
        // for(let i=0;i<LootTable["elements"].length;i++){
        for(let i=0;i<LootMatrixIndex["table"].length;i++){

            var value = (LootTable["elements"][i].LootTableIndex)

            if(LootMatrixIndex["table"][i].inNPCEditor == 1){
                //console.log(LootMatrixIndex["table"][i].LootMatrixIndex, 1)
                soldByVendor.push(LootMatrixIndex["table"][i].LootMatrixIndex)
            } else{
                //console.log(LootMatrixIndex["table"][i].LootMatrixIndex, 0)
            }
        }
        console.log(soldByVendor)



        for(let i =0; i < soldByVendor.length;i++){
            //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
            //var ans = getKeyByValue(objectComponent, )
            //console.log(i)
            try{
                vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).name)
                vendorsNames.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)
            }catch{
                    //console.log(`${soldByVendor[i]} failed`)
            }

        }
        console.log(vendorsIDs)
        console.log(vendorsNames)
        //console.log(objectComponent)

        //console.log(soldByVendor)

        //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(itemID/256)}/${itemID}.json`)



        //console.log(sell2)

    }
}
