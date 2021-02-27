
var fs = require('fs');
const behaviorParameters = require(`./search/BehaviorParameter.json`)
//console.log(behaviorParameters["Sheet1"][0].behaviorID)
var data = {}
data.table = []
var tempBehaviorID = 0
var desc = ``
var arr =[]


//console.log(behaviorParameters["Sheet1"])
const skillPaths = require(`./skillPaths.json`)
//console.log(skillPaths["table"][0])
//console.log(skillPaths["table"][0].parameterIDs[0].cant_attack)
var LOT_ID = undefined
var absorb_amount = undefined
var action = undefined
var action_consumed = undefined
var action_failed = undefined
var action_false = undefined
var action_true = undefined
var active = undefined
var add = undefined
var add_immunity = undefined
var affects_caster = undefined
var air_action = undefined
var airspeed = undefined
var amount = undefined
var angle = undefined
var angle_weight = undefined
var apply_on_teammates = undefined
var arc_height = undefined
var armor = undefined
var attack_speed = undefined
var bahavior2 = undefined
var behavior = undefined
var behavior0 = undefined
var behavior1 = undefined
var behavior10 = undefined
var behavior2 = undefined
var behavior3 = undefined
var behavior4 = undefined
var behavior5 = undefined
var behavior6 = undefined
var behavior7 = undefined
var behavior8 = undefined
var behavior9 = undefined
var block_damage = undefined
var block_knockback = undefined
var block_knockbacks = undefined
var block_stuns = undefined
var blocked = undefined
var blocked_action = undefined
var brain = undefined
var break_action = undefined
var buff_id = undefined
var bypass_checks = undefined
var can_t_equip = undefined
var can_t_interact = undefined
var can_t_move = undefined
var can_t_turn = undefined
var cancel_if_interacting = undefined
var cancel_on_damaged = undefined
var cancel_on_death = undefined
var cancel_on_logout = undefined
var cancel_on_remove_buff = undefined
var cancel_on_ui = undefined
var cancel_on_unequip = undefined
var cancel_on_zone = undefined
var cant_attack = undefined
var cant_equip = undefined
var cant_interact = undefined
var cant_jump = undefined
var cant_move = undefined
var cant_turn = undefined
var cant_use_item = undefined
var caster = undefined
var chain_action = undefined
var chain_delay = undefined
var charge_time = undefined
var check_blocking = undefined
var check_env = undefined
var check_range = undefined
var clear_if_caster = undefined
var clear_provided_target = undefined
var collide_with_faction = undefined
var consume_lot = undefined
var defers_smashables = undefined
var delay = undefined
var dir_angle_xz = undefined
var dir_angle_y = undefined

console.log(`len ${behaviorParameters["Sheet1"].length}`)
var ok = behaviorParameters["Sheet1"].filter(function (i,n){
    return n.behaviorID==='8';
});
var tempArray = behaviorParameters.Sheet1.filter(function (el) {
    return el.behaviorID == "7"
});

var object = {
    behaviorID: 7
}
for(var n=0;n<tempArray.length;n++){
    //console.log(tempArray[n].parameterID)
    //console.log(tempArray[n].value)
    object[tempArray[n].parameterID] =tempArray[n].value


}
console.log(object)




