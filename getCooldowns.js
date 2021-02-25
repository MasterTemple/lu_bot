var data = {}
data.table = []
var len = 16921
//len = 400
for(let id = 0; id <= len; id++) {
    let folder_loc = Math.floor(id / 256)

    try{
        let item = require(`./objects/0/${folder_loc}/${id}.json`);

        for(let skill=0; skill < item.skills.length;skill++){
            var obj = {
                itemID: item.id,
                skillID: item.skills[skill].skillID,
                name: item.name,
                displayName: item.displayName
            }
            data.table.push(obj)
        }

    }catch{
        //console.log(e)
    }

}
var fs = require('fs');
fs.writeFile("getCooldownsOutput.json", JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('complete');
    }
);

