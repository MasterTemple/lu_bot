module.exports = {
    name: ['allkits', 'kits'],
    description: 'Displays all the kits',
    args: true,
    use: `allkits`,
    example:[`allkits`, 'kits'],
    execute(message, args) {
        if(args.length > 0){
            return;
        }
        const client = message.client;
        var channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        const Discord = require('discord.js');
        const {iconURL, nexusLink} = require('./../config.json');
        //var iconURL = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`;
        //var nexusLink = `https://cdn.discordapp.com/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`
        const devoEmbed = new Discord.MessageEmbed()

            .setColor('#00ffff')
            .setTitle(`All kits:`)
            .setURL(nexusLink)
            .setAuthor(`Nexus Force`, nexusLink, nexusLink)
            //.setDescription(description)

            .setThumbnail(iconURL)
            // .addFields(
            //     { name: 'Assembly', value: "Engineer Ranks 1-3", inline: true },
            //     { name: 'Assembly', value: "Inventor Ranks 1-3", inline: true },
            //     { name: 'Assembly', value: "Summoner Ranks 1-3", inline: true },
            //     { name: 'Sentinels', value: "Knight Ranks 1-3", inline: true },
            //     { name: 'Sentinels', value: "Space Ranger Ranks 1-3", inline: true },
            //     { name: 'Sentinels', value: "Samurai Ranks 1-3", inline: true },
            //     { name: 'Paradox', value: "Sorcerer Ranks 1-3", inline: true },
            //     { name: 'Paradox', value: "Space Marauder Ranks 1-3", inline: true },
            //     { name: 'Paradox', value: "Shinobi Ranks 1-3", inline: true },
            //     { name: 'Venture League', value: "Adventurer Ranks 1-3", inline: true },
            //     { name: 'Venture League', value: "Daredevil Ranks 1-3", inline: true },
            //     { name: 'Venture League', value: "Buccaneer Ranks 1-3", inline: true },
            //     { name: 'Mosaic Jester', value: "Mosaic Jester Suit", inline: true },
            //     { name: 'Bat Lord', value: "Bat Lord Suit", inline: true },
            //     { name: 'Explorien Bot', value: "Explorien Bot Suit", inline: true },
            //     { name: 'Skeleton Suit', value: "Skeleton Suit", inline: true },
            //     { name: 'Earth Spinjitzu Gi', value: "Cole's Earth Spinjitzu Gi", inline: true },
            //     { name: 'Ice Spinjitzu Gi', value: "Zane's Ice Spinjitzu Gi", inline: true },
            //     { name: 'Fire Spinjitzu Gi', value: "Kai's Fire Spinjitzu Gi", inline: true },
            //     { name: 'Lightning Spinjitzu Gi', value: "Jay's Lightning Spinjitzu Gi", inline: true },
            // )

            .addFields(
                { name: 'Assembly', value: "Engineer", inline: true },
                { name: 'Assembly', value: "Inventor", inline: true },
                { name: 'Assembly', value: "Summoner", inline: true },
                { name: 'Sentinels', value: "Knight", inline: true },
                { name: 'Sentinels', value: "Space Ranger", inline: true },
                { name: 'Sentinels', value: "Samurai", inline: true },
                { name: 'Paradox', value: "Sorcerer", inline: true },
                { name: 'Paradox', value: "Space Marauder", inline: true },
                { name: 'Paradox', value: "Shinobi", inline: true },
                { name: 'Venture League', value: "Adventurer", inline: true },
                { name: 'Venture League', value: "Daredevil", inline: true },
                { name: 'Venture League', value: "Buccaneer", inline: true },
                { name: 'Mosaic Jester', value: "Mosaic Jester Suit", inline: true },
                { name: 'Bat Lord', value: "Bat Lord Suit", inline: true },
                { name: 'Explorien Bot', value: "Explorien Bot Suit", inline: true },
                { name: 'Skeleton Suit', value: "Skeleton Suit", inline: true },
                { name: 'Earth Spinjitzu Gi', value: "Cole's Earth Spinjitzu Gi", inline: true },
                { name: 'Ice Spinjitzu Gi', value: "Zane's Ice Spinjitzu Gi", inline: true },
                { name: 'Fire Spinjitzu Gi', value: "Kai's Fire Spinjitzu Gi", inline: true },
                { name: 'Lightning Spinjitzu Gi', value: "Jay's Lightning Spinjitzu Gi", inline: true },
            )

            /*
            .addFields(
                { name: 'Assembly', value: "Engineer Rank 1\nEngineer Rank 2\nEngineer Rank 3\nEngineer Rank 3 Variant", inline: true },
                { name: 'Assembly', value: "Summoner Rank 1\nSummoner Rank 2\nSummoner Rank 3\nSummoner Rank 3 Variant", inline: true },
                { name: 'Assembly', value: "Inventor Rank 1\nInventor Rank 2\nInventor Rank 3", inline: true },
                { name: 'Sentinels', value: "Knight Rank 1\nKnight Rank 2\nKnight Rank 3\nKnight Rank 3 Variant", inline: true },
                { name: 'Sentinels', value: "Samurai Rank 1\nSamurai Rank 2\nSamurai Rank 3\nSamurai Rank 3 Variant", inline: true },
                { name: 'Sentinels', value: "Space Ranger Rank 1\nSpace Ranger Rank 2\nSpace Ranger Rank 3", inline: true },
                { name: 'Paradox', value: "Sorcerer Rank 1\nSorcerer Rank 2\nSorcerer Rank 3\nSorcerer Rank 3 Variant", inline: true },
                { name: 'Paradox', value: "Space Marauder Rank 1\nSpace Marauder Rank 2\nSpace Marauder Rank 3\nSpace Marauder Rank 3 Variant", inline: true },
                { name: 'Paradox', value: "Shinobi Rank 1\nShinobi Rank 2\nShinobi Rank 3", inline: true },
                { name: 'Venture League', value: "Daredevil Rank 1\nDaredevil Rank 2\nDaredevil Rank 3\nDaredevil Rank 3 Variant", inline: true },
                { name: 'Venture League', value: "Buccaneer Rank 1\nBuccaneer Rank 2\nBuccaneer Rank 3\nBuccaneer Rank 3 Variant", inline: true },
                { name: 'Venture League', value: "Adventurer Rank 1\nAdventurer Rank 2\nAdventurer Rank 3", inline: true },
                { name: 'Mosaic Jester', value: "Mosaic Jester Suit", inline: true },
                { name: 'Bat Lord', value: "Bat Lord Suit", inline: true },
                { name: 'Explorien Bot', value: "Explorien Bot Suit", inline: true },
                { name: 'Skeleton Suit', value: "Skeleton Suit", inline: true },
                { name: 'Earth Spinjitzu Gi', value: "Cole's Earth Spinjitzu Gi", inline: true },
                { name: 'Ice Spinjitzu Gi', value: "Zane's Ice Spinjitzu Gi", inline: true },
                { name: 'Fire Spinjitzu Gi', value: "Kai's Fire Spinjitzu Gi", inline: true },
                { name: 'Lightning Spinjitzu Gi', value: "Jay's Lightning Spinjitzu Gi", inline: true },
            )

             */

            .setTimestamp()
            .setFooter('The LEGO Group has not endorsed or authorized the operation of this game and is not liable for any safety issues in relation to the operation of this game.', nexusLink);

        client.channels.cache.get(channel).send(devoEmbed);




    }
}