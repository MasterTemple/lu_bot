module.exports = {
    name: ['item'],
    description: 'Info about an item in LEGO Universe',
    args: true,
    use: `item [id]`,
    example:[`item 7415`],
    execute(args) {
        var data = {}

        var id = args[0]
        data.itemID = args[0]

        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        //`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`
        try{
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
        }
        catch{
            // console.log("An object for this ID does not even exist.")
            return
        }
        //console.log(item)

        data.name = item.name
        data.displayName = item.displayName
        data.description = item.description
        var equip = require(`./equip.js`)
        var equipObject = equip.execute([args[0]])
        if(equipObject.equipLocationNames.includes(`Right Hand`)){
            //console.log(`weapon!`)
            var isWeapon = true
            data.isWeapon = true

        }else{
            var isWeapon = false
            data.isWeapon = false
        }
        var imaginationTreeCost = require(`./imaginationTreeCost.js`)
        for(var u=1;u<equipObject.allItems.length;u++){
            equipObject.allItems[u] = parseInt(equipObject.allItems[u])

            var extraItem = require(`./../objects/0/${Math.floor(equipObject.allItems[u]/256)}/${equipObject.allItems[u]}.json`);

            for(var p=0;p<extraItem.skills.length;p++){
                var extraSkillBehavior = require(`./../tables/SkillBehavior/${extraItem.skills[p].skillID}.json`)
                //console.log(extraSkillBehavior.imaginationcost)
                data.abilityImaginationCost = extraSkillBehavior.imaginationcost
            }
            //console.log(extraItem.skills)
        }


        //data.equipSlots = []
        //data.equipSlots.push(equipObject)
        // console.log(`${item.name}`)
        //var isWeapon = false
        var Armor = 0
        var Health = 0
        var Imagination = 0
        var imaginationCost = 0
        var dmg = ``
        var dmg_component = ``
        var cooldowngroup
        var cooldown
        var dmg_combo
        var title = item.name
        // console.log(item)
        var displayName = item.displayName
        var internalNotes = item._internalNotes
        data.internalNotes = item._internalNotes
        data.abilityNames = []
        var description = item.description
        var extra_desc = ''
        var renderID = item.components["2"]
        // console.log(`renderID: ${renderID}`)
        var renderFolder = Math.floor(renderID/256)
        var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        // console.log(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        var iconID = renderComponent.IconID
        //var icons = require(`./../tables/Icons/${iconID}.json`)
        // console.log(`./../tables/Icons/${iconID}.json`)
        //var iconPath = icons.IconPath
        var iconPath = renderComponent.icon_asset
        data.skillIDs = []
        data.behaviorIDs = []
        if(item.skills != undefined) {
            for (var i = 0; i < item.skills.length; i++) {
                var meleeDamage = require(`./meleeDamage.js`)
                var damageCombo = meleeDamage.execute([id])
                data.meleeDamageInfo = damageCombo

                var skillID = (item.skills[i].skillID)
                var behav_folder_loc = Math.floor(skillID / 256)
                var skillBehavior = require(`./../locale/SkillBehavior/${behav_folder_loc}.json`)
                // console.log(skillBehavior[skillID])
                var abilityName;
                data.skillIDs.push(skillID)
                if (skillBehavior[skillID] == undefined){
                    //return
                }
                try{
                    abilityName = skillBehavior[skillID].name;
                    //console.log(skillBehavior[skillID])
                    if(equipObject.allItems.length > 1){
                        data.abilityNames.push(skillBehavior[skillID].name)
                    }else{
                        data.abilityName = skillBehavior[skillID].name
                    }

                }catch{
                    abilityName = `None`
                }
                //dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);

                if(skillBehavior[skillID] != undefined){
                    if (skillBehavior[skillID].descriptionUI.includes(`(ChargeUp)`)) {
                        var chargeUpLoc = (skillBehavior[skillID].descriptionUI.search(`(ChargeUp)`)) + 9
                        // console.log(`chargeUpLoc ${chargeUpLoc}`)
                        var chargeUp = skillBehavior[skillID].descriptionUI.substring(chargeUpLoc);
                        data.chargeUpDescription = skillBehavior[skillID].descriptionUI.substring(chargeUpLoc);
                    } else if (skillBehavior[skillID].descriptionUI.includes(`(Description)`)) {
                        var descriptionLoc = (skillBehavior[skillID].descriptionUI.search(`(Description)`)) + `(Description)`.length - 1
                        // console.log(`desc ${descriptionLoc}`)
                        var description = skillBehavior[skillID].descriptionUI.substring(descriptionLoc);
                        data.localeDescription = skillBehavior[skillID].descriptionUI.substring(descriptionLoc);
                        extra_desc = `${extra_desc}\n${abilityName}: ${description}`
                    } else if (skillBehavior[skillID].descriptionUI.includes(`+`) == false) {
                        extra_desc = `${extra_desc}\n${skillBehavior[skillID].name}: ${skillBehavior[skillID].descriptionUI}`
                    }
                }

                if (item.name.includes(`Wand`) && skillBehavior[skillID].descriptionUI.includes(`ChargeUp`)) {
                    var chargeUpLoc = (skillBehavior[skillID].descriptionUI.search(`(ChargeUp)`)) + 9
                    var chargeUp = skillBehavior[skillID].descriptionUI.substring(chargeUpLoc);
                    extra_desc = `${extra_desc}\n${skillBehavior[skillID].name}: ${chargeUp}`
                    // console.log(`I AM A WAND`)
                }
                else {
                    // var chargeUpLoc = (skillBehavior[skillID].descriptionUI.search(`(DamageCombo)`)) + 9
                    // // console.log(chargeUpLoc)
                    // var chargeUp = skillBehavior[skillID].descriptionUI.substring(12);
                    // //extra_desc = `${extra_desc}\n${skillBehavior[skillID].name}: ${chargeUp}`
                    // // console.log(`I AM A WAND`)
                }
                // console.log(`chargeUp: ${chargeUp}`)
                var cooldownFile = require(`./../tables/SkillBehavior/${skillID}.json`)
                // console.log(cooldownFile)
                // //console.log(`cool: ${cooldownFile.cooldown}`)
                if (cooldownFile.cooldown != 0) {
                    cooldowngroup = cooldownFile.cooldowngroup
                    data.cooldowngroup = cooldownFile.cooldowngroup
                    cooldown = `${cooldownFile.cooldown} Seconds`
                    data.cooldownTime = cooldownFile.cooldown
                    // console.log(`Cooldown Group: ${cooldownFile.cooldowngroup}\nItem Cooldown: ${cooldownFile.cooldown} seconds`)
                }
                if(imaginationCost > 0){
                    // console.log(`already got imagination`)
                }else{
                    imaginationCost = cooldownFile.imaginationcost
                    //data.abilityImaginationCost = cooldownFile.imaginationcost
                }


                if (cooldownFile.armorBonusUI != null) {
                    Armor = cooldownFile.armorBonusUI
                    data.Armor = cooldownFile.armorBonusUI
                }
                if (cooldownFile.lifeBonusUI != null) {
                    Health = cooldownFile.lifeBonusUI
                    data.Health = cooldownFile.lifeBonusUI
                }
                if (cooldownFile.imBonusUI != null) {
                    Imagination = cooldownFile.imBonusUI
                    data.Imagination = cooldownFile.imBonusUI
                }

                if (i == item.skills.length - 1) {
                    // console.log(`Bonuses:`)
                    // console.log(`Armor: ${Armor}`)
                    // console.log(`Health: ${Health}`)
                    // console.log(`Imagination: ${Imagination}`)
                }
                try{
                    // console.log(`dmg: ${skillBehavior[skillID].descriptionUI[16]},${skillBehavior[skillID].descriptionUI[18]},${skillBehavior[skillID].descriptionUI[20]}`)
                    // console.log(`dmg: ${skillBehavior[skillID].descriptionUI}`)
                }catch{
                    // console.log(`dmg log fail`)
                }
                if(dmg_combo==undefined || dmg_combo==null){

                    try{
                        if (skillBehavior[skillID].descriptionUI[16] == `+` && skillBehavior[skillID].descriptionUI[18] == `+` && skillBehavior[skillID].descriptionUI[20] == `+`) {
                            dmg_combo = skillBehavior[skillID].descriptionUI.substring(15, 22);
                        } else if (skillBehavior[skillID].descriptionUI[16] == `+` && skillBehavior[skillID].descriptionUI[18] == `+`) {
                            dmg_combo = skillBehavior[skillID].descriptionUI.substring(15, 20);
                        } else if (skillBehavior[skillID].descriptionUI[16] == `+`) {
                            dmg_combo = skillBehavior[skillID].descriptionUI.substring(15, 18);
                        } else if ((skillBehavior[skillID].descriptionUI[15] >= '0' && skillBehavior[skillID].descriptionUI[15] <= '9') && (item.name.includes('Wand') || item.name.includes("Space Marauder Valiant Weapon"))) {
                            dmg_combo = skillBehavior[skillID].descriptionUI[15];
                        } else if ((skillBehavior[skillID].descriptionUI.includes('DamageCombo'))) {
                            var dmg_combo_num = skillBehavior[skillID].descriptionUI.search(`Description`);
                            // console.log(dmg_combo_num)
                            dmg_combo = skillBehavior[skillID].descriptionUI.substring(`%(DamageCombo) `.length, dmg_combo_num - 3)
                            // console.log(`DMG: ${dmg_combo}`)
                        } else if ((skillBehavior[skillID].descriptionUI[15] >= '0' && skillBehavior[skillID].descriptionUI[15] <= '9')) {
                            //dmg_combo  = skillBehavior[skillID].descriptionUI[15];
                            dmg_combo = `None`
                        }
                    }
                    catch{}
                }

            }
        }
        for(var l=0;l<data.skillIDs.length;l++){
            var skillIDToBehaviorFile = require(`./../tables/SkillBehavior/${data.skillIDs[l]}.json`)
            data.behaviorIDs.push(skillIDToBehaviorFile.behaviorID)
        }
        //var weaponTree = require(`./weaponTree.js`)
        var weaponTree = require(`./weaponTreeRewrite.js`)


        data.projectileDamageInfo = {}
        for(var m=0;m<data.behaviorIDs.length;m++){
            //console.log(parseInt(data.behaviorIDs[m]))
            var weaponTreeInfo = weaponTree.execute([parseInt(data.behaviorIDs[m])])
            //if(weaponTreeInfo.table.length != 0){
                //console.log(weaponTreeInfo)
                //data.projectileDamageInfo[m] = weaponTreeInfo

            if(weaponTreeInfo.chargeUpDamage !== undefined) {
                data.projectileDamageInfo.chargeUpDamage = weaponTreeInfo.chargeUpDamage
            }
            if(weaponTreeInfo.projectileDamageCombo !== undefined) {
                data.projectileDamageInfo.projectileDamageCombo = weaponTreeInfo.projectileDamageCombo
            }
            if(weaponTreeInfo.isChargeUp === true) {
                data.projectileDamageInfo.isChargeUp = weaponTreeInfo.isChargeUp
            }
            if(weaponTreeInfo.chargeUpIsProjectile === true) {
                data.projectileDamageInfo.chargeUpIsProjectile = weaponTreeInfo.chargeUpIsProjectile
            }
            if(weaponTreeInfo.isProjectileWeapon === true) {
                data.projectileDamageInfo.isProjectileWeapon = weaponTreeInfo.isProjectileWeapon
            }
            if(data.projectileDamageInfo.isChargeUp !== true && weaponTreeInfo.isChargeUp === false) {
                data.projectileDamageInfo.isChargeUp = weaponTreeInfo.isChargeUp
            }
            if(data.projectileDamageInfo.chargeUpIsProjectile !== true && weaponTreeInfo.chargeUpIsProjectile === false) {
                data.projectileDamageInfo.chargeUpIsProjectile = weaponTreeInfo.chargeUpIsProjectile
            }
            if(data.projectileDamageInfo.isProjectileWeapon !== true && weaponTreeInfo.isProjectileWeapon === false) {
                data.projectileDamageInfo.isProjectileWeapon = weaponTreeInfo.isProjectileWeapon
            }





            //}
        }

        if(isWeapon){
            var desc = `${dmg_component}\nBonuses:\nArmor: ${Armor}\nHealth: ${Health}\nImagination: ${Imagination}`
        }else{
            var desc = `Bonuses:\nArmor: ${Armor}\nHealth: ${Health}\nImagination: ${Imagination}`

        }


        var url = `https://lu-explorer.web.app/objects/${id}/2`;
        const img = `https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png`;

        var displayNameClean

        if(item.displayName != null){
            displayNameClean = item.displayName.replace(/\s/g, '_')
        }
        else{
            displayNameClean = `None`
        }
        //var thumbnail = `https://static.wikia.nocookie.net/legouniverse/images/5/5f/${displayNameClean}.png`
        // //console.log(`thumbnail ${thumbnail}`)
        var maudeLink = `https://cdn.discordapp.com/attachments/641133444746838016/813618015320408074/200.png`
        var iconURL
        if(iconPath != null) {
            iconPath = iconPath.replace('DDS', 'png')
            iconPath = iconPath.replace('dds', 'png')
            iconPath = iconPath.replace(/\\/g, "/");
            iconPath = iconPath.replace(` `, "%20");
            iconPath = iconPath.toLowerCase()
            iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
        }else{
            iconURL = `https://github.com/MasterTemple/lu_bot/blob/master/src/unknown.png?raw=true`
            //question mark
        }
        /*
        https://xiphoseer.github.io/lu-res/textures/ui/../../textures/auramar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/ui/amar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/auramar/ui/inventory/hands/kiteshield_bat.png
         */

        // console.log(iconURL)
        data.iconURL = iconURL

        var priceComponentID = item.components["11"]
        var priceFile = require(`./../tables/ItemComponent/${Math.floor(priceComponentID/256)}/${priceComponentID}.json`)
        var stackSize = priceFile.stackSize
        data.stackSize = priceFile.stackSize
        var price = priceFile.baseValue
        data.price = priceFile.baseValue
        data.commendationCost = priceFile.commendationCost
        data.factionTokens = priceFile.altCurrencyCost
        var reqs = priceFile.reqPrecondition
        var min_level
        // console.log(reqs)
        if(reqs != null){
            var reqsArray = reqs.split(';');


            for(var i=0;i<reqsArray.length;i++){
                if((parseInt(reqsArray[i]) >= 210 && parseInt(reqsArray[i]) <= 229) || parseInt(reqsArray[i]) == 253|| parseInt(reqsArray[i]) == 254){
                    var levelReq = require(`./../tables/Preconditions/${reqsArray[i]}.json`)
                    min_level = levelReq.targetLOT

                    break
                }
            }
            // console.log(min_level)

        }
        if(min_level == undefined) {
            data.levelRequirement = 0
        }else{
            data.levelRequirement = min_level
        }


        let information = {
            ...equipObject,
            ...data
        };
        // //console.log(min_level)
        return information



    }
}
