module.exports = {
    name: 'search',
    description: 'This command is broken lol',
    args: true,
    execute(message, args) {
        //const client = message.client;
        //
        const arg = message.content.slice(7).trim().split(", "); //each space is a new argument
        console.log(arg)
        var id
        var search = arg[0]
        console.log(arg.length)
        //console.log(args[0],args[1],args[2],args[3])

        for(var i=1; i<arg.length;i++){
            search = `${search} ${arg[i]}`
        }
        search=arg[0]
        var searchExtra=arg[1]
        //search = args[0],args[1],args[2],args[3]
        console.log(`search: ${search}`)
        console.log(`searchExtra: ${searchExtra}`)

        //console.log(args[0])


        try {
            //C:\Users\Blake The Great\Downloads\lubot\lu-json-master\locale\Objects\29.json
            var item = require(`./../search/id-name-type-displayName.json`);
            var num = '2'
            var desc = ''
            console.log("ok",(Object.keys(item["Sheet1"]).length))
            for (var j = 0; j < (Object.keys(item["Sheet1"]).length);j++) {
                //console.log(item["Sheet1"][j].name)
                try{
                    if ((item["Sheet1"][j].displayName.includes(search) || item["Sheet1"][j].name.includes(search)) && (item["Sheet1"][j].displayName.includes(searchExtra) || item["Sheet1"][j].name.includes(searchExtra))) {
                        //console.log(`found ${j} DisplayName ${item["Sheet1"][j].displayName} name ${item["Sheet1"][j].name}`)
                        //console.log(`**ID:** ${j} **DisplayName:** ${item["Sheet1"][j].displayName} name ${item["Sheet1"][j].name}`)
                        //console.log(`**ID:** ${item["Sheet1"][j].id} **Type** ${item["Sheet1"][j].type} **Names:** ${item["Sheet1"][j].displayName} / ${item["Sheet1"][j].name}`)
                        desc = `${desc}**ID:** ${item["Sheet1"][j].id} **Type** ${item["Sheet1"][j].type} **Names:** ${item["Sheet1"][j].displayName} / ${item["Sheet1"][j].name}\n`

                        //console.log(`"id": "${item.id}", "item": "${item.displayName}",`)
                        id = item["Sheet1"][j].id
                        var type = item["Sheet1"][j].type
                        //console.log(id,type)





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