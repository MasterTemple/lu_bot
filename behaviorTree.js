//const behaviorParameters = require(`./search/BehaviorParameter.json`)
const behaviorParameters = require(`./search/fullSortedBehaviorParameter.json`)

function getKids(behaviorID){
    var tempArray = behaviorParameters.table.filter(function (el) {
        return el.behaviorID == behaviorID
    });
    console.log(tempArray)
    for(var n=0;n<9;n++) {
        if (tempArray[0][`behavior ${n}`] != undefined) {
            console.log(`I HAVE KIDS`)
            getKids(tempArray[0][`behavior ${n}`])
        }
    }

    return tempArray

}


try{
    (getKids(4314))
    //console.log()
}catch(e){
    console.log(e)
}
