const cool = require(`./cooldown4.json`)


//console.log(cool["Cooldowns"])
console.log(Object.keys(cool["Cooldowns"]).length)
console.log(Object.keys(cool["Cooldowns"][0]).length)
console.log(Object.keys(cool["Cooldowns"][0][0]).length)
//console.log(cool["Cooldowns"][0].length)
console.log(cool["Cooldowns"][0][96].length)
var desc = ``
for(var i=0;i<=103;i++){
    desc =`${desc}\nCooldownGroup:${i}\n`
    //console.log(cool["Cooldowns"][0][i])
    for(var j=0;j<cool["Cooldowns"][0][i].length;j++){
        desc =`${desc}skillID:${cool["Cooldowns"][0][i][j]} `

    }
}

console.log(desc)
