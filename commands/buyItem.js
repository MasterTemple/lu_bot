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
        const LootMatrix = require(`./../search/LootMatrix.json`)
        const objectComponent = require(`./../objects/groupBy/component/16.json`)
        //console.log(`len ${LootTable["elements"].length}`)
        var soldByVendor = []
        var vendorsIDs = []
        var vendorsNames = []
        var lootTableIndexes = []
        var lootMatrixIndexes = []


        //for(let i=0;i<)

        //console.log(LootMatrixIndex["table"])
         for(let i=0;i<LootTable["elements"].length;i++) {
             lootTableIndexes.push(LootTable["elements"][i].LootTableIndex)
         }
             //for(let i=0;i<LootMatrixIndex["table"].length;i++){

        console.log(`lootTableIndexes`)
        console.log(lootTableIndexes)


        //I NEED TO CONVERT LOOTTABLEINDEX T0 LOOTMATRIXINDEX

        //console.log(lootTableIndexes.length)
        //console.log(LootMatrix.table)

        for(let i =0; i < lootTableIndexes.length;i++){
            var value = parseInt(lootTableIndexes[i])
            //console.log(value)

            //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
            //var ans = getKeyByValue(objectComponent, )
            //console.log(i)

            try{
                //console.log(LootMatrix.table.find(a => a.LootTableIndexes == value))
                lootMatrixIndexes.push(LootMatrix.table.find(a => a.LootTableIndexes == value).LootMatrixIndex)
            }catch(e){
                //console.log(e)
                //console.log(lootTableIndexes[i])
            }
        }
        console.log(`lootMatrixIndexes`)

        console.log(lootMatrixIndexes)


        //I NEED TO CONVERT LOOTTABLEINDEX T0 LOOTMATRIXINDEX



        for(let i=0;i<lootMatrixIndexes.length;i++) {

            //[lootTableIndexes[i]]
            //if(LootMatrixIndex["table"].inNPCEditor == 1){
            // if(LootMatrixIndex.table.find(a => a.LootMatrixIndex == lootMatrixIndexes[i])){
            var check =LootMatrixIndex.table.find(a => a.LootMatrixIndex == lootMatrixIndexes[i]).inNPCEditor
            //console.log(lootMatrixIndexes[i], check)
            if(check==1){
                //console.log(LootMatrixIndex["table"][i].LootMatrixIndex, 1)
                soldByVendor.push(parseInt(lootMatrixIndexes[i]))
            } else{
                //console.log(LootMatrixIndex["table"][i].LootMatrixIndex, 0)
            }
        }
        console.log(`soldByVendor`)
        console.log(soldByVendor)





        for(let i =0; i < soldByVendor.length;i++){
            //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
            //var ans = getKeyByValue(objectComponent, )
            //console.log(i)
            try{
                vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).name)
                vendorsNames.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)
            }catch(e){
                //console.log(e)
                    //console.log(`${soldByVendor[i]} failed`)
            }

        }

        console.log(`vendorsIDs`)
        console.log(vendorsIDs)
        console.log(`vendorsNames`)
        console.log(vendorsNames)
        //console.log(objectComponent)

        //console.log(soldByVendor)

        //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(itemID/256)}/${itemID}.json`)



        //console.log(sell2)

    }
}
