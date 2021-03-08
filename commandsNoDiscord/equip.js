module.exports = {
    name: ['slot'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `slot [args]`,
    example: [`slot 12809`],
    execute(args) {
        var data = {}
        data.table = []
        var itemID = args[0]
        var subItemsArray = []
        var allItems = [itemID]
        var equipLocation = []
        var equipLocationNames = []
        function getEquipLocationOG(id){
            let item = require(`./../objects/0/${Math.floor(parseInt(id)/256)}/${parseInt(id)}.json`);
            //console.log(`./../objects/0/${Math.floor(id/256)}/${id}.json`)
            let itemComponentValue = item.components["11"]
            //var itemComponent = require(`./../objects/groupBy/component/${itemComponent}.json`);
            let itemComponent = require(`./../tables/ItemComponent/${Math.floor(itemComponentValue / 256)}/${itemComponentValue}.json`);
            //console.log(itemComponent.subItems)
            //console.log(itemComponent.equipLocation)
            equipLocation.push(itemComponent.equipLocation)
            //console.log(itemComponent.equipLocation)
            //var lootMatrixIndexValue = itemComponent.LootMatrixIndex
            try{
                var subItemsNeat = itemComponent.subItems.replace(/\s/g, '')
                // var subItemsArray = itemComponent.subItems.split(`,`); //each space is a new argument
                subItemsArray = subItemsNeat.split(`,`); //each space is a new argument
                for(var x=0;x<subItemsArray.length;x++){
                    allItems.push(subItemsArray[x])
                }
            }catch{

            }
        }

        function getEquipLocation(id){
            let item = require(`./../objects/0/${Math.floor(parseInt(id)/256)}/${parseInt(id)}.json`);
            //console.log(`./../objects/0/${Math.floor(id/256)}/${id}.json`)
            let itemComponentValue = item.components["11"]
            //var itemComponent = require(`./../objects/groupBy/component/${itemComponent}.json`);
            let itemComponent = require(`./../tables/ItemComponent/${Math.floor(itemComponentValue / 256)}/${itemComponentValue}.json`);
            //console.log(itemComponent.subItems)
            //console.log(itemComponent.equipLocation)
            equipLocation.push(itemComponent.equipLocation)
            //console.log(itemComponent.equipLocation)
        }

        //console.log(subItemsArray)

        getEquipLocationOG(itemID)
        //console.log(subItemsArray)
        for(var i=0;i<subItemsArray.length;i++){
            getEquipLocation(parseInt(subItemsArray[i]))
            //console.log(equipLocation)

        }

        //console.log(equipLocation)


        for(var i=0;i<equipLocation.length;i++){
            if(equipLocation[i] == 'special_l'){
                equipLocationNames.push('Left Hand')
            } else if(equipLocation[i] == 'special_r'){
                equipLocationNames.push('Right Hand')
            } else if(equipLocation[i] == 'hair'){
                equipLocationNames.push('Headgear')
            } else if(equipLocation[i] == 'clavicle'){
                equipLocationNames.push('Neck/Back')
            } else if(equipLocation[i] == 'chest'){
                equipLocationNames.push('Torso')
            } else if(equipLocation[i] == 'legs'){
                equipLocationNames.push('Pants')
            } else{
                equipLocationNames.push(equipLocation[i])
            }

        }
        //console.log(allItems)
        //console.log(equipLocationNames)
        var obj = {
            allItems: allItems,
            equipLocationNames: equipLocationNames,
            equipLocation: equipLocation
        }
        return obj

    }
}
