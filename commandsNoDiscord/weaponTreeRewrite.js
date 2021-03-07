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

        function getKids(behaviorID, parent) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });
            if (tempArray[0] != undefined) {
                var obj = {
                    behaviorID: behaviorID
                }
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    parents.push(Object.keys(tempArray[0])[i])
                    //console.log([Object.keys(tempArray[0])[i]], Object.values(tempArray[0])[i])
                    obj[Object.keys(tempArray[0])[i]] = {
                        [Object.keys(tempArray[0])[i]]: Object.values(tempArray[0])[i]
                    }
                }
                //console.log(obj)
                parent.push(obj)
                //parent.kid = (obj)

                //tree.table.push(obj)
            }
            //console.log(tree)
        }

        function getKidsKids(behaviorID, parent) {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });
            //console.log(tempArray)
            if (tempArray[0] != undefined) {
                var obj = {
                    behaviorID: behaviorID
                }
                console.log(tempArray[0])
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    parents.push(Object.keys(tempArray[0])[i])
                    //console.log([Object.keys(tempArray[0])[i]], Object.values(tempArray[0])[i])
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
                }
                //console.log(obj)
                if(parent == `double_jump_action`){
                    //tree.table[0].behaviorID

                }



                //console.log(obj)
                //console.log(tree.table[0])
                //tree.table[0][parent]
                //tree.table[0][parent].push(obj)
                //parent.kid = (obj)

                //tree.table.push(obj)
            }
            //console.log(tree)
        }

        getKids(args[0], tree.table)
        //console.log(tree.table[0].length)
        //console.log(tree.table.length)
        //console.log(Object.keys(tree.table[0]).length)

        if (tree.table[0].behaviorID.behaviorID == 23451){
            //console.log(true)
        }
        //console.log(Object.keys(tree.table[0]))
        if (tree.table[0].behaviorID.behaviorID == 23451){
            //console.log(`also true`)
        }

        //console.log(Object.keys(tree.table[0]))
        var newLength = Object.keys(tree.table[0]).length
        console.log(`newLength: ${newLength}`)
        do {
            for (var j = 0; j < Object.keys(tree.table[0]).length; j++) {
                //console.log(Object.values(tree.table[0])[j])
                //console.log(Object.(tree.table[0])[j])
                //console.log(Object.values(tree.table[0])[j], tree.table[0][Object.keys(tree.table[0])[j]])
                if (actions.includes(Object.keys(tree.table[0])[j])) {
                    //console.log(Object.values(tree.table[0])[j][Object.keys(tree.table[0])[j]], Object.keys(tree.table[0])[j])
                    console.log(tree.table[0][Object.keys(tree.table[0])[j]])
                    getKidsKids(Object.values(tree.table[0])[j][Object.keys(tree.table[0])[j]], Object.keys(tree.table[0])[j])
                } else {
                    //console.log(`no`)

                    //console.log(Object.values(tree.table[0])[j])
                }

            }
            var previousLength = Object.keys(tree.table[0]).length
            console.log(`previousLength: ${previousLength}`)

        }while(newLength != previousLength)
        //console.log(tree)


        console.log(double_jump_action)
        console.log(ground_action)
        console.log(falling_action)
        console.log(jetpack_action)
        console.log(jump_action)

        for(var k=1;k<double_jump_action.length;k++){
            console.log(double_jump_action.length)
            getKidsKids(double_jump_action[k], `double_jump_action`)
        }
        for(var k=1;k<ground_action.length;k++){
            console.log(ground_action.length)
            getKidsKids(ground_action[k], `ground_action`)
        }
        for(var k=1;k<falling_action.length;k++){
            console.log(falling_action.length)
            getKidsKids(falling_action[k], `falling_action`)
        }
        for(var k=1;k<jetpack_action.length;k++){
            console.log(jetpack_action.length)
            getKidsKids(jetpack_action[k], `jetpack_action`)
        }
        for(var k=1;k<jump_action.length;k++){
            console.log(jump_action.length)
            getKidsKids(jump_action[k], `jump_action`)
        }


        console.log(double_jump_action)
        console.log(ground_action)
        console.log(falling_action)
        console.log(jetpack_action)
        console.log(jump_action)

        return tree


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
        // console.log(double_jump_action)
        // console.log(falling_action)
        // console.log(ground_action)
        // console.log(jetpack_action)
        // console.log(jump_action)


    }
}
