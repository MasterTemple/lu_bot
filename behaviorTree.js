//const behaviorParameters = require(`./search/BehaviorParameter.json`)
const behaviorParameters = require(`./search/fullSortedBehaviorParameter.json`)
var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior","behavior 0","behavior 1","behavior 2","behavior 3","behavior 4","behavior 5","behavior 6","behavior 7","behavior 8","behavior 9","bahavior 2"]
var numsOfActions = 0
var behaviorActions = []
var dmg = []
var ogValues = []
var ogKeys = []
var og = new Map()
var ogObj = {}
ogObj.table = []
var doubleJumpSmash
var singleJumpSmash
function getKids(behaviorID, ogVal){
    var tempArray = behaviorParameters.table.filter(function (el) {
        return el.behaviorID == behaviorID
    });

    console.log(behaviorActions)
    //console.log(tempArray[0])
    //console.log(Object.keys(tempArray[0]));
    //console.log(Object.keys(tempArray[0]).length);
    //console.log(Object.keys(tempArray[0])[0]);
    //console.log(Object.keys(tempArray[0]).length)
    if(tempArray[0] != undefined){
        for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
            //console.log(`----------------`)

            //console.log(`I HAVE KIDS`)
            //console.log((Object.keys(tempArray[0])[i]),(Object.values(tempArray[0])[i]))
            //console.log(Object.keys(tempArray[0])[i])
            if(actions.includes(Object.keys(tempArray[0])[i])){
                //console.log(`${i}: ${Object.keys(tempArray[0])[i]} [${behaviorID}] = ACTION [${(Object.values(tempArray[0])[i])}]`)
                numsOfActions++
                if(ogVal){
                    og.set((Object.keys(tempArray[0])[i]),(Object.values(tempArray[0])[i]))
                    ogValues.push(Object.values(tempArray[0])[i])
                    ogKeys.push(Object.keys(tempArray[0])[i])
                    var object = {
                        name: Object.keys(tempArray[0])[i],
                        value: Object.values(tempArray[0])[i]
                    }
                    ogObj.table.push(object)

                }
                else if(Object.values(tempArray[0])[i] != `0` && behaviorActions.includes(Object.values(tempArray[0])[i]) == false){
                    behaviorActions.push((Object.values(tempArray[0])[i]))

                    getKids((Object.values(tempArray[0])[i]))
                }
                if(ogVal){
                    ogValues.push(Object.values(tempArray[0])[i])
                }
            }else{
                //console.log(`${i}: ${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]`)
                if(Object.keys(tempArray[0])[i] == "max damage"){
                    //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //dmg.push(Object.values(tempArray[0])[i])

                }
            }
            //getKids((Object.values(tempArray[0])[i]))
        }
        //getKids((Object.values(tempArray[0])[i]))
    }
    //for(var n=0;n<9;n++) {
    //    if (tempArray[0][`behavior ${n}`] != undefined) {
    //        console.log(`I HAVE KIDS`)
    //        getKids(tempArray[0][`behavior ${n}`])
    //    }
    //}

    return tempArray

}


try{
    //4314 = basic short sword
    //13388 samurai sword attack
    //10312 daredevil guns
    getKids(13388, true)
    //getKids(4288)
    //console.log(ogValues)
    //console.log(ogKeys)
    //console.log(og)
    //console.log(og.size)
    //for(var x=0;x<og.size;x++){
    //    console.log(og[x])
    //}
    for(var x=0;x<ogObj.table.length;x++){
        console.log(ogObj.table[x])
    }



    console.log(numsOfActions)
    //getKids(17760, false)
    console.log(numsOfActions)
    //getKids(4290)
    //console.log(numsOfActions)
    console.log(dmg)
    console.log(doubleJumpSmash)
    console.log(singleJumpSmash)

    // double_jump_action
    // falling_action
    // ground_action
    // jetpack_action
    // jump_action


}catch(e){
    console.log(e)
}
