module.exports = {
    name: ['setpfp'],
    description: 'Changes the bot\'s pfp',
    args: true,
    execute(message, args) {
        const {owner} = require('./../config.json');if(!owner.includes(message.author.id)) {return;}
        const client = message.client
        client.user.setAvatar(args[0])
        message.channel.send("Done ✅")
    }
}