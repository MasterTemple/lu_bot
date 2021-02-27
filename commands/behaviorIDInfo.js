module.exports = {
    name: ['behavior','b'],
    description: 'Gets all immediate keys of a behavior',
    args: true,
    use: `behavior [id]`,
    example:[`behavior 4288`, `b 4314`],
    execute(message, args) {
        function err(){
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                return
            } catch (error) {
                console.error(error);
            }
        }
        //const behaviorParameters = require(`./search/BehaviorParameter.json`)
        const behaviorParameters = require(`./../search/fullSortedBehaviorParameter.json`)
        var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior","behavior 0","behavior 1","behavior 2","behavior 3","behavior 4","behavior 5","behavior 6","behavior 7","behavior 8","behavior 9","bahavior 2","behaviorID"]
        var behaviorID = args[0]
        var desc = ``
        try {
            var tempArray = behaviorParameters.table.filter(function (el) {
                return el.behaviorID == behaviorID
            });
            //console.log(tempArray[0])
            //console.log(Object.keys(tempArray[0]));
            //console.log(Object.keys(tempArray[0]).length);
            //console.log(Object.keys(tempArray[0])[0]);
            //console.log(Object.keys(tempArray[0]).length)
            if (tempArray[0] != undefined) {
                for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
                    //console.log(`I HAVE KIDS`)
                    //console.log((Object.keys(tempArray[0])[i]),(Object.values(tempArray[0])[i]))
                    if (actions.includes(Object.keys(tempArray[0])[i])) {
                        desc=desc.concat(`${Object.keys(tempArray[0])[i]} = ACTION [${(Object.values(tempArray[0])[i])}]\n`)
                        //getKids((Object.values(tempArray[0])[i]))
                    } else {
                        desc=desc.concat(`${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]\n`)

                    }
                }
            }

            try {
                const func = require(`./embed.js`);
                func.execute(message, behaviorID, desc, `https://lu-explorer.web.app/skills/behaviors/${behaviorID}`, );
            } catch (error) {
                console.error(error);
                err()
            }



        }catch{
                err()
            }






    }
}
