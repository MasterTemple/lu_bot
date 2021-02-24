module.exports = {
    name: ['help'],
    description: 'This is the help command :)',
    args: true,
    execute(message, args) {
        const client = message.client
        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        var url = `https://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=52288&scope=bot`
        var channel = message.channel.toString()
        channel = channel.substring(2, channel.length-1);
        const {prefix} = require('./../config.json');
        const fs = require('fs');

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        var desc = ``
        const exclude = ["help", "items", "setpfp", "status", "play", "setpfp"]

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if(!exclude.includes(command.name)){
                desc = (`${desc}**`)

                for(var i=0; i < command.name.length; i++) {
                    desc = (`${desc}${prefix}${command.name[i]} `)
                }
                //if(i == command.name.length) {
                    desc = (`${desc}**${command.description}\n`)
                //}

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