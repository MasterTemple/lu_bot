module.exports = {
    name: ['actualDamage', `d`],
    description: 'Gets the accurate damage of an item',
    args: true,
    use: `actualDamage [id]`,
    example:[`actualDamage 7535`],
    execute(args) {

        var id = args[0]

        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);

        var behaviorIDs = []
        var skillIDs = []
        //var cooldownFile = require(`./../tables/SkillBehavior/${skillID}.json`)
        //var skillBehavior = require(`./../locale/SkillBehavior/${Math.floor(skillIDs[i] / 256)}.json`)

        // //console.log(item.skills)
        for(var u=0;u<item.skills.length;u++){
            skillIDs.push(item.skills[u].skillID)
        }
        // console.log(skillIDs)
        for(var i=0;i<skillIDs.length;i++){
            var cooldownFile = require(`./../tables/SkillBehavior/${skillIDs[i]}.json`)
            behaviorIDs.push(cooldownFile.behaviorID)
        }
        // console.log(behaviorIDs)
        var chargeUpImaginationCost
        const behaviorParameters = require(`./../search/fullSortedBehaviorParameter.json`)
        var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior","behavior 0","behavior 1","behavior 2","behavior 3","behavior 4","behavior 5","behavior 6","behavior 7","behavior 8","behavior 9","bahavior 2"]
        var exceptions = [7535,7536,7537,12994,12982,7402,7401,7400,8492,12723,8491,7727,6923,14108,12574,16588,13340,14168,12927,2589]
        var numsOfActions = 0
        var behaviorActions = []
        var finalObject = {}
        finalObject.table = []
        var ogValues = []
        var ogKeys = []
        var hasChargeUp = false
        var og = new Map()

        function getKids(behaviorID, ogVal, parentName){
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });

            if(tempArray[0] != undefined){
                //console.log(tempArray[0])

                if(tempArray[0].imagination !== undefined){
                    if(tempArray[0].imagination < 0) {
                        chargeUpImaginationCost = (tempArray[0].imagination * -1)
                    }
                }

                if(tempArray[0].charge_time !== undefined){
                //console.log(`charge time ${tempArray[0].charge_time}`)
                //console.log(`duration ${tempArray[0].duration}`)
                    //console.log(tempArray[0].charge_time)
                    hasChargeUp = true

                }
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                    if(actions.includes(Object.keys(tempArray[0])[i])){

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

                        if(Object.keys(tempArray[0])[i] == "max damage"){

                            // console.log(Object.values(tempArray[0])[i])

                            try{
                                if (parentName == `ground_action`) {
                                    dmg.push(Object.values(tempArray[0])[i])
                                } else if (parentName == `jump_action`) {
                                    singleJumpSmash = (Object.values(tempArray[0])[i])
                                } else if (parentName == `double_jump_action`) {
                                    doubleJumpSmash = (Object.values(tempArray[0])[i])
                                } else {
                                    // console.log(parentName)
                                }
                            }catch{

                            }


                        }
                    }

                }

            }

            return tempArray

        }

        var behaviorID = behaviorIDs
        for(var k=0;k<behaviorID.length;k++){
            var ogObj = {}
            ogObj.table = []
            var doubleJumpSmash = -1
            var singleJumpSmash = -1
            var dmg = []
            var tempParent = behaviorID[k]

            try {

                getKids(tempParent, true, `parent`)


                for (var x = 0; x < ogObj.table.length; x++) {

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

                if(dmg != [] && singleJumpSmash != -1 && doubleJumpSmash != -1){

                    if(exceptions.includes(id) === false){
                        if(dmg[0] == 1 && dmg[2] == 1 && dmg[2] == 1){}
                        else if (hasChargeUp) {
                            //console.log(dmg)
                            var chargeUpDamage = dmg[1]
                            try {
                                dmg.splice(1, 1)
                            } catch {
                            }
                        }
                    }

                    var obj = {
                        damageCombo: dmg.join(`+`),
                        chargeUpDamage: chargeUpDamage,
                        chargeUpImaginationCost: chargeUpImaginationCost,
                        doubleJumpSmash: doubleJumpSmash,
                        singleJumpSmash: singleJumpSmash
                    }
                    finalObject.table.push(obj)
                }


            } catch (e) {
                // console.log(e)
            }
        }

        // console.log(finalObject)
        // message.channel.send(`Damage Combo: ${finalObject.table[0].damageCombo}\nSingle Jump Attack: ${finalObject.table[0].singleJumpSmash}\nDouble Jump Smash: ${finalObject.table[0].doubleJumpSmash}`)

        return finalObject.table[0]


    }
}
