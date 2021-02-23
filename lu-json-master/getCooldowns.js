const path = require('path')

var id = 7516
var folder_loc = Math.floor(id / 256)
var item_loc = id
var item = require(`./objects/0/${folder_loc}/${item_loc}.json`)
console.log(`${item.name}`)
var isWeapon = false
var Armor = 0
var Health = 0
var Imagination = 0
for (var i = 0; i < item.skills.length; i++) {

    var skillID = (item.skills[i].skillID)
    var behav_folder_loc = Math.floor(skillID / 256)
    var skillBehavior = require(`./locale/SkillBehavior/${behav_folder_loc}.json`)
    var dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);
    var cooldownFile = require(`./tables/SkillBehavior/${skillID}.json`)
    //console.log(`cool: ${cooldownFile.cooldown}`)
    if(cooldownFile.cooldown != 0) {
        console.log(`Cooldown Group: ${cooldownFile.cooldowngroup}\nItem Cooldown: ${cooldownFile.cooldown} seconds`)
    }


    if(cooldownFile.armorBonusUI != null){
        Armor = cooldownFile.armorBonusUI
    }
    if(cooldownFile.lifeBonusUI != null){
        Health = cooldownFile.lifeBonusUI
    }
    if(cooldownFile.imBonusUI != null){
        Imagination = cooldownFile.imBonusUI
    }

    if(i == item.skills.length-1) {
        console.log(`Bonuses:`)
        console.log(`Armor: ${Armor}`)
        console.log(`Health: ${Health}`)
        console.log(`Imagination: ${Imagination}`)
    }

    if (dmg[1] == '+') {
        console.log(`Damage: ${dmg}`)
        isWeapon = true
    }

}

// if(isWeapon == false){
//     console.log("That is not a weapon!")
// }


