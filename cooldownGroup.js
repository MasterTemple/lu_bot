var cooldownFile = require(`./search/cooldownsWithTimer.json`)
const fs = require(`fs`)
//console.log(cooldownFile.table.cooldowngroup)

//var cooldowninfo = cooldownFile.table.find(a => a.cooldowngroup == 21)
//console.log(cooldowninfo.cooldowngroup)

//console.log(cooldownFile.table[21])

for(var c=0;c<=103;c++){
    try{
        var cooldowninfo = cooldownFile.table.find(a => a.cooldowngroup == c)

        //console.log(cooldowninfo)

        fs.writeFile(`./Cooldowns/${c}.json`, JSON.stringify(cooldowninfo), function (err) {
                if (err) throw err;
                //console.log(`completed ${num}`);
            }
        );
    }catch(e){
        console.log(e)
    }
}
