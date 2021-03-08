module.exports = {
    name: ['slot'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `slot [args]`,
    example: [`slot 12809`],
    execute(args) {

        var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior", "behavior 0", "behavior 1", "behavior 2", "behavior 3", "behavior 4", "behavior 5", "behavior 6", "behavior 7", "behavior 8", "behavior 9", "bahavior 2"]
        const behaviorParameters = require(`./../search/fullSortedBehaviorParameter.json`)

        var behaviorID = args[0]
        //console.log(behaviorID)
        //var behaviorParameters = require(`./../behaviors/${Math.floor(behaviorID/1024)}/${behaviorID}.json`)
        //console.log(behaviorParameters.parameters)
        var imaginationCost
        var alreadyUsed = []

        function search(bID){
            let bIDFile = require(`./../behaviors/${Math.floor(bID/1024)}/${bID}.json`)
            //console.log(bIDFile)
            try{
                var tempArray = behaviorParameters.table.filter(function (el) {
                    return el.behaviorID == behaviorID
                });
                for (let i = 0; i < Object.keys(bIDFile.parameters).length; i++) {
                    if (actions.includes(Object.keys(bIDFile.parameters)[i])) {

                        //if(alreadyUsed.includes(bID) === false){
                            //alreadyUsed.push(Object.values(bIDFile.parameters)[i])
                        //console.log((Object.values(bIDFile.parameters)[i]))
                            search(Object.values(bIDFile.parameters)[i])
                        //}

                    }
                    // else if (Object.keys(bIDFile.parameters)[i] == "imagination") {
                    //         console.log(Object.values(bIDFile.parameters)[i])
                    //     return Object.values(bIDFile.parameters)[i]
                    //
                    // }
                    else{
                        if(Object.keys(tempArray[0])[i] == "imagination"){


                            if(parseInt(Object.values(tempArray[0])[i]) < 0){
                                chargeUpImaginationCost.push(Object.values(tempArray[0])[i]*-1)
                            }
                            try{
                                console.log(`Imagination: ${Object.values(tempArray[0])[i]}`)
                            }catch{

                            }
                        }
                        //console.log(Object.keys(bIDFile.parameters)[i],Object.values(bIDFile.parameters)[i])
                    }
                    //console.log(Object.values(bIDFile.parameters)[i])
                }
            }catch{}
        }



        // for(let k=0;k<Object.keys(behaviorParameters.parameters).length;k++){
        //     if(actions.includes(Object.keys(behaviorParameters.parameters)[k])){
        //         search(Object.values(behaviorParameters.parameters)[k])
        //     }
        //     //console.log(Object.values(behaviorParameters.parameters)[i])
        // }
        search(behaviorID)



    }
}
