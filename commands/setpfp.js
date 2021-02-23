module.exports = {
    name: 'setpfp',
    description: 'Info about the arguments',
    args: true,
    execute(message, args) {
        const client = message.client
        client.user.setAvatar(args[0])
        message.channel.send("Done ✅")
    }
}