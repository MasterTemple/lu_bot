module.exports = {
    name: ['buyid'],
    description: 'Find Vendors that sell a certain item',
    args: true,
    use: `buyid [id]`,
    example: [`buyid 7415`],
    execute(message, args) {
        var itemID = parseInt(args[0])
        const LootMatrixIndex = require(`./../search/LootMatrixIndex.json`)
        const LootTable = require(`./../tables/LootTable/groupBy/itemid/${Math.floor(itemID/256)}/${itemID}.json`)
        const LootMatrix = require(`./../search/LootMatrix.json`)
        const objectComponent = require(`./../objects/groupBy/component/16.json`)
        const VendorComponent = require(`./../search/VendorComponent.json`)
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
        //console.log(LootMatrix.table.find(a => a.ids.includes("691")))

        for(let i =0; i < lootTableIndexes.length;i++){
            var value = lootTableIndexes[i]
            //console.log(value)

            //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
            //var ans = getKeyByValue(objectComponent, )
            //console.log(i)

            try{
                //console.log(LootMatrix.table.find(a => a.LootTableIndexes == value))
                //lootMatrixIndexes.push(LootMatrix.table.find(a => a.ids.includes(value)).LootMatrixIndex)
                //console.log(value)
                //console.log(LootMatrix.table.find(a => a.ids.includes(`${value}`)))
                lootMatrixIndexes.push(LootMatrix.table.find(a => a.ids.includes(`${value}`)).LootMatrixIndex)
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

var maybeThisOne = []

        //for(let i=0; i < soldByVendor.length;i++){
        //    maybeThisOne.push(soldByVendor[i])
        //}
        //adds burky who belongs but also adds mr ree

        for(let i =0; i < soldByVendor.length;i++){
            //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
            //var ans = getKeyByValue(objectComponent, )
            //console.log(i)

            try{
                var matched = (VendorComponent.table.find(a => a.LootMatrixIndex == soldByVendor[i]))

                //console.log(matched.ids.length)
                for(var h=0;h<matched.ids.length;h++){
                    //console.log(matched.ids[h])
                    maybeThisOne.push(matched.ids[h])
                }
                //vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)
                //vendorsNames.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).name)
            }catch(e){
                console.log(e)
                //console.log(`${soldByVendor[i]} failed`)
            }

        }

console.log(`right before component registry ${maybeThisOne}`)

const ComponentRegistry = require(`./../search/ComponentRegistry.json`)
        for(let i =0; i < maybeThisOne.length;i++){
            //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
            //var ans = getKeyByValue(objectComponent, )
            //console.log(i)
            try{
                // console.log(objectComponent.table.find(a => a.comp_val == soldByVendor[i]))
                // vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)
                // vendorsNames.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).name)

                //console.log(objectComponent.table.find(a => a.comp_val == maybeThisOne[i]))
                //vendorsIDs.push(objectComponent.table.find(a => a.comp_val == maybeThisOne[i]).id)
                //vendorsNames.push(objectComponent.table.find(a => a.comp_val == maybeThisOne[i]).name)

                //console.log(ComponentRegistry.table.find(a => a.component_id == maybeThisOne[i]))
                vendorsIDs.push(ComponentRegistry.table.find(a => a.component_id == maybeThisOne[i]).id)

                //console.log(ComponentRegistry.table.find(a => a.component_id == soldByVendor[i]))
                vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)

                //vendorsIDs.push(ComponentRegistry.table.find(a => a.component_id == soldByVendor[i]).id)


                //vendorsNames.push(ComponentRegistry.table.find(a => a.component_id == maybeThisOne[i]))
            }catch(e){
                //console.log(e)
                    //console.log(`${soldByVendor[i]} failed`)
            }

        }
        console.log(`maybeThisOne`)
        console.log(maybeThisOne)
        console.log(`vendorsIDs`)
        console.log(vendorsIDs)
        console.log(`vendorsNames`)
        console.log(vendorsNames)
        var msg = ``
        for(var i =0;i<vendorsIDs.length;i++){

            try{
                var item = require(`./../objects/0/${Math.floor(vendorsIDs[i] / 256)}/${vendorsIDs[i]}.json`);
                var itemName = item.displayName
                //msg=`${msg}\n${vendorsNames[i]}: [${vendorsIDs[i]}]`
                if (itemName != null) {
                    msg = `${msg}\n${itemName}: [${vendorsIDs[i]}]`
                }
            }catch{}

        }
        //message.channel.send(msg)

        var msg2 = ``
        for(var i =0;i<maybeThisOne.length;i++){
            msg2=`${msg2}\n${vendorsNames[i]}: [${vendorsIDs[i]}]`
        }

        const func = require(`./item.js`);
        var newARG = [itemID, "FROMBUYITEM",msg,vendorsIDs.length]

        func.execute(message, newARG);





        //console.log(msg2)
        //message.channel.send(msg2)

        //console.log(objectComponent)

        //console.log(soldByVendor)

        //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(itemID/256)}/${itemID}.json`)



        //console.log(sell2)

    }
}
