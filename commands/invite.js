module.exports = {
    name: 'invite',
    description: 'Info about the arguments',
    args: true,
    execute(message, args) {
        const client = message.client
        message.channel.send(`> https://discord.com/api/oauth2/authorize?client_id=813618765685456916&permissions=8&scope=bot`)
    }
}