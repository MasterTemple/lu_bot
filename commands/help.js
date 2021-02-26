module.exports = {
    name: ['help'],
    description: 'Displays public commands and what each one does',
    args: true,
    use: `help optional:[commandName]`,
    example:[`help`, `help type`],
    execute(message, args) {
        //console.log(args.length, args)
        const client = message.client
        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        var url = `https://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=52288&scope=bot`
        var channel = message.channel.toString()
        channel = channel.substring(2, channel.length-1);
        const {prefix, exclude} = require('./../config.json');
        const fs = require('fs');

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        var desc = ``
        //const exclude = ["help", "items", "setpfp", "status", "play"]

        if(args.length == 0){
            for (const file of commandFiles) {
                const command = require(`./${file}`);

                for (var i = 0; i < command.name.length; i++){
                    if (!exclude.includes(command.name[i])) {
                        desc = (`${desc}**`)

                        for (var i = 0; i < command.name.length; i++) {
                            desc = (`${desc}${prefix}${command.name[i]} `)
                        }
                        //if(i == command.name.length) {
                        desc = (`${desc}**${command.description}\n`)
                        //}

                    }
                }
            }
        }else{
            try{
                var command
                dance:
                for (const file of commandFiles) {
                    command = require(`./../commands/${file}`);
                    for(var i=0; i < command.name.length; i++) {
                        if(command.name[i]==args[0]){
                            break dance
                        }
                    }
                }

                //command = require(`./${args[0]}`);
                desc = (`${desc}**`)

                for (var i = 0; i < command.name.length; i++) {
                    desc = (`${desc}${prefix}${command.name[i]} `)
                }
                desc = (`${desc}**${command.description}\n`)
                if(command.example.length == 1){
                    desc = `${desc}**Example:**\n`
                }else{
                    desc = `${desc}**Examples:**\n`
                }

                for (var i = 0; i < command.example.length; i++) {
                    desc = `${desc}${prefix}${command.example[i]}\n`
                }
                desc = `${desc}**Use:**\n${prefix}${command.use}`

            }
            catch(error){
                console.log(error)
                for (const file of commandFiles) {
                    const command = require(`./${file}`);
                    if (!exclude.includes(command.name)) {
                        desc = (`${desc}**`)

                        for (var i = 0; i < command.name.length; i++) {
                            desc = (`${desc}${prefix}${command.name[i]} `)
                        }
                        //if(i == command.name.length) {
                        desc = (`${desc}**${command.description}\n`)
                        //}

                    }
                }
            }
        }


        const Discord = require('discord.js');
        var title = "Nexus Force"
        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(desc)

            .setThumbnail(nexusLink)

            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);


    }
}
