module.exports = {
    name: ['searchmission',`sm`],
    description: 'Search for mission',
    args: true,
    use: `missionid [id]`,
    example:[`missionid 1665`, `mid 228`],
    execute(message, args) {
        //const client = message.client;
        //

        var item
        var desc = ''
        var name
        if(isNaN(args[0])==false){
            item = require(`./../locale/Missions/${Math.floor(args[0]/256)}.json`);
            console.log(item[args[0]].name)
            name =item[args[0]].name
            console.log()
        }else{
            message.channel.send("This is not a valid mission ID")
            return
        }



        var text = require(`./../locale/MissionText/${Math.floor(args[0]/256)}.json`);
        var info = require(`./../tables/Missions/${Math.floor(args[0]/256)}/${args[0]}.json`);
        var npc = require(`./../objects/0/${Math.floor(info.offer_objectID/256)}/${info.offer_objectID}.json`);



    }
}
