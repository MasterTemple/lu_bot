module.exports = {
    name: ['embed'],
    description: 'Embeds a message',
    args: true,
    use: `Don't call this function`,
    example:[`Internal use only`],
    execute(message, title, description, url, iconURL) {

        const client = message.client;
        var channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        const Discord = require('discord.js');
        //var url = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`;

        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`

        //console.log(`displayName: ${displayName}`)
        //var item_description = `**Description**${extra_desc}`
        //var iconURL = `https://media.discordapp.net/attachments/717825273604603944/813874900476493844/bob_mag.png`
        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            .setDescription(description)

            .setThumbnail(iconURL)
            //.addFields(
            //    { name: 'Display Name', value: displayName, inline: true },
            //    { name: 'Internal Notes', value: internalNotes, inline: true },
            //    { name: 'Brick Name', value: title, inline: true },
            //)

            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);
    }
}