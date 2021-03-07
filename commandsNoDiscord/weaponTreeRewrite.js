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
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    parents.push(Object.keys(tempArray[0])[i])
                    //console.log([Object.keys(tempArray[0])[i]], Object.values(tempArray[0])[i])
                    obj[Object.keys(tempArray[0])[i]] = {
                        [Object.keys(tempArray[0])[i]]: Object.values(tempArray[0])[i]
                    }

                    if(parent === `double_jump_action`){
                        double_jump_action.push(Object.values(tempArray[0])[i])
                    }
                    if(parent === `falling_action`){
                        falling_action.push(Object.values(tempArray[0])[i])
                    }
                    if(parent === `ground_action`){
                        ground_action.push(Object.values(tempArray[0])[i])
                    }
                    if(parent === `jetpack_action`){
                        jetpack_action.push(Object.values(tempArray[0])[i])
                    }
                    if(parent === `jump_action`){
                        jump_action.push(Object.values(tempArray[0])[i])
                    }
                }
                console.log(obj)
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
        var newLength = Object.keys(tree.table[0]).length

        if (tree.table[0].behaviorID.behaviorID == 23451){
            //console.log(true)
        }
        console.log(Object.keys(tree.table[0]))
        if (tree.table[0].behaviorID.behaviorID == 23451){
            //console.log(`also true`)
        }

        //console.log(Object.keys(tree.table[0]))

        do {
            for (var j = 0; j < Object.keys(tree.table[0]).length; j++) {
                //console.log(Object.values(tree.table[0])[j])
                //console.log(Object.(tree.table[0])[j])
                //console.log(Object.values(tree.table[0])[j], tree.table[0][Object.keys(tree.table[0])[j]])
                if (actions.includes(Object.keys(tree.table[0])[j])) {
                    console.log(Object.values(tree.table[0])[j][Object.keys(tree.table[0])[j]], Object.keys(tree.table[0])[j])
                    console.log(tree.table[0][Object.keys(tree.table[0])[j]])
                    getKidsKids(Object.values(tree.table[0])[j][Object.keys(tree.table[0])[j]], Object.keys(tree.table[0])[j])
                } else {
                    //console.log(`no`)

                    //console.log(Object.values(tree.table[0])[j])
                }

            }
            var previousLength = Object.keys(tree.table[0]).length

        }while(newLength != previousLength)
        //console.log(tree)

        console.log(double_jump_action)
        console.log(falling_action)
        console.log(ground_action)
        console.log(jetpack_action)
        console.log(jump_action)


        return tree


    }
}
