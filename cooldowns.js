const cool = require(`./cooldown4.json`)
var fs = require('fs');

var data = {}
data.table = []

//console.log(cool["Cooldowns"])
console.log(Object.keys(cool["Cooldowns"]).length)
console.log(Object.keys(cool["Cooldowns"][0]).length)
console.log(Object.keys(cool["Cooldowns"][0][0]).length)
//console.log(cool["Cooldowns"][0].length)
console.log(cool["Cooldowns"][0][96].length)
var desc = ``
for(var i=0;i<=13;i++){
    desc =`${desc}\nCooldownGroup:${i}\n`
    var arr =[]

    //console.log(cool["Cooldowns"][0][i])
    for(var j=0;j<cool["Cooldowns"][0][i].length;j++){
        desc =`${desc}skillID:${cool["Cooldowns"][0][i][j]} `
        arr.push(cool["Cooldowns"][0][i][j])
    }
    var obj = {
        id: i,
        arr: arr,
        square: i * i
    }
    data.table.push(obj)
}

console.log(desc)


fs.writeFile ("input.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    }
);
