
var fs = require('fs');
const behaviorParameters = require(`./fullUnsortedBehaviorParameter.json`)
//this was importing the old file
var data = {}
data.table = []
//219782
//42450
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
        object[tempArray[n].paramterID] =tempArray[n].value
    }
    data.table.push(object)

}


fs.writeFile (`fullSortedBehaviorParameter1.json`, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);

