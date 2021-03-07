//const behaviorParameters = require(`./search/BehaviorParameter.json`)
const behaviorParameters = require(`./search/fullSortedBehaviorParameter.json`)
const behaviorTemplate = require(`./search/behaviorTemplate.json`)
const ObjectSkills = require(`./search/ObjectSkills.json`)
var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior","behavior 0","behavior 1","behavior 2","behavior 3","behavior 4","behavior 5","behavior 6","behavior 7","behavior 8","behavior 9","bahavior 2"]
var numsOfActions = 0
var behaviorActions = []
var finalObject = {}
finalObject.table = []
var chargeUp = false
var alreadyUsedProjectiles = []
var ogValues = []
var maxDuration
var ogKeys = []
var og = new Map()
// var ogObj = {}
// ogObj.table = []
// var doubleJumpSmash = 0
// var singleJumpSmash = 0
// var dmg = []
function getKids(behaviorID, ogVal, parentName){
    var tempArray = behaviorParameters.table.filter(function (el) {
        return el.behaviorID == behaviorID
    });

    //console.log(behaviorActions)
    //console.log(tempArray[0])
    //console.log(Object.keys(tempArray[0]));
    //console.log(Object.keys(tempArray[0]).length);
    //console.log(Object.keys(tempArray[0])[0]);
    //console.log(Object.keys(tempArray[0]).length)
    //console.log(behaviorID)
    // if(parseInt(behaviorID) == 21216) {
    //     console.log(tempArray[0])
    //
    // }
    //console.log(tempArray[0].max_duration)
    //console.log(behaviorTemplate.table.find(a => parseInt(a.behaviorID) == parseInt(behaviorID)))

    if(behaviorTemplate.table.find(a => parseInt(a.behaviorID) == parseInt(behaviorID)).templateID == `4`){
        console.log(`projectile attack`)
        //console.log(tempArray[0].LOT_ID)
        //console.log(ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID)
        var skillBehavior = require(`./tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID}.json`)
        console.log(skillBehavior.behaviorID)
        alreadyUsedProjectiles.push(skillBehavior.behaviorID)
        getKids(skillBehavior.behaviorID, false, `projectile`)
        //projectileDMG.push(skillBehavior.behaviorID)

    }
    if(behaviorTemplate.table.find(a => parseInt(a.behaviorID) == parseInt(behaviorID)).templateID == `43`){
        chargeUp = true
        //projectileDMG.push(skillBehavior.behaviorID)

    }

    if(tempArray[0].max_duration != undefined){
        //console.log(`DURATION`)
        //console.log(tempArray[0].max_duration)
        maxDuration = tempArray[0].max_duration
    }

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

                    getKids((Object.values(tempArray[0])[i]),false,parentName)
                }
                if(ogVal){
                    ogValues.push(Object.values(tempArray[0])[i])
                }
            }else{
                //console.log(`${i}: ${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]`)
                if(Object.keys(tempArray[0])[i] == "max damage"){
                    //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //console.log(parentName)
                    try{
                        if (parentName == `ground_action`) {
                            dmg.push(Object.values(tempArray[0])[i])
                            //console.log(tempArray[0])
                        } else if (parentName == `jump_action`) {
                            singleJumpSmash = (Object.values(tempArray[0])[i])
                        } else if (parentName == `double_jump_action`) {
                            doubleJumpSmash = (Object.values(tempArray[0])[i])
                        } else if (parentName == `projectile`) {
                            projectileDMG.push(Object.values(tempArray[0])[i])
                        } else if (parentName == `mael`) {
                            dmg.push(Object.values(tempArray[0])[i])
                        } else {
                            console.log(parentName)
                        }
                    }catch{

                    }
                    //dmg.push(Object.values(tempArray[0])[i])

                }
                //console.log(Object.keys(tempArray[0]))
                // if(tempArray[0].templateID == "4" ) {
                //     //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                //     //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                //     //console.log(parentName)
                //
                //     console.log(`Projectile attack: ${Object.values(tempArray[0])[i]}`)
                //
                // }

                if(Object.keys(tempArray[0])[i] == "imag"){
                    //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //console.log(parentName)
                    try{
                            //console.log(`Imag: ${Object.values(tempArray[0])[i]}`)
                    }catch{

                    }
                }
                if(Object.keys(tempArray[0])[i] == "imagination"){


                    if(parseInt(Object.values(tempArray[0])[i]) < 0){
                        chargeUpImaginationCost.push(Object.values(tempArray[0])[i]*-1)
                    }
                    // if(parseInt(Object.values(tempArray[0])[i]) > 0){
                    //     chargeUpImaginationGain.push(Object.values(tempArray[0])[i])
                    // }

                    //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //console.log(parentName)
                    try{
                        //console.log(`Imagination: ${Object.values(tempArray[0])[i]}`)
                    }catch{

                    }
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

//var behaviorID = [1957, 1956]
//var behaviorID = [4245, 4253, 21267, 11183]//powerjouster
//var behaviorID = [11183, 10884]//daredevil
// var behaviorID = [23451]//adventurer 3
//var behaviorID = [23302]//adventurer 2
//var behaviorID = [4244,4254,22316,11183,]//wormholer
//var behaviorID = [4244,4254,22316,11183,]//anything
//var behaviorID = [11183, 10884]//daredevil
//var behaviorID = [23153]//adventurer 1
var behaviorID = [15556]//adventurer 3
//var behaviorID = [1897, 1898, 15556]


for(var k=0;k<behaviorID.length;k++){
    console.log(behaviorID.length)
    var ogObj = {}
    ogObj.table = []
    var doubleJumpSmash = -1
    var singleJumpSmash = -1
    var dmg = []
    var projectileDMG = []
    var tempParent = behaviorID[k]
    var chargeUpImaginationCost = []
    var chargeUpImaginationGain = []
    console.log(`--${tempParent}--`)
    try {
        //4314 = basic short sword
        //13388 samurai sword attack
        //10312 daredevil guns
        getKids(tempParent, true, `parent`)
        //getKids(4288)
        //console.log(ogValues)
        //console.log(ogKeys)
        //console.log(og)
        //console.log(og.size)
        //for(var x=0;x<og.size;x++){
        //    console.log(og[x])
        //}
        for (var x = 0; x < ogObj.table.length; x++) {
            //console.log(ogObj.table[x])
        }
        try{
            var ground = ogObj.table.find(a => a.name == `ground_action`)
            getKids(ground.value, false, ground.name)
        }catch{}
        try{
            var single = ogObj.table.find(a => a.name == `jump_action`)
            getKids(single.value, false, single.name)
        }catch{}
        try{
            var double = ogObj.table.find(a => a.name == `double_jump_action`)
            getKids(double.value, false, double.name)
        }catch{}

        try{
            getKids(tempParent,false, `mael`)
        }catch{}
        try{
            getKids(tempParent,false, `projectile`)
        }catch{}

        //console.log(numsOfActions)
        ////getKids(17760, false)
        //console.log(numsOfActions)
        //getKids(4290)
        //console.log(numsOfActions)
        // if(dmg != []){
        //     console.log(`dmg:${dmg.join(`+`)}`)
        // }
        // if(doubleJumpSmash != -1){
        //     console.log(`doubleJumpSmash:${doubleJumpSmash}`)
        // }
        // if(singleJumpSmash != -1){
        //     console.log(`singleJumpSmash:${singleJumpSmash}`)
        // }

        if(dmg != [] && singleJumpSmash != -1 && doubleJumpSmash != -1){
            var obj = {
                //projectileDamage: projectileDMG.join(`+`),
                damageCombo: dmg.join(`+`),
                doubleJumpSmash: doubleJumpSmash,
                singleJumpSmash: singleJumpSmash,
                chargeUpImaginationCost: chargeUpImaginationCost,
                newProjectileDamage: [],
                maxDuration: maxDuration
            }
            finalObject.table.push(obj)
        }

        //chargeUpImaginationGain: chargeUpImaginationGain
        // double_jump_action
        // falling_action
        // ground_action
        // jetpack_action
        // jump_action


    } catch (e) {
        console.log(e)
    }
}

//console.log(finalObject)
console.log(finalObject.table[0])
console.log(alreadyUsedProjectiles)



function getProjectileDamage(behaviorID){
    var tempArray = behaviorParameters.table.filter(function (el) {
        return el.behaviorID == behaviorID
    });


    if(tempArray[0] != undefined){
        for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
            //console.log(`----------------`)
            //console.log(tempArray[0])




            //console.log(`I HAVE KIDS`)
            //console.log((Object.keys(tempArray[0])[i]),(Object.values(tempArray[0])[i]))
            //console.log(Object.keys(tempArray[0])[i])
            if(actions.includes(Object.keys(tempArray[0])[i])){
                //console.log(true)

                //console.log(`projectile attack`)
                //console.log(tempArray[0].LOT_ID)
                //console.log(ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID)
                //console.log(tempArray[0].action_true)
                try{

                    var skillBehavior = require(`./tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID}.json`)
                    console.log(skillBehavior.behaviorID)
                    alreadyUsedProjectiles.push(skillBehavior.behaviorID)
                    getProjectileDamage(skillBehavior.behaviorID)
                }catch{
                    // var skillBehavior = require(`./tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID}.json`)
                    // console.log(skillBehavior.behaviorID)
                    // alreadyUsedProjectiles.push(skillBehavior.behaviorID)

                    if(actions.includes(Object.keys(tempArray[0])[i])){
                        //console.log(true)
                        getProjectileDamage(Object.values(tempArray[0])[i])
                    }

                }

                //console.log(`${i}: ${Object.keys(tempArray[0])[i]} [${behaviorID}] = ACTION [${(Object.values(tempArray[0])[i])}]`)
                numsOfActions++
                if(Object.values(tempArray[0])[i] != `0` && behaviorActions.includes(Object.values(tempArray[0])[i]) == false){
                    behaviorActions.push((Object.values(tempArray[0])[i]))

                    getProjectileDamage((Object.values(tempArray[0])[i]))
                }

            }else{
                //console.log(`${i}: ${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]`)
                //console.log(tempArray[0].behaviorID)
                if(Object.keys(tempArray[0])[i] == "max damage"){
                    //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                    //console.log(parentName)
                    try{
                        finalObject.table[0].newProjectileDamage.push(Object.values(tempArray[0])[i])
                    }catch(e){
                        console.log(e)
                    }
                    //dmg.push(Object.values(tempArray[0])[i])

                }




            }
            //getKids((Object.values(tempArray[0])[i]))
        }
        //getKids((Object.values(tempArray[0])[i]))
    }


    return tempArray

}




var newProjectileDamage = []
for(var k=0;k<alreadyUsedProjectiles.length;k++){
    getProjectileDamage(alreadyUsedProjectiles[k])
}




//finalObject.table.push(obj)
//console.log(finalObject.table[0])
//var string = finalObject.table[0].newProjectileDamage.join(`+`)
//console.log(string)
// var obj ={
//     projectileDamage: string
// }
finalObject.table[0].hasChargeUp = chargeUp
if(finalObject.table[0].hasChargeUp) {
    var string = finalObject.table[0].newProjectileDamage
    //console.log(string[1])
    finalObject.table[0].chargeUpDamage = string[1]
    //console.log(string.splice(1,1))
    //console.log(string)
    string.splice(1,1)
    finalObject.table[0].projectileDamage = string.join(`+`)
}else{
    finalObject.table[0].projectileDamage = finalObject.table[0].newProjectileDamage.join(`+`)
}


console.log(finalObject.table)
