module.exports = {
    name: 'status',
    description: 'Sets the status',
    args: true,
    execute(message, args) {
        const {owner} = require('./../config.json');if(!owner.includes(message.author.id)) {return;}
        const client = message.client

        if (args[0] == `online`) {
            client.user.setPresence({status: 'online'});
        }
        if (args[0] == `idle`) {
            client.user.setPresence({status: 'idle'});
        }
        if (args[0] == `dnd`) {
            client.user.setPresence({status: 'dnd'});
        }

    }
}