module.exports = {
    name: ['brick'],
    description: 'Info about a LEGO Brick in LEGO Universe',
    args: true,
    use: `brick [id]`,
    example:[`brick 16`],
    execute(message, args) {
        var id = args[0]
        var folder_loc = Math.floor(id / 256)
        var item_loc = id
        try{
            var item = require(`./../objects/0/${folder_loc}/${item_loc}.json`);
        }
        catch{
            message.channel.send("An object for this ID does not even exist.")
            return
        }
        if(item.type != "LEGO brick"){
            message.channel.send(`Soldier that's not a LEGO brick!\nObject ${id} Type: ${item.type}`)
            return;
        }


        var title = item.name
        //console.log(item)
        var displayName = item.displayName
        var internalNotes = item._internalNotes
        var description = item.description
        //var extra_desc = ''



        const client = message.client;
        var channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        const Discord = require('discord.js');
        var url = `https://lu-explorer.web.app/objects/${id}/2`;

        var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        if(displayName==undefined || displayName==null || displayName==``){
            displayName= "None"
        }if(internalNotes==undefined || internalNotes==null || internalNotes==``){
            internalNotes= "None"
        }if(description==undefined || description==null || description==``){
            description= "None"
        }
        console.log(`displayName: ${displayName}`)
        //var item_description = `**Description**${extra_desc}`
        var iconURL = `https://xiphoseer.github.io/lu-res/textures/ui/bricks/dds/${item.name}.png`
        const devoEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, nexusLink, url)
            //.setDescription(item_description)

            .setThumbnail(iconURL)
            .addFields(
                { name: 'Display Name', value: displayName, inline: true },
                { name: 'Internal Notes', value: internalNotes, inline: true },
                { name: 'Brick Name', value: title, inline: true },
            )

            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        if(args[1] == `FROMBUYITEM`){
            var priceComponentID = item.components["11"]
            var priceFile = require(`./../tables/ItemComponent/${Math.floor(priceComponentID/256)}/${priceComponentID}.json`)
            var stackSize = priceFile.stackSize
            var price = priceFile.baseValue
            console.log(args[2])

            devoEmbed.addFields({ name: 'Offered By', value: args[2], inline: true })
            // { name: '឵឵ ឵Cost', value: price, inline: true },
            // { name: '឵឵ Stack', value: stackSize, inline: true },
            if(args[3] == 1 || args[3] == 2) {
                devoEmbed.addFields({ name: '឵឵ ឵Cost', value: price, inline: true },)
                devoEmbed.addFields({ name: '឵឵ Stack', value: stackSize, inline: true },)
            }
            else if(args[3] >= 4) {
                devoEmbed.addFields({name: '឵឵ ឵Cost', value: `${price}\n\n**Stack**\n${stackSize}`, inline: true})
            }else{
                devoEmbed.addFields({name: '឵឵ ឵Cost', value: `${price}\n**Stack**\n${stackSize}`, inline: true})
            }


            client.channels.cache.get(channel).send(devoEmbed);

        }
        else{
            client.channels.cache.get(channel).send(devoEmbed);
        }

    }
}
