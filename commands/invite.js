module.exports = {
    name: 'invite',
    description: 'Link to invite this bot to another server',
    args: true,
    execute(message, args) {
        const client = message.client
        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        var url = `https://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=8&scope=bot`
        var channel = message.channel.toString()
        channel = channel.substring(2, channel.length-1);

        const Discord = require('discord.js');
        var title = "Nexus Force"
        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(`**Click the Following Link to Add to a Server!**\nhttps://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=8&scope=bot`)

            //.setThumbnail(iconURL)

            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);
    }
}