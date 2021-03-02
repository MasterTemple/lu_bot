// var fs = require(`fs`)
// var data = {}
// data.table = []
// for(var i =0;i<9;i++){
//     var jsonData = require(`./locale/Missions/${i}.json`)
//     console.log(jsonData)
//     for (var k = 0; k < 256; k++) {
//         try {
//             console.log((k+(256*i),jsonData[k + (256 * i)].name))
//             var object = {
//                 name: jsonData[k + (256 * i)].name,
//                 id: (k+(256*i))
//             }
//             data.table.push(object)
//
//         } catch {
//
//         }
//     }
// }
//
// fs.writeFile (`missionIDandName1.json`, JSON.stringify(data), function(err) {
//         if (err) throw err;
//         console.log('complete');
//     }
// );

//
// var fs = require(`fs`)
// var data = {}
// data.table = []
// for(var i =0;i<924;i++){
//     try{
//         var jsonData = require(`./tables/LootMatrix/${Math.floor(i / 256)}/${i}.json`)
//         //console.log(jsonData)
//         var arr = []
//         for (var k = 0; k < jsonData["elements"].length; k++) {
//             arr.push(jsonData["elements"][k].LootTableIndex)
//         }
//         try {
//             //console.log((k+(256*i),jsonData[k + (256 * i)].name))
//             //console.log(jsonData["elements"])
//
//             var object = {
//                 LootMatrixIndex: i,
//                 LootTableIndexes: arr
//             }
//             data.table.push(object)
//
//         } catch {
//
//         }
//     }catch{}
//
// }
//
// fs.writeFile (`lootmatrix2.json`, JSON.stringify(data), function(err) {
//         if (err) throw err;
//         console.log('complete');
//     }
// );


var fs = require(`fs`)
var data = {}
data.table = []
var jsonData = require(`./lootmatrix1.json`)

for(var i =0;i<924;i++){
    try{
        var LootMatrixIndex = (jsonData.table.find(a => a.LootMatrixIndex == i).LootMatrixIndex)


        for (var k = 0; k < jsonData["table"].length; k++) {
            var LootTableIndexes = jsonData["table"][i].LootTableIndexes[k]

            var object = {
                LootMatrixIndex: LootMatrixIndex,
                LootTableIndexes: LootTableIndexes
            }
            data.table.push(object)
        }

    }catch{}

}

fs.writeFile (`lootmatrixedit1.json`, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);
