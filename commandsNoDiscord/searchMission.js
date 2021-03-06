module.exports = {
    name: ['searchmission',`sm`],
    description: 'Search for mission',
    args: true,
    use: `searchmission [id]`,
    example:[`searchmission Ooh Ooh Eee Eee!`, `sm Scrubby Bubbles`],
    execute(args) {

            var info = require(`./../tables/Missions/${Math.floor(parseInt(args[0])/256)}/${args[0]}.json`);
            if(info.isMission == 1) {
                var id = [args[0]]
                var func = require(`./getMissionsByID.js`)
                var retunData = func.execute(id)
                return retunData
            }
            else if(info.isMission == 0){
                var id = [args[0]]
                var func = require(`./achievement.js`)
                var retunData = func.execute(id)
                return retunData
            }


    }
}
