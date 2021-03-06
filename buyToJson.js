var fs = require(`fs`)
var buy = require(`./commandsNoDiscord/buy.js`)
var num = 12809
var ok = buy.execute([num])

console.log(ok)

fs.writeFile(`./Buy/${Math.floor(num/256)}/${num}.json`, JSON.stringify(ok), function (err) {
        if (err) throw err;
        console.log(`completed ${num}`);
    }
);
