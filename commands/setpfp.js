module.exports = {
    name: ['setpfp'],
    description: 'Changes the bot\'s pfp',
    args: true,
    use: `setpfp [url]`,
    example:[`setpfp https://media.discordapp.net/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`],
    execute(message, args) {
        const {owner} = require('./../config.json');if(!owner.includes(message.author.id)) {return;}
        const client = message.client
        client.user.setAvatar(args[0])
        message.channel.send("Done ✅")
    }
}