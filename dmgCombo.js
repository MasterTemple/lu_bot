var obj = {
    table:[
        {
            id: 1,
            kid1: 4,
            kid2: 5
        },
        {
            id: 4,
            kid1: 3,
            kid2: 7
        },
        {
            id: 5,
            kid1: 8,
            kid2: 9
        },
        {
            id: 3,
            val1: 4,
            val2: 5,
            dmg: 3

        },
        {
            id: 7,
            val1: 4,
            val2: 5,
            dmg: 7
        },
        {
            id: 8,
            val1: 4,
            val2: 5,
            dmg: 8
        },
        {
            id: 9,
            val1: 4,
            val2: 5,
            dmg: 9
        }

    ]
}
const behaviorParameters = require(`./search/fullSortedBehaviorParameter.json`)

const kidList = ["kid1","kid2","kid3","kid4"]
const startID = 4314
var dmg = []
var actions = ["action", "miss action", "blocked action", "action_false", "action_true", "start_action", "chain_action", "break_action", "double_jump_action", "ground_action", "jump_action", "hit_action", "hit_action_enemy", "timeout_action", "air_action", "falling_action", "jetpack_action", "spawn_fail_action", "action_failed", "action_consumed", "blocked_action", "moving_action", "on_success", "behavior","behavior 0","behavior 1","behavior 2","behavior 3","behavior 4","behavior 5","behavior 6","behavior 7","behavior 8","behavior 9","bahavior 2"]

function getKids(id){
    var tempArray = behaviorParameters.table.filter(function (el) {
        return el.behaviorID == id
    });
    var desc = `desc${id}:\n`
    //console.log(tempArray)
    if (tempArray[0] != undefined) {
        for (var i = 0; i < Object.keys(tempArray[0]).length; i++) {
            if (actions.includes(Object.keys(tempArray[0])[i])) {
                desc = desc.concat(`${Object.keys(tempArray[0])[i]} = ACTION [${(Object.values(tempArray[0])[i])}]\n`)
                //console.log(`${Object.keys(tempArray[0])[i]} = ACTION [${(Object.values(tempArray[0])[i])}]\n`)
                getKids(Object.values(tempArray[0])[i])
                //console.log(1)
            } else if(Object.keys(tempArray[0])[i] == "max damage") {
                //console.log(Object.keys(tempArray[0])[i],Object.values(tempArray[0])[i])
                dmg.push(Object.values(tempArray[0])[i])
                console.log(`DAMAGE ${Object.values(tempArray[0])[i]}`)

            }
            else {
                desc = desc.concat(`${Object.keys(tempArray[0])[i]} = VALUE [${(Object.values(tempArray[0])[i])}]\n`)
                //console.log(3)

            }
        }
    }
    //console.log(desc)

    //console.log(dmg)
    return dmg
}
var damageCombo = (getKids(startID))
console.log(damageCombo.join(`+`))

