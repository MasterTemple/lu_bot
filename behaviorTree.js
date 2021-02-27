const behaviorParameters = require(`./search/BehaviorParameter.json`)

function getKids(behaviorID){
    var tempArray = behaviorParameters.table.filter(function (el) {
        return el.behaviorID == behaviorID
    });
    //console.log(tempArray)
    if(tempArray[0]["behavior 1"] != undefined){
        console.log(`I HAVE KIDS`)
        getKids(tempArray[0]["behavior 1"])
    }
    return tempArray

}


try{
    console.log(getKids(1957))
    //console.log()
}catch(e){
    console.log(e)
}
