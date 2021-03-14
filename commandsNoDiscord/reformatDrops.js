module.exports = {
    name: ['slot'],
    description: 'Find packages that contain a certain item',
    args: true,
    use: `slot [args]`,
    example: [`slot 12809`],
    execute(args) {
        var itemID = args[0]
        var dropInfo = {}
        dropInfo.id = args[0]
        try{
            var item = require(`./../objects/0/${Math.floor(args[0]/256)}/${args[0]}.json`);
        }
        catch{
            // console.log("An object for this ID does not even exist.")
            return
        }
        dropInfo.name = item.name
        dropInfo.displayName = item.displayName
        dropInfo.description = item.description
        try{
            var renderID = item.components["2"]
            var renderFolder = Math.floor(renderID/256)
            var renderComponent = require(`./../tables/RenderComponent/${renderFolder}/${renderID}.json`)
            var iconID = renderComponent.IconID
            var iconPath = renderComponent.icon_asset

        }catch{}
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
        }
        dropInfo.iconURL = iconURL

        var implementedEnemies = [4712,6253,6359,8238,8433,12387,6550 ,6789,6806,7815,7816,6359,7805,11225,11226,11212,11213,11214,11215,11216,11217,11218,11219,12000,12002,12004,13068,11220,11982,11983,11984,11985,11986,11987,11988,11989,12654,14024,14025,14026,14027,14028,14029,14491,16047,16048,16049,16050,11999,12467,12468,12469,12586,12587,12588,12589,12590,12591,12600,12602,12604,12605,12609,12610,12611,12612,12653,13523,13524]
        var dropFileOld = require(`C:\\\\Users\\\\Blake The Great\\\\IdeaProjects\\\\NexusForce\\\\json\\\\Drops\\\\DropInfoOnlyUsedEnemies\\\\${Math.floor(itemID / 256)}\\\\${itemID}.json`)
        dropInfo.dropStuff = dropFileOld
        return dropInfo

    }
}
