const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {prefix, token, bot_age, startupStatus, bot_info, owner} = require('./config.json');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(bot_info.name);
    console.log('My bot is online! ');
    client.user.setPresence({activity: {name: startupStatus}});

})

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/); //each space is a new argument
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);


    //checks for command erroer
    try {
        command.execute(message);

    } catch (error) {
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.react('✋');
            message.react('😑');
            message.reply('There was an issue executing that command! 😭');
        }
    }

})

client.login(token);