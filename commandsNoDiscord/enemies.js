module.exports = {
    name: ['enemies'],
    description: 'Info about the Maelstrom in LEGO Universe',
    args: true,
    use: `enemies [id]`,
    example:[`enemies 4712`],
    execute(args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        var data = {}
        //`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`
        if(args.length == 0){
            return
        }
        try{
            // //console.log(`./../objects/0/${folder_loc}/${item_loc}.json`)
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
        }
        catch(error){
            // console.log(error)
            return
        }
        if(item.type != "Enemies"){
            return;
        }

        // console.log(`${item.name}`)

        var dropData = {}
        dropData.LootTable = []
        var isWeapon = false
        var Armor = 0
        var Health = 0
        var Imagination = 0
        var dmg = ``
        var dmg_component = ``
        var cooldowngroup
        var cooldown
        var dmg_combo
        var title = item.name
        // console.log(item)
        data.name = item.name
        var displayName = item.displayName
        data.displayName = item.displayName
        var internalNotes = item._internalNotes
        data.internalNotes = item._internalNotes

        var description = item.description
        data.description = item.description

        var extra_desc = ''
        var renderID = item.components["2"]
        var destructibleComponentID = item.components["7"]
        var destructibleComponent = require(`./../tables/DestructibleComponent/${Math.floor(destructibleComponentID/256)}/${destructibleComponentID}.json`)
        var life = destructibleComponent.life
        data.life = destructibleComponent.life
        var LootMatrixIndex = destructibleComponent.LootMatrixIndex
        var Armor = destructibleComponent.armor
        data.armor = destructibleComponent.armor
        var CurrencyIndex = destructibleComponent.CurrencyIndex
        data.currencyIndex = destructibleComponent.CurrencyIndex
        var level = destructibleComponent.level
        data.level = level

        var currencyFile = require(`./../tables/CurrencyTable/0/${CurrencyIndex}`)
        // data.currencyTable = []
        // for(var l=0;l<currencyFile.currency_table.length;l++){
        //     data.currencyTable.push()
        // }
        var theCurrencyTable = currencyFile.currency_table.find(a => a.npcminlevel == level)
        // var currencyObj = {
        data.currencyTable = {
            id: theCurrencyTable.id,
            maxValue: theCurrencyTable.maxvalue,
            minValue: theCurrencyTable.minvalue
        }


        var LootMatrixIndexFile = require(`./../tables/LootMatrix/${Math.floor(LootMatrixIndex/256)}/${LootMatrixIndex}.json`)
        // console.log(LootMatrixIndexFile["elements"].length)
        const roundToHundredth = (value) => {
            return Number(value.toFixed(2));
        };

        dropData.LootMatrixIndex = destructibleComponent.LootMatrixIndex
        // //console.log(roundToHundredth(parseFloat(LootMatrixIndexFile["elements"][k].percent)*100.0))
        for(var k=0;k<LootMatrixIndexFile["elements"].length;k++){
            var object = {
                LootTableIndex: LootMatrixIndexFile["elements"][k].LootTableIndex,
                percent: roundToHundredth(parseFloat(LootMatrixIndexFile["elements"][k].percent)*100.0),
                minToDrop: LootMatrixIndexFile["elements"][k].minToDrop,
                maxToDrop: LootMatrixIndexFile["elements"][k].maxToDrop,
                items: []
            }
            var itemNames = []
            var itemDisplayNames = []
            var itemIDs = []
            // //console.log(`${roundToHundredth(parseFloat(LootMatrixIndexFile["elements"][k].percent)*100.0)}% Chance to Drop ${LootMatrixIndexFile["elements"][k].minToDrop}-${LootMatrixIndexFile["elements"][k].maxToDrop} Items:`)
            var LootTableFile = require(`./../tables/LootTable/groupBy/LootTableIndex/${Math.floor(LootMatrixIndexFile["elements"][k].LootTableIndex/256)}/${LootMatrixIndexFile["elements"][k].LootTableIndex}.json`)
            for(var j=0;j<LootTableFile["elements"].length;j++){
                // //console.log(LootTableFile["elements"][j].itemid)

                try{
                    var dropItemFile = require(`./../objects/0/${Math.floor(LootTableFile["elements"][j].itemid / 256)}/${LootTableFile["elements"][j].itemid}`)
                    // //console.log(LootTableFile["elements"][j].itemid, dropItemFile.displayName)
                    var itemType = require(`./../objects/0/${Math.floor(LootTableFile["elements"][j].itemid/256)}/${LootTableFile["elements"][j].itemid}.json`);
                    //if(itemType.type == "LEGO brick") {
                    //if(itemType.type == "LEGO brick" === false && dropItemFile.displayName.includes("Model") === false) {
                    if(dropItemFile.name.includes("point")) {

                        //if(dropItemFile.displayName.includes("Model")) {
                        var tempObj = {
                            itemID: LootTableFile["elements"][j].itemid,
                            displayName: dropItemFile.displayName,
                            name: dropItemFile.name
                        }
                        object.items.push(tempObj)
                    }
                }catch{}
            }

            dropData.LootTable.push(object)

        }
        // console.log(dropData)


        // //console.log(`life:${destructibleComponent.life}`)
        // //console.log(destructibleComponent.life)
        // console.log(`renderID: ${renderID}`)
        var renderFolder = Math.floor(renderID/256)
        var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        // console.log(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
        var iconID = renderComponent.IconID
        //var icons = require(`./../tables/Icons/${iconID}.json`)
        // console.log(`./../tables/Icons/${iconID}.json`)
        //var iconPath = icons.IconPath
        var iconPath = renderComponent.icon_asset
        var enemyCooldown
        var behaviorID
        var allSkills =`**Skills:**`
        data.behaviors = []

        if(item.skills != undefined || item.skills != null) {
            for (var i = 0; i < item.skills.length; i++) {
                var skillID = (item.skills[i].skillID)
                // console.log(skillID)
                var behav_folder_loc = Math.floor(parseInt(skillID) / 256)
                //var skillBehavior = require(`./../locale/SkillBehavior/${behav_folder_loc}.json`)
                var skillBehavior = require(`./../tables/SkillBehavior/${skillID}.json`)
                var skillBehaviorName = require(`./../Search/BehaviorTemplateName.json`)


                // console.log(`./../tables/SkillBehavior/${skillID}.json`)
                // console.log(skillBehavior)
                enemyCooldown = skillBehavior.cooldown
                behaviorID = skillBehavior.behaviorID


                var behavior = require(`./../behaviors/${Math.floor(behaviorID/1024)}/${behaviorID}.json`)
                // console.log(behavior)
                var templateID = behavior.templateID
                var behaviorData = skillBehaviorName.Sheet1.find(a => a.templateID == templateID)
                var behaviorName = behaviorData.name
                // console.log(behaviorName)
                allSkills = `${allSkills}\n__**name:**__ ${behaviorName}\n**skillID:** ${skillID}\n**templateID:** ${templateID}\n**behaviorID:** ${behaviorID}`

                // console.log(`./../behaviors/${Math.floor(behaviorID/1024)}/${behaviorID}.json`)
                //var skillTime = "npc skill time"
                var npcskilltime = behavior.parameters["npc skill time"]
                var max_range = behavior.parameters["max range"]
                var min_range = behavior.parameters["min range"]
                // console.log(npcskilltime, max_range, min_range)
                //var abilityName = skillBehavior[skillID]
                ////dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);
                // //console.log(`abilityName: ${abilityName}`)
                // //console.log(`cool: ${cooldownFile.cooldown}`)
                var maelstromTree = require(`./maelstromTree.js`)
                var maelstromDamage = maelstromTree.execute([behaviorID])
                console.log(maelstromDamage)

                var behaviorObj ={
                    behaviorID:behaviorID,
                    npcskilltime: behavior.parameters["npc skill time"],
                    max_range: behavior.parameters["max range"],
                    min_range: behavior.parameters["min range"]
                }
                let behaviorObjWithDamage = {
                    ...behaviorObj,
                    ...maelstromDamage
                };

                //if(i == 0){
                //    data.behaviors = [behaviorID]
                //}else {
                    data.behaviors.push(behaviorObjWithDamage)
                //}

            }
        }


        var url = `https://lu-explorer.web.app/objects/${id}/2`;
        const img = `https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png`;
        //var displayNameClean = item.displayName.replace(/\s/g, '_')
        //var thumbnail = `https://static.wikia.nocookie.net/legouniverse/images/5/5f/${displayNameClean}.png`
        // //console.log(`thumbnail ${thumbnail}`)
        var maudeLink = `https://cdn.discordapp.com/attachments/641133444746838016/813618015320408074/200.png`
        if(iconPath != null) {
            iconPath = iconPath.replace('DDS', 'png')
            iconPath = iconPath.replace('dds', 'png')
            iconPath = iconPath.replace(/\\/g, "/");
            iconPath = iconPath.replace(` `, "%20");
            iconPath = iconPath.toLowerCase()
            var iconURL = `https://xiphoseer.github.io/lu-res/${iconPath.substring(6)}`
        } else if(false) {
            var iconURL = `https://xiphoseer.github.io//lu-res/mesh//overhead_indicators//icon_vendor.png`
        }
        else{
            var iconURL = `https://cdn.discordapp.com/attachments/717825273604603944/813874900476493844/bob_mag.png`
        }

        data.iconURL = iconURL
        /*
        https://xiphoseer.github.io/lu-res/textures/ui/../../textures/auramar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/ui/amar/ui/inventory/Hands/KiteShield_Bat.png
        https://xiphoseer.github.io/lu-res/textures/auramar/ui/inventory/hands/kiteshield_bat.png
         */

        // console.log(iconURL)
        // //console.log(`https://xiphoseer.github.io/lu-res/textures/ui/..\\..\\textures\\ui\\inventory\\faction kits\\sorcerer_shoulder_3.png`.replace('\\', '/'))
        //https://xiphoseer.github.io/lu-res/textures/ui/inventory/faction%20kits/sorcerer_shoulder_3.png

        if(cooldown==undefined || cooldown==null || cooldown==``){
            cooldown= "None"
        }if(cooldowngroup==undefined || cooldowngroup==null || cooldowngroup==``){
            cooldowngroup= "None"
        }if(dmg_combo==undefined || dmg_combo==null || dmg_combo==``){
            dmg_combo= "None"
        }if(displayName==undefined || displayName==null || displayName==``){
            displayName= "None"
        }if(internalNotes==undefined || internalNotes==null || internalNotes==``){
            internalNotes= "None"
        }if((description==undefined || description==null || description==``)){
            description= "None"
        }




        let information = {
            ...dropData,
            ...data
        };

        return information


    }
}
