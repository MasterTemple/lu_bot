module.exports = {
    name: ['buy'],
    description: 'Find Vendors that sell a certain item',
    args: true,
    use: `buy [args]`,
    example: [`buy 7445`, `buy samurai head 1`],
    execute(message, args) {
        //console.log(module.exports.name)
        const executeFile = require(`./buyItem`)

        function err(){
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                return
            } catch (error) {
                console.error(error);
            }
        }

        var search = args[0]
        for(var i=1; i<args.length;i++){
            search = `${search} ${args[i]}`
        }
        if(args.length == 0){
            err()
            return
        }
        if(isNaN(args[0])==false){
            console.log(`FALSDFA`)
            executeFile.execute(message, args)
            return
        }else{
            var sorted = [];
            for (var i = 0; i < args.length; i++) {
                sorted.push(args[i].toLowerCase());
            }
            sorted.sort();
            var item = require(`./../search/id-name-type-displayName.json`);
            for (var j = 0; j < (Object.keys(item["Sheet1"]).length);j++) {

                try{
                    var allMatch = sorted.every(function (e) {
                        return item["Sheet1"][j].name.toLowerCase().includes(e) + item["Sheet1"][j].displayName.toLowerCase().includes(e)
                    });

                    if (allMatch) {
                        //console.log(allMatch)


                        var arr = [item["Sheet1"][j].id]
                        executeFile.execute(message,arr)
                        return
                        //this method should be faster

                        // var objectTypeFile = require(`./../objects/0/${Math.floor(item["Sheet1"][j].id/256)}/${item["Sheet1"][j].id}.json`)
                        // if(objectTypeFile.type == `Loot`) {
                        //     console.log(item["Sheet1"][j].name, item["Sheet1"][j].id)
                        //     var arr = [item["Sheet1"][j].id]
                        //     executeFile.execute(message,arr)
                        //     return
                        // }
                    }
                }catch{

                }
            }
        }




    }
}
