const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter weapon ID: ', id => {
    var folder_loc = Math.floor(id / 256)
    var item_loc = id
    var item = require(`./objects/0/${folder_loc}/${item_loc}.json`)
    var isWeapon = false
    for (var i = 0; i < item.skills.length; i++) {

        var skillID = (item.skills[i].skillID)
        var behav_folder_loc = Math.floor(skillID / 256)
        var skillBehavior = require(`./locale/SkillBehavior/${behav_folder_loc}.json`)
        var dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);
        if (dmg[1] == '+') {
            console.log(`${item.name}, ${dmg}`)
            isWeapon = true
        }
    }
    if(isWeapon == false){
        console.log("That is not a weapon!")
    }

    readline.close();
});
