var fs = require(`fs`)
var buy = require(`./commandsNoDiscord/buy.js`)
var num = 4

//16921
//for(var num = 0;num < 169;num++){

    try{
        var jsonData = buy.execute([num])

        console.log(jsonData)

        fs.writeFile(`./Buy/${Math.floor(num / 256)}/${num}.json`, JSON.stringify(jsonData), function (err) {
                if (err) throw err;
                //console.log(`completed ${num}`);
            }
        );
    }catch(e){
        console.log(e)
    }

//}

