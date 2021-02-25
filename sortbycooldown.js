const cool = require(`./cooldown4.json`)
var item = require(`./search/eachSkillIDwithItem.json`);
var fs = require('fs');

var data = {}
data.table = []

//console.log(cool["Cooldowns"])
//console.log(Object.keys(cool["Cooldowns"]))
//console.log(Object.keys(cool["Cooldowns"][0]))
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
    var arr =[]

    //console.log(cool["Cooldowns"][0][i])
    for(var j=0;j<cool["Cooldowns"][0][i].length;j++){
        var coolSkillID = cool["Cooldowns"][0][i][j]
        var info = item.table.find(a => (a.skillID == coolSkillID))
        //console.log(info)


        if(info != undefined) {
            var time
            try{
                var cooldownFile = require(`./tables/SkillBehavior/${info.skillID}.json`)
                time = cooldownFile.cooldown
                //console.log(time)
            }
            catch(err){
                //console.log(err)
                time = null
            }

            var obj = {
                itemID: info.itemID,
                skillID: info.skillID,
                name: info.name,
                displayName: info.displayName,
                cooldownTime: time
            }
            arr.push(obj)
        }
        var newobj = {
            cooldowngroup: i,
            objects: arr
        }
            data.table.push(newobj)
        }
    //}

}

//console.log(desc)

//
fs.writeFile (`sortbycooldown5.json`, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);
