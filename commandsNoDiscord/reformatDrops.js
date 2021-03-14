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

        //var implementedEnemies = [6359, 16197, 14572,  6454,  8096,  8097, 14381,  4712, 6253,  6668,  8090,  8091,  6351,  8088,  8089, 11218, 11988, 11214, 11984, 11220, 11989, 11219, 12654, 12002, 12003, 12000, 12001, 12004, 12005, 11212, 11216, 11986, 11217, 11987, 11213, 11983, 11982, 11215, 11985, 13068, 10512,  7815,  7816,  7805, 11225, 11226,  6789,  6806, 6550, 13995, 16050, 16047, 16048, 16049, 16289, 14024, 14026, 14029, 14028, 14027, 14025, 14491, 16191, 14007, 14009, 16511, 14008, 12610, 12588, 12609, 12605, 12612, 12611, 11999, 12467, 12468, 12469, 12590, 13523, 13524, 12591, 12653, 12602, 12586, 12604, 12587, 12589, 12600, 12387, 12542,  8238,  8433]
        try {
            var dropFileOld = require(`C:\\Users\\Blake The Great\\IdeaProjects\\NexusForce\\json\\Drops\\DropInfoOnlyUsedEnemies\\${Math.floor(itemID / 256)}\\${itemID}.json`)
        }catch{
            return dropInfo
        }
        //console.log(Object.keys(dropFileOld))
        var toOneObj = []
        for(var k=0; k<Object.keys(dropFileOld).length;k++){
            //console.log(dropFileOld[Object.keys(dropFileOld)[k]].length)
            var tempFile = dropFileOld[Object.keys(dropFileOld)[k]]
            for(var j=0;j<tempFile.length;j++){
                //console.log(tempFile[j])
                if(tempFile[j].destructibleComponents.length !== 0) {
                    toOneObj.push(tempFile[j])
                }
            }
        }
        // var output = [];
        //
        // toOneObj.forEach(function(item) {
        //     var existing = output.filter(function(v, i) {
        //         return v.percent == item.percent;
        //     });
        //     if (existing.length) {
        //         var existingIndex = output.indexOf(existing[0]);
        //         output[existingIndex].value = output[existingIndex].value.concat(item.value);
        //     } else {
        //         if (typeof item.value == 'string')
        //             item.value = [item.value];
        //         output.push(item);
        //     }
        // });

        dropInfo.dropStuff = toOneObj


        return dropInfo

    }
}
