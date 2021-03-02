module.exports = {
    name: ['searchmission',`sm`],
    description: 'Search for mission',
    args: true,
    use: `searchmission [id]`,
    example:[`searchmission Ooh Ooh Eee Eee!`, `sm Scrubby Bubbles`],
    execute(message, args) {
        //const client = message.client;
        //

        var item
        var desc = ''
        var name
        //var allARGS = message.content.trim().split(/ +/);
        //allARGS.shift()
        var sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();
        console.log(sorted)
        if(isNaN(args[0])==false){
            item = require(`./../locale/Missions/${Math.floor(args[0]/256)}.json`);
            console.log(item[args[0]].name)
            name =item[args[0]].name
            console.log()
        }else{
            //message.channel.send("This is not a valid mission ID")

        }

        var missionswithID = require(`./../search/missionIDandName.json`)
        //Object.values(missionswithID[`${}`])

        for (var j = 0; j < (Object.keys(missionswithID["table"]).length);j++) {
            //console.log((Object.keys(missionswithID["table"]).length))
            //console.log(item["Sheet1"][j].name)
            //console.log(missionswithID["table"][j].name.toLowerCase().includes(args[0]))
            try {

                var allMatch = sorted.every(function (e) {
                    //console.log(`${j} ${item["Sheet1"][j].name.toLowerCase().includes(e)} + ${item["Sheet1"][j].displayName.toLowerCase().includes(e)}`)

                    return missionswithID["table"][j].name.toLowerCase().includes(e)
                });

                if (allMatch) {
                    console.log(`MATCH!`, allMatch)
                    var id = [missionswithID["table"][j].id]
                    var func = require(`./getMissionsByID.js`)
                    func.execute(message, id)
                    return
                }
            }catch(e){
                console.log(e)
            }
        }

        //console.log(missionswithID)



        //var text = require(`./../locale/MissionText/${Math.floor(args[0]/256)}.json`);
        //var info = require(`./../tables/Missions/${Math.floor(args[0]/256)}/${args[0]}.json`);
        //var npc = require(`./../objects/0/${Math.floor(info.offer_objectID/256)}/${info.offer_objectID}.json`);



    }
}
