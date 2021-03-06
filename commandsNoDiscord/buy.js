module.exports = {
    name: ['buyid'],
    description: 'Find Vendors that sell a certain item',
    args: true,
    use: `buyid [id]`,
    example: [`buyid 7415`],
    execute(args) {
        var data = {}
        var itemID = parseInt(args[0])
        data.itemID = itemID

        var item = require(`./../objects/0/${Math.floor(itemID/256)}/${itemID}.json`);
        var type = item.type
        data.type = type
        if(type == `Loot`){
            const LootMatrixIndex = require(`./../search/LootMatrixIndex.json`)
            var LootTable
            try{
                LootTable = require(`./../tables/LootTable/groupBy/itemid/${Math.floor(itemID / 256)}/${itemID}.json`)
                data.isSoldByVendor = true

            }catch{
                const func = require(`./item.js`);
                var returnData = func.execute([itemID]);
                if(returnData.commendationCost != null) {
                    data.isSoldByVendor = true
                    //data.commendationVendorID = 13806
                    //data.commendationVendorName = `Commendation Vendor`
                    //data.commendationVendorDisplayName = `Honor Accolade - Commendation Vendor`
                    data.commendationVendor = []
                    var object = {
                        ID: 13806,
                        Name: `Commendation Vendor`,
                        DisplayName: `Honor Accolade - Commendation Vendor`
                    }
                    data.commendationVendor.push(object)

                }else{
                    data.isSoldByVendor = false
                }

                // console.log(returnData)
                let information = {
                    ...returnData,
                    ...data
                };

                return information
                //
                // return data
            }
            const LootMatrix = require(`./../search/LootMatrix.json`)
            const objectComponent = require(`./../objects/groupBy/component/16.json`)
            const VendorComponent = require(`./../search/VendorComponent.json`)
            // //console.log(`len ${LootTable["elements"].length}`)
            var soldByVendor = []
            var vendorsIDs = []
            var vendorsNames = []
            var lootTableIndexes = []
            var lootMatrixIndexes = []


            //for(let i=0;i<)

            // //console.log(LootMatrixIndex["table"])
            for(let i=0;i<LootTable["elements"].length;i++) {
                lootTableIndexes.push(LootTable["elements"][i].LootTableIndex)
            }
            //for(let i=0;i<LootMatrixIndex["table"].length;i++){

            // console.log(`lootTableIndexes`)
            // console.log(lootTableIndexes)


            //I NEED TO CONVERT LOOTTABLEINDEX T0 LOOTMATRIXINDEX


            // //console.log(lootTableIndexes.length)
            // //console.log(LootMatrix.table)
            // //console.log(LootMatrix.table.find(a => a.ids.includes("691")))

            for(let i =0; i < lootTableIndexes.length;i++){
                var value = lootTableIndexes[i]
                // //console.log(value)

                //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
                //var ans = getKeyByValue(objectComponent, )
                // //console.log(i)

                try{
                    // //console.log(LootMatrix.table.find(a => a.LootTableIndexes == value))
                    //lootMatrixIndexes.push(LootMatrix.table.find(a => a.ids.includes(value)).LootMatrixIndex)
                    // //console.log(value)
                    // //console.log(LootMatrix.table.find(a => a.ids.includes(`${value}`)))
                    lootMatrixIndexes.push(LootMatrix.table.find(a => a.ids.includes(`${value}`)).LootMatrixIndex)
                }catch(e){
                    // //console.log(e)
                    // //console.log(lootTableIndexes[i])
                }
            }
            // console.log(`lootMatrixIndexes`)

            // console.log(lootMatrixIndexes)


            //I NEED TO CONVERT LOOTTABLEINDEX T0 LOOTMATRIXINDEX



            for(let i=0;i<lootMatrixIndexes.length;i++) {

                //[lootTableIndexes[i]]
                //if(LootMatrixIndex["table"].inNPCEditor == 1){
                // if(LootMatrixIndex.table.find(a => a.LootMatrixIndex == lootMatrixIndexes[i])){
                var check =LootMatrixIndex.table.find(a => a.LootMatrixIndex == lootMatrixIndexes[i]).inNPCEditor
                // //console.log(lootMatrixIndexes[i], check)
                if(check==1){
                    // //console.log(LootMatrixIndex["table"][i].LootMatrixIndex, 1)
                    soldByVendor.push(parseInt(lootMatrixIndexes[i]))
                } else{
                    // //console.log(LootMatrixIndex["table"][i].LootMatrixIndex, 0)
                }
            }
            // console.log(`soldByVendor`)
            // console.log(soldByVendor)

            var maybeThisOne = []

            //for(let i=0; i < soldByVendor.length;i++){
            //    maybeThisOne.push(soldByVendor[i])
            //}
            //adds burky who belongs but also adds mr ree

            for(let i =0; i < soldByVendor.length;i++){
                //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
                //var ans = getKeyByValue(objectComponent, )
                // //console.log(i)

                try{
                    var matched = (VendorComponent.table.find(a => a.LootMatrixIndex == soldByVendor[i]))

                    // //console.log(matched.ids.length)
                    for(var h=0;h<matched.ids.length;h++){
                        // //console.log(matched.ids[h])
                        maybeThisOne.push(matched.ids[h])
                    }
                    //vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)
                    //vendorsNames.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).name)
                }catch(e){
                    // console.log(e)
                    // //console.log(`${soldByVendor[i]} failed`)
                }

            }

            // console.log(`right before component registry ${maybeThisOne}`)

            const ComponentRegistry = require(`./../search/ComponentRegistry.json`)
            for(let i =0; i < maybeThisOne.length;i++){
                //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(value/256)}/${value}.json`)
                //var ans = getKeyByValue(objectComponent, )
                // //console.log(i)
                try{
                    // // console.log(objectComponent.table.find(a => a.comp_val == soldByVendor[i]))
                    // vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)
                    // vendorsNames.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).name)

                    // //console.log(objectComponent.table.find(a => a.comp_val == maybeThisOne[i]))
                    //vendorsIDs.push(objectComponent.table.find(a => a.comp_val == maybeThisOne[i]).id)
                    //vendorsNames.push(objectComponent.table.find(a => a.comp_val == maybeThisOne[i]).name)

                    // //console.log(ComponentRegistry.table.find(a => a.component_id == maybeThisOne[i]))
                    vendorsIDs.push(ComponentRegistry.table.find(a => a.component_id == maybeThisOne[i]).id)

                    // //console.log(ComponentRegistry.table.find(a => a.component_id == soldByVendor[i]))
                    vendorsIDs.push(objectComponent.table.find(a => a.comp_val == soldByVendor[i]).id)

                    //vendorsIDs.push(ComponentRegistry.table.find(a => a.component_id == soldByVendor[i]).id)


                    //vendorsNames.push(ComponentRegistry.table.find(a => a.component_id == maybeThisOne[i]))
                }catch(e){
                    // //console.log(e)
                    // //console.log(`${soldByVendor[i]} failed`)
                }

            }
            // console.log(`maybeThisOne`)
            // console.log(maybeThisOne)
            // console.log(`vendorsIDs`)
            // console.log(vendorsIDs)
            // console.log(`vendorsNames`)
            // console.log(vendorsNames)
            var msg = ``
            data.vendors = []
            for(var i =0;i<vendorsIDs.length;i++){

                try{
                    var item = require(`./../objects/0/${Math.floor(vendorsIDs[i] / 256)}/${vendorsIDs[i]}.json`);
                    var itemName = item.displayName
                    //msg=`${msg}\n${vendorsNames[i]}: [${vendorsIDs[i]}]`
                    if (itemName != null) {
                        //data.vendorNames.push(itemName)
                        //data.vendorIDs.push(vendorsIDs[i])
                        var obj = {
                            vendorName: item.name,
                            vendorDisplayName: item.displayName,
                            vendorID: vendorsIDs[i]
                        }
                        data.vendors.push(obj)
                        msg = `${msg}\n${itemName}: [${vendorsIDs[i]}]`
                    }
                }catch{}

            }
            //message.channel.send(msg)

            var msg2 = ``
            for(var i =0;i<maybeThisOne.length;i++){
                msg2=`${msg2}\n${vendorsNames[i]}: [${vendorsIDs[i]}]`
            }

            // const func = require(`./item.js`);
            // var newARG = [itemID, "FROMBUYITEM",msg,vendorsIDs.length]
            //
            // func.execute(message, newARG);





            const func = require(`./item.js`);
            var newARG = [itemID, "FROMBUYITEM", msg, vendorsIDs.length]
            data.numberOfVendors = vendorsIDs.length
            // //console.log(msg)
            // //console.log(newARG)
            //return data
            // //console.log(itemID, "FROMBUYITEM", msg, vendorsIDs.length)
            var returnData = func.execute(newARG);
            // console.log(returnData)
            if(data.vendors.length == 0){
                data.commendationVendor = []
                var object = {
                    ID: 13806,
                    Name: `Commendation Vendor`,
                    DisplayName: `Honor Accolade - Commendation Vendor`
                }
                data.commendationVendor.push(object)
            }
            let information = {
                ...returnData,
                ...data
            };

            return information

        }else if(type == `LEGO brick`) {
            const func = require(`./brick.js`);
            const brickVendorsIDs = [2264, 3921, 7429, 9705, 9706, 9707, 13379]
            var msg = ``


            for (var i = 0; i < brickVendorsIDs.length; i++) {
                var id = brickVendorsIDs[i]
                var folder_loc = Math.floor(id / 256)
                var item_loc = id
                var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
                var vendor = item.components["16"]

                var soldObjects = require(`./../tables/VendorComponent/0/${vendor}.json`)
                var lootMatrixIndex = soldObjects.LootMatrixIndex
                var lootMatrixTable = require(`./../tables/LootMatrix/${Math.floor(lootMatrixIndex / 256)}/${lootMatrixIndex}.json`)
                var lootTableIndex = lootMatrixTable["elements"][0].LootTableIndex
                var lootTable = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootTableIndex / 256)}/${lootTableIndex}.json`)
                // //console.log(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(lootTableIndex/256)}/${lootTableIndex}.json`)
                // //console.log(lootTable["elements"])
                for (var k = 0; k < lootTable["elements"].length; k++) {
                    // //console.log(lootTable["elements"][k].itemid)
                    if ((lootTable["elements"][k].itemid) == itemID) {
                        // console.log(brickVendorsIDs[i])
                        // console.log(true)
                        data.brickVendorID = brickVendorsIDs[i]
                        var vendorName = require(`./../objects/0/${Math.floor(brickVendorsIDs[i]/256)}/${brickVendorsIDs[i]}.json`);

                        data.brickVendorName = vendorName.name
                        data.brickVendorDisplayName = vendorName.displayName

                    }
                }



            }
            //var newARG = [itemID, "FROMBUYITEM", msg, brickVendorsIDs.length]
            // //console.log(msg)
            var returnData = func.execute([itemID]);

            let information = {
                ...returnData,
                ...data
            };

            return information

        }else{
            // console.log(`You cannot purchase this object.`)
        }


        // //console.log(msg2)
        //message.channel.send(msg2)

        // //console.log(objectComponent)

        // //console.log(soldByVendor)

        //var LootMatrix = require(`./../tables/LootMatrix/${Math.floor(itemID/256)}/${itemID}.json`)



        // //console.log(sell2)

    }
}
