var fs = require(`fs`)
var enemies = require(`./commandsNoDiscord/enemies.js`)
//var num = 6806
var listOfEnemies = [173,1729,1769,1800,1801,1802,1813,1822,1876,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,2167,2168,2170,2188,2223,2230,2244,2245,2248,2265,2266,2268,2352,2353,2565,2584,2585,2640,2703,2707,2708,2716,2776,2777,2778,2779,2813,2818,2888,2900,2901,2902,2969,2970,2973,2974,2976,2983,2984,3000,3018,3031,3033,3035,3045,3099,3118,3148,3204,3228,3260,3279,3284,3331,3332,3333,3334,3335,3719,3930,3931,3955,3956,4712,4978,5666,5877,5946,6015,6016,6253,6268,6297,6300,6308,6351,6359,6392,6408,6418,6444,6454,6457,6530,6537,6549,6550,6551,6552,6563,6598,6602,6621,6623,6629,6668,6716,6789,6806,6918,6919,6920,6940,6974,6975,6976,7151,7152,7227,7672,7679,7800,7801,7805,7815,7816,7833,7849,7865,7873,8088,8089,8090,8091,8096,8097,8222,8238,8433,8445,8512,8570,9313,9463,9744,9876,9896,10014,10015,10041,10145,10378,10379,10380,10381,10435,10495,10497,10498,10512,10695,10696,10697,11212,11213,11214,11215,11216,11217,11218,11219,11220,11225,11226,11259,11260,11265,11982,11983,11984,11985,11986,11987,11988,11989,11999,12000,12001,12002,12003,12004,12005,12012,12379,12387,12467,12468,12469,12511,12542,12575,12585,12586,12587,12588,12589,12590,12591,12600,12602,12604,12605,12609,12610,12611,12612,12653,12654,12892,12893,13068,13306,13523,13524,13952,13971,13995,14007,14008,14009,14024,14025,14026,14027,14028,14029,14381,14491,14572,14576,14720,16047,16048,16049,16050,16191,16197,16280,16282,16283,16289,16470,16471,16473,16474,16475,16511,16554,16555]
//16921
for(var num = 0;num < listOfEnemies.length;num++){

try{
    var jsonData = enemies.execute([listOfEnemies[num]])
    //var jsonData = enemies.execute([num])

    var keptData = {
        LootTable: jsonData.LootTable,
        LootMatrixIndex: jsonData.LootMatrixIndex,
        name: jsonData.name,
        displayName: jsonData.displayName,
        internalNotes: jsonData.internalNotes,
        description: jsonData.description,
        life: jsonData.life,
        armor: jsonData.armor,
        currencyIndex: jsonData.currencyIndex,
        level: jsonData.level,
        currencyTable: jsonData.currencyTable,
        behaviors: jsonData.behaviors,
        iconURL: jsonData.iconURL,
    }

    //console.log(jsonData)

    // fs.writeFile(`./Enemies/${Math.floor(num / 256)}/${num}.json`, JSON.stringify(jsonData), function (err) {
    fs.writeFile(`./EnemyInfo/${listOfEnemies[num]}.json`, JSON.stringify(keptData), function (err) {
            if (err) throw err;
            //console.log(`completed ${num}`);
        }
    );
}catch(e){
    console.log(e)
}

}
/*
//MODELS:
var keptData = {
    LootTable: jsonData.LootTable,
    LootMatrixIndex: jsonData.LootMatrixIndex,
    name: jsonData.name,
    displayName: jsonData.displayName,
    internalNotes: jsonData.internalNotes,
    description: jsonData.description,
    // life: jsonData.life,
    // armor: jsonData.armor,
    currencyIndex: jsonData.currencyIndex,
    level: jsonData.level,
    currencyTable: jsonData.currencyTable,
    //behaviors: jsonData.behaviors,
    iconURL: jsonData.iconURL,
}

//Info:
var keptData = {
    //LootTable: jsonData.LootTable,
    //LootMatrixIndex: jsonData.LootMatrixIndex,
    name: jsonData.name,
    displayName: jsonData.displayName,
    internalNotes: jsonData.internalNotes,
    description: jsonData.description,
    life: jsonData.life,
    armor: jsonData.armor,
    currencyIndex: jsonData.currencyIndex,
    level: jsonData.level,
    currencyTable: jsonData.currencyTable,
    behaviors: jsonData.behaviors,
    iconURL: jsonData.iconURL,
}
 */
