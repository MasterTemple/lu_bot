module.exports = {
    name: ['searchitem'],
    description: 'Search only items by key word(s), order does not matter',
    args: true,
    use: `searchitem [args]`,
    example:[`searchitem space marauder blaster 3 variant`, `searchitem mosaic jester cap`],
    execute(message, args) {
        //const client = message.client;
        //
        const arg = message.content.slice(11).trim().split(", "); //each space is a new argument
        console.log(arg)
        var id
        var search = arg[0]
        console.log(arg.length)
        //console.log(args[0],args[1],args[2],args[3])

        for(var i=1; i<arg.length;i++){
            search = `${search} ${arg[i]}`
        }
        search=arg[0].toLowerCase()
        if(arg.length == 1){
            var searchExtra = search
        }else {
            var searchExtra = arg[1].toLowerCase()
        }//search = args[0],args[1],args[2],args[3]
        console.log(`search: ${search}`)
        console.log(`searchExtra: ${searchExtra}`)

        //console.log(args[0])


        try {
            var allARGS = message.content.trim().split(/ +/);
            allARGS.shift()
            var sorted = [];
            for (var i = 0; i < allARGS.length; i++) {
                sorted.push(allARGS[i].toLowerCase());
            }
            sorted.sort();
            //C:\Users\Blake The Great\Downloads\lubot\lu-json-master\locale\Objects\29.json
            var item = require(`./../search/id-name-type-displayName.json`);
            var num = '2'
            var desc = ''
            console.log("ok",(Object.keys(item["Sheet1"]).length))
            for (var j = 0; j < (Object.keys(item["Sheet1"]).length);j++) {
                //console.log(item["Sheet1"][j].name)
                try{

                    var allMatch = sorted.every(function (e) {
                        //console.log(`${j} ${item["Sheet1"][j].name.toLowerCase().includes(e)} + ${item["Sheet1"][j].displayName.toLowerCase().includes(e)}`)

                        return item["Sheet1"][j].name.toLowerCase().includes(e) + item["Sheet1"][j].displayName.toLowerCase().includes(e)
                    });
                    if (allMatch && item["Sheet1"][j].type == "Loot") {
                        //console.log(`found ${j} DisplayName ${item["Sheet1"][j].displayName} name ${item["Sheet1"][j].name}`)
                        //console.log(`**ID:** ${j} **DisplayName:** ${item["Sheet1"][j].displayName} name ${item["Sheet1"][j].name}`)
                        //console.log(`**ID:** ${item["Sheet1"][j].id} **Type** ${item["Sheet1"][j].type} **Names:** ${item["Sheet1"][j].displayName} / ${item["Sheet1"][j].name}`)
                        if(item["Sheet1"][j].displayName != item["Sheet1"][j].name) {
                            desc = `${desc}ID: **${item["Sheet1"][j].id}** Type **${item["Sheet1"][j].type}**\nNames: **${item["Sheet1"][j].displayName}** / **${item["Sheet1"][j].name}**\n`
                        }else{
                            desc = `${desc}ID: **${item["Sheet1"][j].id}** Type **${item["Sheet1"][j].type}**\nNames: **${item["Sheet1"][j].displayName}**\n`
                        }
                        //console.log(`"id": "${item.id}", "item": "${item.displayName}",`)
                        id = item["Sheet1"][j].id
                        var type = item["Sheet1"][j].type
                        //console.log(id,type)
                        if(desc.length>1920){
                            desc = `__**Too Many Results for One Message**__\n${desc}`
                            break;
                        }




                    }
                }
                catch (error){
                    //console.log(error)
                }
            }

            var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
            var url = `https://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=52288&scope=bot`
            var client = message.client
            var channel = message.channel.toString()
            channel = channel.substring(2, channel.length-1);
            if(desc == ''){
                desc = "**0 Results**"
            }
            const Discord = require('discord.js');
            var title = "Nexus Force"
            const Embed = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle(title)
                .setURL(url)
                .setAuthor(`Nexus Force`, nexusLink, url)
                .setDescription(desc)

                .setThumbnail(nexusLink)

                .setTimestamp()
                .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

            client.channels.cache.get(channel).send(Embed);

        } catch (error){
            console.log(error)
            message.channel.send("An object for this ID does not even exist.")
            return
        }


    }
}