for(var i=0;i<0;i++){
    desc =`${desc}\nCooldownGroup:${i}\n`
        var info = behaviorParameters["Sheet1"][i]
        // var info = behaviorParameters["Sheet1"].find(a => a.behaviorID == i)

    //console.log(info)

            // var obj = {
            //     parameterIDs: info.parameterID,
            //     value: info.value
            // }

    {
        try {
            if(info.parameterID == "LOT_ID"){
                LOT_ID = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "absorb_amount"){
                absorb_amount = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "action"){
                action = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "action_consumed"){
                action_consumed = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "action_failed"){
                action_failed = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "action_false"){
                action_false = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "action_true"){
                action_true = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "active"){
                active = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "add"){
                add = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "add_immunity"){
                add_immunity = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "affects_caster"){
                affects_caster = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "air_action"){
                air_action = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "airspeed"){
                airspeed = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "amount"){
                amount = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "angle"){
                angle = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "angle_weight"){
                angle_weight = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "apply_on_teammates"){
                apply_on_teammates = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "arc_height"){
                arc_height = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "armor"){
                armor = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "attack_speed"){
                attack_speed = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "bahavior2"){
                bahavior2 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior"){
                behavior = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 0"){
                behavior0 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 1"){
                behavior1 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 10"){
                behavior10 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 2"){
                behavior2 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 3"){
                behavior3 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 4"){
                behavior4 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 5"){
                behavior5 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 6"){
                behavior6 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 7"){
                behavior7 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 8"){
                behavior8 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "behavior 9"){
                behavior9 = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "block_damage"){
                block_damage = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "block_knockback"){
                block_knockback = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "block_knockbacks"){
                block_knockbacks = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "block_stuns"){
                block_stuns = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "blocked"){
                blocked = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "blocked_action"){
                blocked_action = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "brain"){
                brain = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "break_action"){
                break_action = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "buff_id"){
                buff_id = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "bypass_checks"){
                bypass_checks = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "can't_equip"){
                can_t_equip = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "can't_interact"){
                can_t_interact = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "can't_move"){
                can_t_move = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "can't_turn"){
                can_t_turn = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_if_interacting"){
                cancel_if_interacting = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_damaged"){
                cancel_on_damaged = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_death"){
                cancel_on_death = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_logout"){
                cancel_on_logout = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_remove_buff"){
                cancel_on_remove_buff = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_ui"){
                cancel_on_ui = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_unequip"){
                cancel_on_unequip = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cancel_on_zone"){
                cancel_on_zone = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_attack"){
                cant_attack = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_equip"){
                cant_equip = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_interact"){
                cant_interact = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_jump"){
                cant_jump = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_move"){
                cant_move = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_turn"){
                cant_turn = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "cant_use_item"){
                cant_use_item = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "caster"){
                caster = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "chain_action"){
                chain_action = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "chain_delay"){
                chain_delay = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "charge_time"){
                charge_time = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "check_blocking"){
                check_blocking = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "check_env"){
                check_env = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "check_range"){
                check_range = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "clear_if_caster"){
                clear_if_caster = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "clear_provided_target"){
                clear_provided_target = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "collide_with_faction"){
                collide_with_faction = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "consume_lot"){
                consume_lot = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "defers_smashables"){
                defers_smashables = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "delay"){
                delay = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "dir_angle_xz"){
                dir_angle_xz = info.value
            }
        } catch {
        }
        try {
            if(info.parameterID == "dir_angle_y"){
                dir_angle_y = info.value
            }
        } catch {
        }
    }

    try{
        if(info != undefined){
            if (tempBehaviorID != info.behaviorID) {

                var obj = {
                    behaviorID: info.behaviorID,
                    ["LOT_ID"]: LOT_ID,
                    ["absorb_amount"]: absorb_amount,
                    ["action"]: action,
                    ["action_consumed"]: action_consumed,
                    ["action_failed"]: action_failed,
                    ["action_false"]: action_false,
                    ["action_true"]: action_true,
                    ["active"]: active,
                    ["add"]: add,
                    ["add_immunity"]: add_immunity,
                    ["affects_caster"]: affects_caster,
                    ["air_action"]: air_action,
                    ["airspeed"]: airspeed,
                    ["amount"]: amount,
                    ["angle"]: angle,
                    ["angle_weight"]: angle_weight,
                    ["apply_on_teammates"]: apply_on_teammates,
                    ["arc_height"]: arc_height,
                    ["armor"]: armor,
                    ["attack_speed"]: attack_speed,
                    ["bahavior 2"]: bahavior2,
                    ["behavior"]: behavior,
                    ["behavior 0"]: behavior0,
                    ["behavior 1"]: behavior1,
                    ["behavior 10"]: behavior10,
                    ["behavior 2"]: behavior2,
                    ["behavior 3"]: behavior3,
                    ["behavior 4"]: behavior4,
                    ["behavior 5"]: behavior5,
                    ["behavior 6"]: behavior6,
                    ["behavior 7"]: behavior7,
                    ["behavior 8"]: behavior8,
                    ["behavior 9"]: behavior9,
                    ["block_damage"]: block_damage,
                    ["block_knockback"]: block_knockback,
                    ["block_knockbacks"]: block_knockbacks,
                    ["block_stuns"]: block_stuns,
                    ["blocked action"]: blocked,
                    ["blocked_action"]: blocked_action,
                    ["brain"]: brain,
                    ["break_action"]: break_action,
                    ["buff_id"]: buff_id,
                    ["bypass_checks"]: bypass_checks,
                    ["can't_equip"]: can_t_equip,
                    ["can't_interact"]: can_t_interact,
                    ["can't_move"]: can_t_move,
                    ["can't_turn"]: can_t_turn,
                    ["cancel_if_interacting"]: cancel_if_interacting,
                    ["cancel_on_damaged"]: cancel_on_damaged,
                    ["cancel_on_death"]: cancel_on_death,
                    ["cancel_on_logout"]: cancel_on_logout,
                    ["cancel_on_remove_buff"]: cancel_on_remove_buff,
                    ["cancel_on_ui"]: cancel_on_ui,
                    ["cancel_on_unequip"]: cancel_on_unequip,
                    ["cancel_on_zone"]: cancel_on_zone,
                    ["cant_attack"]: cant_attack,
                    ["cant_equip"]: cant_equip,
                    ["cant_interact"]: cant_interact,
                    ["cant_jump"]: cant_jump,
                    ["cant_move"]: cant_move,
                    ["cant_turn"]: cant_turn,
                    ["cant_use_item"]: cant_use_item,
                    ["caster"]: caster,
                    ["chain_action"]: chain_action,
                    ["chain_delay"]: chain_delay,
                    ["charge_time"]: charge_time,
                    ["check_blocking"]: check_blocking,
                    ["check_env"]: check_env,
                    ["check_range"]: check_range,
                    ["clear_if_caster"]: clear_if_caster,
                    ["clear_provided_target"]: clear_provided_target,
                    ["collide_with_faction"]: collide_with_faction,
                    ["consume_lot"]: consume_lot,
                    ["defers_smashables"]: defers_smashables,
                    ["delay"]: delay,
                    ["dir_angle_xz"]: dir_angle_xz,
                    ["dir_angle_y"]: dir_angle_y,
                }
                arr.push(obj)
                data.table.push(obj)
                console.log("pushed one", info.behaviorID)
                console.log(obj)
                tempBehaviorID = info.behaviorID
                {
                    LOT_ID = undefined
                    absorb_amount = undefined
                    action = undefined
                    action_consumed = undefined
                    action_failed = undefined
                    action_false = undefined
                    action_true = undefined
                    active = undefined
                    add = undefined
                    add_immunity = undefined
                    affects_caster = undefined
                    air_action = undefined
                    airspeed = undefined
                    amount = undefined
                    angle = undefined
                    angle_weight = undefined
                    apply_on_teammates = undefined
                    arc_height = undefined
                    armor = undefined
                    attack_speed = undefined
                    bahavior2 = undefined
                    behavior = undefined
                    behavior0 = undefined
                    behavior1 = undefined
                    behavior10 = undefined
                    behavior2 = undefined
                    behavior3 = undefined
                    behavior4 = undefined
                    behavior5 = undefined
                    behavior6 = undefined
                    behavior7 = undefined
                    behavior8 = undefined
                    behavior9 = undefined
                    block_damage = undefined
                    block_knockback = undefined
                    block_knockbacks = undefined
                    block_stuns = undefined
                    blocked = undefined
                    blocked_action = undefined
                    brain = undefined
                    break_action = undefined
                    buff_id = undefined
                    bypass_checks = undefined
                    can_t_equip = undefined
                    can_t_interact = undefined
                    can_t_move = undefined
                    can_t_turn = undefined
                    cancel_if_interacting = undefined
                    cancel_on_damaged = undefined
                    cancel_on_death = undefined
                    cancel_on_logout = undefined
                    cancel_on_remove_buff = undefined
                    cancel_on_ui = undefined
                    cancel_on_unequip = undefined
                    cancel_on_zone = undefined
                    cant_attack = undefined
                    cant_equip = undefined
                    cant_interact = undefined
                    cant_jump = undefined
                    cant_move = undefined
                    cant_turn = undefined
                    cant_use_item = undefined
                    caster = undefined
                    chain_action = undefined
                    chain_delay = undefined
                    charge_time = undefined
                    check_blocking = undefined
                    check_env = undefined
                    check_range = undefined
                    clear_if_caster = undefined
                    clear_provided_target = undefined
                    collide_with_faction = undefined
                    consume_lot = undefined
                    defers_smashables = undefined
                    delay = undefined
                    dir_angle_xz = undefined
                    dir_angle_y = undefined
                }
            }
        }
    }catch(error){
        console.log(error)
        tempBehaviorID++
    }

        // if(tempBehaviorID != info.behaviorID){
        //     var newobj = {
        //         behaviorID: behaviorParameters["Sheet1"][i].behaviorID,
        //         parameterIDs: arr
        //     }
        //     tempBehaviorID = behaviorParameters["Sheet1"][i].behaviorID
        //     data.table.push(newobj)
        //     arr=[]
        // }


    //}

}

//console.log(desc)
//

fs.writeFile (`skillPaths1.json`, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);

