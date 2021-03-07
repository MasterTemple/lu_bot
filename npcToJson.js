var fs = require(`fs`)
var npc = require(`./commandsNoDiscord/npc.js`)
//var num = 7415

//16921
var idFile = require(`./search/id-name-type-displayName.json`)
for(var num = 1;num < 16921;num++){

try {
    //try{
        //let item = require(`./objects/0/${Math.floor(num / 256)}/${num}.json`);
    //}catch{}
    let tempFile = idFile["Sheet1"][num].type
    if(tempFile == "NPC" || tempFile == "UserGeneratedNPCs") {
        console.log(num, tempFile)
        var jsonData = npc.execute([num])

        console.log(jsonData)

    fs.writeFile(`./NPC/${Math.floor(num / 256)}/${num}.json`, JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            console.log(`completed ${num}`);
        }
    );
}
}catch(e){
    console.log(e)
}

}

