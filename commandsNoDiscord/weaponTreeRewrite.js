module.exports = {
    name: ['slot'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `slot [args]`,
    example: [`slot 12809`],
    execute(args) {
        const behaviorParameters = require(`./../search/fullSortedBehaviorParameter.json`)
        const behaviorTemplate = require(`./../search/behaviorTemplate.json`)
        const ObjectSkills = require(`./../search/ObjectSkills.json`)
        var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior", "behavior 0", "behavior 1", "behavior 2", "behavior 3", "behavior 4", "behavior 5", "behavior 6", "behavior 7", "behavior 8", "behavior 9", "bahavior 2"]
        var projectile_damage_array = []

        var damage = {}
        var parents = []
        var tree = {}
        tree.table = []
        var skillValues = []
        var behaviorID = []
        var double_jump_action = []
        var falling_action = []
        var ground_action = []
        var jetpack_action = []
        var jump_action = []
        var double_jump_action_damage = []
        var falling_action_damage = []
        var ground_action_damage = []
        var jetpack_action_damage = []
        var jump_action_damage = []
        var projectile_damage = []
        var projectile_chargeUp_damage = []
        var projectileBehaviors = []
        var projectileBehaviorsChildren = []
        var numsOfActions = 0
        var behaviorActions = []
        var finalObject = {}
        finalObject.table = []


        function getProjectileDamage(behaviorID){
            let tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });


            if(tempArray[0] != undefined){
                // //console.log(Object.keys(tempArray[0]).length)
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                    // //console.log(`----------------`)
                    // //console.log(tempArray[0])




                    // //console.log(`I HAVE KIDS`)
                    // //console.log((Object.keys(tempArray[0])[i]),(Object.values(tempArray[0])[i]))
                    // //console.log(Object.keys(tempArray[0])[i])
                    if(actions.includes(Object.keys(tempArray[0])[i])){
                        // //console.log(true)

                        // //console.log(`projectile attack`)
                        // //console.log(tempArray[0].LOT_ID)
                        // //console.log(ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID)
                        // //console.log(tempArray[0].action_true)
                        try{

                            var skillBehavior = require(`./tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID}.json`)
                            // console.log(skillBehavior.behaviorID)
                            alreadyUsedProjectiles.push(skillBehavior.behaviorID)
                            getProjectileDamage(skillBehavior.behaviorID)
                        }catch{
                            // var skillBehavior = require(`./tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID}.json`)
                            // // console.log(skillBehavior.behaviorID)
                            // alreadyUsedProjectiles.push(skillBehavior.behaviorID)

                            if(actions.includes(Object.keys(tempArray[0])[i])){
                                // //console.log(true)
                                getProjectileDamage(Object.values(tempArray[0])[i])
                            }

                        }

                        // //console.log(`${i}: ${Object.keys(tempArray[0])[i]} [${behaviorID}] = ACTION [${(Object.values(tempArray[0])[i])}]`)
                        //numsOfActions++
                        if(Object.values(tempArray[0])[i] != `0` && behaviorActions.includes(Object.values(tempArray[0])[i]) == false){
                            behaviorActions.push((Object.values(tempArray[0])[i]))

                            getProjectileDamage((Object.values(tempArray[0])[i]))
                        }

                    }else{
                        // //console.log(`${i}: ${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]`)
                        // //console.log(tempArray[0].behaviorID)
                        if(Object.keys(tempArray[0])[i] == "max damage"){
                            // //console.log(tempArray[0]["max damage"])
                            //return (tempArray[0]["max damage"]);

                            // //console.log(`${i}: damage = [${(Object.values(tempArray[0])[i])}]`)
                            //dmg.push(`${behaviorID}: damage = [${(Object.values(tempArray[0])[i])}]`)
                            // //console.log(parentName)
                            try{
                                //finalObject.table[0].newProjectileDamage.push(Object.values(tempArray[0])[i])
                            }catch(e){
                                // console.log(e)
                            }
                            //dmg.push(Object.values(tempArray[0])[i])

                        }




                    }
                    //getKids((Object.values(tempArray[0])[i]))
                }
                //getKids((Object.values(tempArray[0])[i]))
            }

            // //console.log(tempArray)
            // //console.log(tempArray[0])
            //var temp = tempArray.find(a => a == `max damage`)
            if(tempArray[0]["max damage"] !== undefined){
            //if((typeof tempArray[0]["max damage"]) !== undefined){
            // //     console.log(`NOT UNDEFINED`)
            // //     console.log(tempArray[0]["max damage"])
                //var damage = tempArray[0]["max damage"]
                //return (tempArray[0][`max damage`])
                // console.log(tempArray[0].behaviorID)
                projectile_damage_array.push(tempArray[0]["max damage"])
                return
            }else{
                return undefined
            }

        }
        var chargeUpCost
        function getKids(behaviorID, parent) {
            let tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });
            if (tempArray[0] != undefined) {
                var obj = {
                    behaviorID: behaviorID
                }

                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    parents.push(Object.keys(tempArray[0])[i])
                    // //console.log([Object.keys(tempArray[0])[i]], Object.values(tempArray[0])[i])
                    obj[Object.keys(tempArray[0])[i]] = {
                        [Object.keys(tempArray[0])[i]]: Object.values(tempArray[0])[i]
                    }
                    // console.log(Object.keys(tempArray[0])[i])
                    if(Object.keys(tempArray[0])[i] == "imagination"){
                        chargeUpCost = Object.values(tempArray[0])[i]
                        // console.log(`CHARGE UP COST ${chargeUpCost}`)
                    }
                }
                // //console.log(obj)
                parent.push(obj)
                //parent.kid = (obj)

                //tree.table.push(obj)
            }
            // //console.log(tree)
        }

        function getKidsKids(behaviorID, parent) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });
            // //console.log(tempArray)
            if (tempArray[0] != undefined) {
                var obj = {
                    behaviorID: behaviorID
                }
                // //console.log(tempArray[0])
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    parents.push(Object.keys(tempArray[0])[i])
                    // //console.log([Object.keys(tempArray[0])[i]], Object.values(tempArray[0])[i])
                    obj[Object.keys(tempArray[0])[i]] = {
                        [Object.keys(tempArray[0])[i]]: Object.values(tempArray[0])[i]
                    }

                    if(parent === `double_jump_action`){
                        if(actions.includes((Object.keys(tempArray[0])[i]))){
                            if (double_jump_action.includes(parseInt(Object.values(tempArray[0])[i])) == false) {
                                double_jump_action.push(parseInt(Object.values(tempArray[0])[i]))
                            }
                        }
                    }
                    if(parent === `falling_action`){
                        if(actions.includes((Object.keys(tempArray[0])[i]))){
                            if (falling_action.includes(parseInt(Object.values(tempArray[0])[i])) == false) {
                                falling_action.push(parseInt(Object.values(tempArray[0])[i]))
                            }
                        }
                    }
                    if(parent === `ground_action`){
                        if(actions.includes((Object.keys(tempArray[0])[i]))){
                            if (ground_action.includes(parseInt(Object.values(tempArray[0])[i])) == false) {
                                ground_action.push(parseInt(Object.values(tempArray[0])[i]))
                            }
                        }
                    }
                    if(parent === `jetpack_action`){
                        if(actions.includes((Object.keys(tempArray[0])[i]))){
                            if (jetpack_action.includes(parseInt(Object.values(tempArray[0])[i])) == false) {
                                jetpack_action.push(parseInt(Object.values(tempArray[0])[i]))
                            }
                        }
                    }
                    if(parent === `jump_action`){
                        if(actions.includes((Object.keys(tempArray[0])[i]))){
                            if (jump_action.includes(parseInt(Object.values(tempArray[0])[i])) == false) {
                                jump_action.push(parseInt(Object.values(tempArray[0])[i]))
                            }
                        }
                    }
                    if(parent === `projectile_damage`){
                        // //console.log(Object.keys(tempArray[0])[i])
                        if(actions.includes((Object.keys(tempArray[0])[i]))){
                            //if (projectileBehaviorsChildren.includes(parseInt(Object.values(tempArray[0])[i])) == false) {
                                projectileBehaviorsChildren.push(parseInt(Object.values(tempArray[0])[i]))
                            //}
                        }

                    }
                }


                // //console.log(obj)
                if(parent == `double_jump_action`){
                    //tree.table[0].behaviorID

                }



                // //console.log(obj)
                // //console.log(tree.table[0])
                //tree.table[0][parent]
                //tree.table[0][parent].push(obj)
                //parent.kid = (obj)

                //tree.table.push(obj)
            }
            // //console.log(tree)
        }

        getKids(args[0], tree.table)
        // //console.log(tree.table[0].length)
        // //console.log(tree.table.length)
        // //console.log(Object.keys(tree.table[0]).length)

        if (tree.table[0].behaviorID.behaviorID == 23451){
            // //console.log(true)
        }
        // //console.log(Object.keys(tree.table[0]))
        if (tree.table[0].behaviorID.behaviorID == 23451){
            // //console.log(`also true`)
        }

        // //console.log(Object.keys(tree.table[0]))
        var newLength = Object.keys(tree.table[0]).length
        // console.log(`newLength: ${newLength}`)
        do {
            for (var j = 0; j < Object.keys(tree.table[0]).length; j++) {
                // //console.log(Object.values(tree.table[0])[j])
                // //console.log(Object.(tree.table[0])[j])
                // //console.log(Object.values(tree.table[0])[j], tree.table[0][Object.keys(tree.table[0])[j]])
                if (actions.includes(Object.keys(tree.table[0])[j])) {
                    // //console.log(Object.values(tree.table[0])[j][Object.keys(tree.table[0])[j]], Object.keys(tree.table[0])[j])
                    // console.log(tree.table[0][Object.keys(tree.table[0])[j]])
                    getKidsKids(Object.values(tree.table[0])[j][Object.keys(tree.table[0])[j]], Object.keys(tree.table[0])[j])
                } else {
                    // //console.log(`no`)

                    // //console.log(Object.values(tree.table[0])[j])
                }

            }
            var previousLength = Object.keys(tree.table[0]).length
            // console.log(`previousLength: ${previousLength}`)

        }while(newLength != previousLength)
        // //console.log(tree)


        // //console.log(double_jump_action)
        // //console.log(ground_action)
        // //console.log(falling_action)
        // //console.log(jetpack_action)
        // //console.log(jump_action)

        for(var k=1;k<double_jump_action.length;k++){
            // // console.log(double_jump_action.length)
            getKidsKids(double_jump_action[k], `double_jump_action`)
        }
        for(var k=1;k<ground_action.length;k++){
            // // console.log(ground_action.length)
            getKidsKids(ground_action[k], `ground_action`)
        }
        for(var k=1;k<falling_action.length;k++){
            // // console.log(falling_action.length)
            getKidsKids(falling_action[k], `falling_action`)
        }
        for(var k=1;k<jetpack_action.length;k++){
            // // console.log(jetpack_action.length)
            getKidsKids(jetpack_action[k], `jetpack_action`)
        }
        for(var k=1;k<jump_action.length;k++){
            // // console.log(jump_action.length)
            getKidsKids(jump_action[k], `jump_action`)
        }


        // // console.log(double_jump_action)
        // // console.log(ground_action)
        // // console.log(falling_action)
        // // console.log(jetpack_action)
        // // console.log(jump_action)

        // console.log(`double_jump_action_damage`)
        for(var x=0;x<double_jump_action.length;x++) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == (double_jump_action[x])
            });
            for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                if (Object.keys(tempArray[0])[i] == "max damage") {
                    // console.log((Object.values(tempArray[0])[i]))
                    double_jump_action_damage.push(Object.values(tempArray[0])[i])
                }
            }
        }
        // console.log(`ground_action_damage`)
        for(var x=0;x<ground_action.length;x++) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == (ground_action[x])
            });
            try{
                var informationBehaviorTemplate = behaviorTemplate.table.find(a => parseInt(a.behaviorID) == parseInt(ground_action[x]))
                if (informationBehaviorTemplate.templateID == `4`) {
                    var tempArray = behaviorParameters.table.filter(function (el) {
                        return el.behaviorID == informationBehaviorTemplate.behaviorID
                    });
                    // //console.log(tempArray)
                    // //console.log(`projectile attack`,tempArray[0].LOT_ID)

                    // //console.log(tempArray[0].LOT_ID)
                    // //console.log(ObjectSkills.table.find(a => parseInt(a.objectTemplate) == parseInt(tempArray[0].LOT_ID)).skillID)
                    var skillBehavior = require(`./../tables/SkillBehavior/${ObjectSkills.table.find(a => parseInt(a.objectTemplate) === parseInt(tempArray[0].LOT_ID)).skillID}.json`)
                    // //console.log(skillBehavior.behaviorID)
                    projectileBehaviors.push(skillBehavior.behaviorID)
                    //alreadyUsedProjectiles.push(skillBehavior.behaviorID)
                    //getKids(skillBehavior.behaviorID, false, `projectile`)
                    //projectileDMG.push(skillBehavior.behaviorID)

                }
                if (informationBehaviorTemplate.templateID == `43`) {
                    // //console.log(`chargeUp = true`, informationBehaviorTemplate.behaviorID)
                    var chargeUpBehavior = informationBehaviorTemplate.behaviorID
                    console
                    var chargeUp = true
                    //finalObject.hasChargeUp = true
                    //projectileDMG.push(skillBehavior.behaviorID)

                }
            }catch{
                // for(var l=0;l<ground_action.length;l++) {
                //     var tempArray = behaviorParameters.table.filter(function (el) {
                //         return el.behaviorID == (ground_action[l])
                //     });
                //     for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                //
                //         if (Object.keys(tempArray[0])[i] == "max damage") {
                // //             console.log((Object.values(tempArray[0])[i]))
                //             ground_action_damage.push(Object.values(tempArray[0])[i])
                //         }
                //     }
                // }
            }


            for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                if (Object.keys(tempArray[0])[i] == "max damage") {
                    // console.log((Object.values(tempArray[0])[i]))
                    ground_action_damage.push(Object.values(tempArray[0])[i])
                }
                // if (Object.keys(tempArray[0])[i] == "projectile_type") {
                // //     console.log((Object.values(tempArray[0])[i]))
                //     falling_action_damage.push(Object.values(tempArray[0])[i])
                // }


            }
        }
        // console.log(`falling_action_damage`)
        for(var x=0;x<falling_action.length;x++) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == (falling_action[x])
            });
            for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                if (Object.keys(tempArray[0])[i] == "max damage") {
                    // console.log((Object.values(tempArray[0])[i]))
                    falling_action_damage.push(Object.values(tempArray[0])[i])
                }
            }
        }
        // console.log(`jetpack_action_damage`)
        for(var x=0;x<jetpack_action.length;x++) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == (jetpack_action[x])
            });
            for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                if (Object.keys(tempArray[0])[i] == "max damage") {
                    // console.log((Object.values(tempArray[0])[i]))
                    jetpack_action_damage.push(Object.values(tempArray[0])[i])
                }
            }
        }
        // console.log(`jump_action_damage`)
        for(var x=0;x<jump_action.length;x++) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == (jump_action[x])
            });
            for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                if (Object.keys(tempArray[0])[i] == "max damage") {
                    // console.log((Object.values(tempArray[0])[i]))
                    jump_action_damage.push(Object.values(tempArray[0])[i])
                }
            }
        }

        // console.log(`projectileBehaviors`)
        // console.log(projectileBehaviors)
        for(var k=0;k<projectileBehaviors.length;k++){
            // // console.log(jump_action.length)
            getKidsKids(projectileBehaviors[k], `projectile_damage`)
        }
        for(var k=0;k<projectileBehaviorsChildren.length;k++){
            // // console.log(jump_action.length)
            getKidsKids(projectileBehaviorsChildren[k], `projectile_damage`)
        }

        // console.log(`projectileBehaviorsChildren`)
        // console.log(projectileBehaviorsChildren)
        for(var x=0;x<projectileBehaviorsChildren.length;x++) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == (projectileBehaviorsChildren[x])
            });
            // //console.log(tempArray[0])

            for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {

                if (Object.keys(tempArray[0])[i] == "max damage") {
                    // console.log((Object.values(tempArray[0])[i]))
                    projectile_damage.push(Object.values(tempArray[0])[i])
                }
            }
        }
        // console.log(`projectile_damage`)
        // console.log(projectile_damage)
        // console.log(`projectileBehaviors`)
        // console.log(projectileBehaviors.length)

        for(var k=0;k<projectileBehaviors.length;k++){
            //getProjectileDamage(projectileBehaviors[k])
            // //console.log(projectile_damage_array)

            //             var tempInfo = getProjectileDamage(projectileBehaviors[k])
            // //console.log(tempInfo)
            //
            // if(tempInfo !== undefined){
            // //     console.log(tempInfo)
            //     projectile_damage_array.push(tempInfo)
            // }else{
            // //     console.log(`tempInfo undefined`)
            // }
        }
        // //console.log(projectile_damage_array)


        if(chargeUp === undefined){
            chargeUp = false
        }
        if(projectile_damage.length > 0){
            var isProjectileWeapon = true
        }else{
            var isProjectileWeapon = false
        }
        if(projectile_damage.length === 1 || projectile_damage.length === 4){
            var chargeUpIsProjectile = true
        }else{
            var chargeUpIsProjectile = false
        }
        if(chargeUp === true && chargeUpIsProjectile === true){
            var chargeUpDamage = projectile_damage[projectile_damage.length-1]
            projectile_damage.pop()
        }else if (chargeUp === true && isProjectileWeapon == true){
            var chargeUpDamage = ground_action_damage[1]
            ground_action_damage.shift()
        }else if (chargeUp === true){
            var chargeUpDamage = ground_action_damage[ground_action_damage.length-1]
            ground_action_damage.pop()
        }



        var damageStats = {
            damageCombo: ground_action_damage.join("+"),
            projectileDamageCombo: projectile_damage.join("+"),
            doubleJumpSmash: double_jump_action_damage[0],
            singleJumpSmash: jump_action_damage[0],
            isChargeUp: chargeUp,
            chargeUpDamage: chargeUpDamage,
            chargeUpIsProjectile: chargeUpIsProjectile,
            isProjectileWeapon: isProjectileWeapon,
            chargeUpCost: chargeUpCost
        }



        return damageStats


        // for(var k=0;k< double_jump_action.length;k++){
        //     getKidsKids(Object.values(tree.table[0])[k][Object.keys(tree.table[0])[k]], `double_jump_action`)
        // }
        // for(var k=0;k< falling_action.length;k++){
        //     getKidsKids(Object.values(tree.table[0])[k][Object.keys(tree.table[0])[k]], `falling_action`)
        // }
        // for(var k=0;k< ground_action.length;k++){
        //     getKidsKids(Object.values(tree.table[0])[k][Object.keys(tree.table[0])[k]], `ground_action`)
        // }
        // for(var k=0;k< jetpack_action.length;k++){
        //     getKidsKids(Object.values(tree.table[0])[k][Object.keys(tree.table[0])[k]], `jetpack_action`)
        // }
        // for(var k=0;k< jump_action.length;k++){
        //     getKidsKids(Object.values(tree.table[0])[k][Object.keys(tree.table[0])[k]], `jump_action`)
        // }
        //
        // // console.log(double_jump_action)
        // // console.log(falling_action)
        // // console.log(ground_action)
        // // console.log(jetpack_action)
        // // console.log(jump_action)


    }
}
