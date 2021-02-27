
var fs = require('fs');
const behaviorParameters = require(`./search/BehaviorParameter.json`)
//this was importing the old file
var data = {}
data.table = []

for(var i=0;i<42450;i++){

    var object = {
        behaviorID: i
    }
    var tempArray = behaviorParameters.Sheet1.filter(function (el) {
        return el.behaviorID == i
    });

    for(var n=0;n<tempArray.length;n++){
        //console.log(tempArray[n].parameterID)
        //console.log(tempArray[n].value)
        object[tempArray[n].parameterID] =tempArray[n].value
    }
    data.table.push(object)

}


fs.writeFile (`skillPaths2.json`, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);

