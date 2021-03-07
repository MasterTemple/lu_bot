module.exports = {
    name: ['brick'],
    description: 'Info about a LEGO Brick in LEGO Universe',
    args: true,
    use: `brick [id]`,
    example:[`brick 16`],
    execute(args) {
        var data = {}
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        try{
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
        }
        catch{
            console.log("An object for this ID does not even exist.")
            return
        }
        if(item.type != "LEGO brick"){
            console.log(`Soldier that's not a LEGO brick!\nObject ${id} Type: ${item.type}`)
            return;
        }

        data.name = item.name
        data.displayName = item.displayName

        var title = item.name
        // //console.log(item)
        var displayName = item.displayName
        var internalNotes = item._internalNotes
        var description = item.description
        //var extra_desc = ''




        var url = `https://lu-explorer.web.app/objects/${id}/2`;

        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        if(displayName==undefined || displayName==null || displayName==``){
            displayName= "None"
        }if(internalNotes==undefined || internalNotes==null || internalNotes==``){
            internalNotes= "None"
        }if(description==undefined || description==null || description==``){
            description= "None"
        }
        // console.log(`displayName: ${displayName}`)
        //var item_description = `**Description**${extra_desc}`
        var iconURL = `https://xiphoseer.github.io/lu-res/textures/ui/bricks/dds/${item.name}.png`
        data.iconURL = iconURL
        var priceComponentID = item.components["11"]
        var priceFile = require(`./../tables/ItemComponent/${Math.floor(priceComponentID/256)}/${priceComponentID}.json`)
        var stackSize = priceFile.stackSize
        //data.stackSize = priceFile.stackSize
        data.stackSize = 999

        var price = priceFile.baseValue
        data.price = priceFile.baseValue
        data.isSoldByVendor = true

    return data
    }
}
