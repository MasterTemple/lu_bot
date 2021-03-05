module.exports = {
    name: ['slot'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `slot [args]`,
    example: [`slot 12809`],
    execute(message, args) {
        var data = {}
        data.table = []
        var itemID = args[0]
        var subItemsArray = []
        var equipLocation = []

        function getEquipLocationOG(id){
            let item = require(`./../objects/0/${Math.floor(id/256)}/${id}.json`);
            //console.log(`./../objects/0/${Math.floor(id/256)}/${id}.json`)
            let itemComponentValue = item.components["11"]
            //var itemComponent = require(`./../objects/groupBy/component/${itemComponent}.json`);
            let itemComponent = require(`./../tables/ItemComponent/${Math.floor(itemComponentValue / 256)}/${itemComponentValue}.json`);
            //console.log(itemComponent.subItems)
            //console.log(itemComponent.equipLocation)
            equipLocation.push(itemComponent.equipLocation)
            //console.log(itemComponent.equipLocation)
            //var lootMatrixIndexValue = itemComponent.LootMatrixIndex
            var subItemsNeat = itemComponent.subItems.replace(/\s/g, '')
            // var subItemsArray = itemComponent.subItems.split(`,`); //each space is a new argument
            subItemsArray = subItemsNeat.split(`,`); //each space is a new argument
        }

        function getEquipLocation(id){
            let item = require(`./../objects/0/${Math.floor(id/256)}/${id}.json`);
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
        console.log(subItemsArray)
        for(var i=0;i<subItemsArray.length;i++){
            getEquipLocation(parseInt(subItemsArray[i]))
            //console.log(equipLocation)

        }

        console.log(equipLocation)

    }
}
