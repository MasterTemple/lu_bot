var fs = require(`fs`)
var data = {}
data.table = []
for(var i =0;i<9;i++){
    var jsonData = require(`./locale/Missions/${i}.json`)
    console.log(jsonData)
    for (var k = 0; k < 256; k++) {
        try {
            console.log((k+(256*i),jsonData[k + (256 * i)].name))
            var object = {
                name: jsonData[k + (256 * i)].name,
                id: (k+(256*i))
            }
            data.table.push(object)

        } catch {

        }
    }
}

fs.writeFile (`missionIDandName1.json`, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);
