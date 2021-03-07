var fs = require(`fs`)
var enemies = require(`./commandsNoDiscord/enemies.js`)
var num = 6359

//16921
//for(var num = 0;num < 169;num++){

try{
    var jsonData = enemies.execute([num])

    //console.log(jsonData)

    // fs.writeFile(`./Enemies/${Math.floor(num / 256)}/${num}.json`, JSON.stringify(jsonData), function (err) {
    fs.writeFile(`./Enemies/${num}.json`, JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            //console.log(`completed ${num}`);
        }
    );
}catch(e){
    console.log(e)
}

//}

