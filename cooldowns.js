const fs = require('fs');
const commandFiles = fs.readdirSync('./tables/SkillBehavior').filter(file => file.endsWith('.json'));
var array = []
for (const file of commandFiles) {
    //const command = require(`C:/Users/Blake The Great/Downloads/lubot//lu-json-master/tables/SkillBehavior/${file}`);
    //console.log(`{"cooldowngroup": "${command.cooldowngroup}", "skillID": "${command.skillID}"},`)
    array.push(file.substring(0,file.length-5))
}
console.log(array)

const cool = require(`./cooldown.json`)

cool.
