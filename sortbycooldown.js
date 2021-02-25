const cool = require(`./cooldown4.json`)
var item = require(`./search/eachSkillIDwithItem.json`);
var fs = require('fs');

var data = {}
data.table = []

//console.log(cool["Cooldowns"])
//console.log(Object.keys(cool["Cooldowns"]))
console.log(Object.keys(cool["Cooldowns"][0]))
//console.log(Object.keys(cool["Cooldowns"][0][0]))
// //console.log(cool["Cooldowns"][0].length)
// console.log(cool["Cooldowns"][0][96].length)
//console.log(Object.keys(item["table"].skillID))
//var inc

//var data = item.table.find(a => (a.skillID == 881))
//console.log(data.name)


var desc = ``
for(var i=0;i<=103;i++){
    desc =`${desc}\nCooldownGroup:${i}\n`
    //var arr =[]

    //console.log(cool["Cooldowns"][0][i])
    for(var j=0;j<cool["Cooldowns"][0][i].length;j++){
        var coolSkillID = cool["Cooldowns"][0][i][j]
        var info = item.table.find(a => (a.skillID == coolSkillID))
        if(info != undefined) {
        var obj = {
            cooldowngroup: i,
            itemID: info.id,
            skillID: info.skillID,
            name: info.name,
            displayName: info.displayName
        }

            data.table.push(obj)
        }
    }

}

//console.log(desc)

//
fs.writeFile ("sortbycooldown.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);
