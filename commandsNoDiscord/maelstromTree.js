module.exports = {
    name: ['buyid'],
    description: 'Find Vendors that sell a certain item',
    args: true,
    use: `buyid [id]`,
    example: [`buyid 7415`],
    execute(args) {

//const behaviorParameters = require(`./search/BehaviorParameter.json`)
        const behaviorParameters = require(`./../search/fullSortedBehaviorParameter.json`)
        const behaviorTemplate = require(`./../search/behaviorTemplate.json`)
        const ObjectSkills = require(`./../search/ObjectSkills.json`)
        var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior", "behavior 0", "behavior 1", "behavior 2", "behavior 3", "behavior 4", "behavior 5", "behavior 6", "behavior 7", "behavior 8", "behavior 9", "bahavior 2"]
        var numsOfActions = 0
        var behaviorActions = []
        var finalObject = {}
        finalObject.table = []
        var ogValues = []
        var ogKeys = []
        var og = new Map()
// var ogObj = {}
// ogObj.table = []
// var doubleJumpSmash = 0
// var singleJumpSmash = 0
        var alreadyUsedProjectile
// var dmg = []
        function getKids(behaviorID, ogVal, parentName) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });
            try{
                if (behaviorTemplate.table.find(a => parseInt(a.behaviorID) == parseInt(behaviorID)).templateID == `4`) {
                    console.log(`projectile attack`)
                    //console.log(tempArray[0].LOT_ID)
                    //console.log(ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID)
                    var skillBehavior = require(`./../tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID}.json`)
                    console.log(skillBehavior.behaviorID)
                    alreadyUsedProjectile = skillBehavior.behaviorID
                    //getKids(skillBehavior.behaviorID, false, `projectile`)
                    //console.log
                    getKids(skillBehavior.behaviorID, false, `projectile`)
                    //projectileDMG.push(skillBehavior.behaviorID)

                }
            }catch{}


            // //console.log(behaviorActions)
            // //console.log(tempArray[0])
            // //console.log(Object.keys(tempArray[0]));
            // //console.log(Object.keys(tempArray[0]).length);
            // //console.log(Object.keys(tempArray[0])[0]);
            // //console.log(Object.keys(tempArray[0]).length)
            if (tempArray[0] != undefined) {
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    // //console.log(`----------------`)

                    // //console.log(`I HAVE KIDS`)
                    // //console.log((Object.keys(tempArray[0])[i]),(Object.values(tempArray[0])[i]))
                    // //console.log(Object.keys(tempArray[0])[i])
                    if (actions.includes(Object.keys(tempArray[0])[i])) {
                        // //console.log(`${i}: ${Object.keys(tempArray[0])[i]} [${behaviorID}] = ACTION [${(Object.values(tempArray[0])[i])}]`)
                        numsOfActions++
                        if (ogVal) {
                            og.set((Object.keys(tempArray[0])[i]), (Object.values(tempArray[0])[i]))
                            ogValues.push(Object.values(tempArray[0])[i])
                            ogKeys.push(Object.keys(tempArray[0])[i])
                            var object = {
                                name: Object.keys(tempArray[0])[i],
                                value: Object.values(tempArray[0])[i]
                            }
                            ogObj.table.push(object)

                        } else if (Object.values(tempArray[0])[i] != `0` && behaviorActions.includes(Object.values(tempArray[0])[i]) == false) {
                            behaviorActions.push((Object.values(tempArray[0])[i]))

                            getKids((Object.values(tempArray[0])[i]), false, parentName)
                        }
                        if (ogVal) {
                            ogValues.push(Object.values(tempArray[0])[i])
                        }
                    } else {
                        // //console.log(`${i}: ${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]`)
                        // //console.log(Object.keys(tempArray[0])[i])
                        if (Object.keys(tempArray[0])[i] == "max damage") {
                            // //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                            //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                            // //console.log(parentName)
                            //dmg.push(Object.values(tempArray[0])[i])

                            try {
                                if (parentName == `ground_action`) {
                                    dmg.push(Object.values(tempArray[0])[i])
                                } else if (parentName == `jump_action`) {
                                    singleJumpSmash = (Object.values(tempArray[0])[i])
                                } else if (parentName == `double_jump_action`) {
                                    doubleJumpSmash = (Object.values(tempArray[0])[i])
                                } else if (parentName == `mael`) {
                                    dmg.push(Object.values(tempArray[0])[i])
                                } else if (parentName == `projectile`) {
                                    dmg.push(Object.values(tempArray[0])[i])
                                } else {
                                    // console.log(parentName)
                                }
                            } catch {

                            }
                            //dmg.push(Object.values(tempArray[0])[i])

                        }
                    }
                    //getKids((Object.values(tempArray[0])[i]))
                }
                //getKids((Object.values(tempArray[0])[i]))
            }
            //for(var n=0;n<9;n++) {
            //    if (tempArray[0][`behavior ${n}`] != undefined) {
            // //        console.log(`I HAVE KIDS`)
            //        getKids(tempArray[0][`behavior ${n}`])
            //    }
            //}

            return tempArray

        }

        var behaviorID = [args[0]]
