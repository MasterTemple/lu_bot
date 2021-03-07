var fs = require(`fs`)
var npc = require(`./commandsNoDiscord/npc.js`)
//var num = 7415

//16921
for(var num = 1;num < 16921;num++){

try {
    try {
        var item = require(`./objects/0/${Math.floor(num / 256)}/${num}.json`);
    } catch {
    }
    if (item.type == "NPC" || item.type == "UserGeneratedNPCs") {
        var jsonData = npc.execute([num])

        console.log(jsonData)

    fs.writeFile(`./NPC/${Math.floor(num / 256)}/${num}.json`, JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            console.log(`completed ${num}`);
        }
    );
}
}catch(e){
    //console.log(e)
}

}