//var behaviorID = [1898, 1899, 15557]

        for (var k = 0; k < behaviorID.length; k++) {
            var ogObj = {}
            ogObj.table = []
            var doubleJumpSmash = -1
            var singleJumpSmash = -1
            var dmg = []
            var tempParent = behaviorID[k]
            // //console.log(tempParent)
            try {
                //4314 = basic short sword
                //13388 samurai sword attack
                //10312 daredevil guns
                getKids(tempParent, true, `parent`)
                //getKids(4288)
                // console.log(ogObj)
                // //console.log(ogValues)
                // //console.log(ogKeys)
                // //console.log(og)
                // //console.log(og.size)
                //for(var x=0;x<og.size;x++){
                // //    console.log(og[x])
                //}
                for (var x = 0; x < ogObj.table.length; x++) {
                    // //console.log(ogObj.table[x])
                }
                try {
                    var ground = ogObj.table.find(a => a.name == `ground_action`)
                    getKids(ground.value, false, ground.name)
                } catch {
                }
                try {
                    var single = ogObj.table.find(a => a.name == `jump_action`)
                    getKids(single.value, false, single.name)
                } catch {
                }
                try {
                    var double = ogObj.table.find(a => a.name == `double_jump_action`)
                    getKids(double.value, false, double.name)
                } catch {
                }

                try {
                    getKids(tempParent, false, `mael`)
                } catch {
                }
                try{
                    getKids(tempParent,false, `projectile`)
                }catch{}

                // //console.log(numsOfActions)
                ////getKids(17760, false)
                // //console.log(numsOfActions)
                //getKids(4290)
                // //console.log(numsOfActions)
                // if(dmg != []){
                // //     console.log(`dmg:${dmg.join(`+`)}`)
                // }
                // if(doubleJumpSmash != -1){
                // //     console.log(`doubleJumpSmash:${doubleJumpSmash}`)
                // }
                // if(singleJumpSmash != -1){
                // //     console.log(`singleJumpSmash:${singleJumpSmash}`)
                // }

                if (dmg != []) {
                    var obj = {
                        damageCombo: dmg.join(``)
                    }
                    finalObject.table.push(obj)
                }
                //return dmg[0]
                if(dmg[0] != undefined){
                    return dmg[0]
                }


                // double_jump_action
                // falling_action
                // ground_action
                // jetpack_action
                // jump_action


            } catch (e) {
                // console.log(e)
            }
        }

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
                                return Object.values(tempArray[0])[i]
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


            //return tempArray

        }

        if(dmg[0] == undefined){
            getProjectileDamage(alreadyUsedProjectile)
        }

        return dmg[0]


        //return finalObject
// console.log(finalObject)
    }
}
