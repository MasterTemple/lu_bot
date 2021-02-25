
const fs = require('fs');
const commandFiles = fs.readdirSync('./tables/SkillBehavior').filter(file => file.endsWith('.json'));
var array = []
for (const file of commandFiles) {
    //const command = require(`C:/Users/Blake The Great/Downloads/lubot//lu-json-master/tables/SkillBehavior/${file}`);
    //console.log(`{"cooldowngroup": "${command.cooldowngroup}", "skillID": "${command.skillID}"},`)
    array.push(file.substring(0,file.length-5))
}
const cool = require(`./cooldown.json`)
//console.log(cool["0"])
//let skillID = cool[0].skillID["0"]
//console.log(skillID)
//var behav_folder_loc = Math.floor(skillID / 256)
//console.log(behav_folder_loc)
//var skillBehavior = require(`C:/Users/Blake The Great/Downloads/lubot/lu-json-master/tables/SkillBehavior/${skillID}.json`)
//console.log(skillBehavior)
//console.log(array)


//console.log(newarray)


var skillIDArrayfull = [1, 881, 882, 883, 884, 885, 886, 887, 888, 5, 13, 146, 291, 361, 360, 306, 547, 31, 239, 34, 33, 228, 249, 285, 1133, 363, 372, 636, 370, 898, 36, 90, 515, 756, 145, 55, 290, 377, 10, 182, 43, 47, 102, 99, 808, 371, 369, 843, 543, 288, 127, 126, 526, 362, 544, 804, 248, 247, 635, 637, 553, 538, 67, 71, 75, 70, 78, 793, 426, 752, 794, 759, 897, 667, 668, 892, 221, 681, 519, 513, 103, 95, 809, 321, 541, 523, 152, 192, 546, 119, 106, 105, 116, 115, 117, 118, 772, 111, 112, 113, 114, 773, 289, 150, 125, 128, 129, 834, 835, 836, 138, 151, 137, 139, 521, 148, 149, 147, 154, 155, 158, 330, 160, 161, 771, 279, 573, 574, 167, 165, 171, 175, 176, 768, 500, 335, 891, 187, 205, 206, 238, 181, 183, 186, 874, 766, 1134, 214, 215, 216, 190, 202, 193, 229, 230, 833, 329, 194, 195, 196, 197, 198, 199, 201, 200, 747, 926, 303, 209, 203, 208, 212, 240, 163, 848, 850, 849, 851, 305, 218, 44, 45, 46, 219, 220, 368, 223, 227, 224, 225, 226, 66, 925, 499, 237, 583, 594, 525, 854, 852, 855, 241, 265, 337, 725, 895, 556, 875, 899, 872, 539, 243, 179, 266, 1429, 549, 325, 314, 865, 845, 811, 728, 315, 813, 298, 246, 287, 269, 270, 272, 268, 520, 271, 293, 294, 295, 542, 276, 548, 304, 309, 310, 311, 312, 322, 313, 278, 316, 317, 318, 806, 805, 324, 327, 328, 332, 333, 777, 624, 346, 445, 778, 779, 575, 576, 625, 626, 449, 450, 378, 476, 1363, 477, 478, 475, 593, 600, 355, 433, 434, 451, 711, 595, 712, 596, 713, 342, 565, 358, 634, 345, 577, 338, 655, 383, 649, 1088, 1089, 1090, 458, 459, 460, 1075, 1076, 1077, 1055, 1056, 1057, 631, 632, 633, 1070, 1071, 1072, 1094, 1099, 1100, 572, 605, 645, 646, 1081, 1082, 1558, 1083, 1559, 1043, 1042, 1364, 1038, 1365, 601, 602, 603, 1059, 1060, 1061, 604, 708, 639, 709, 640, 710, 1093, 550, 606, 482, 1058, 599, 1091, 1092, 558, 571, 609, 647, 673, 689, 690, 1073, 336, 397, 398, 348, 354, 356, 357, 280, 359, 585, 399, 470, 866, 471, 798, 615, 613, 844, 610, 789, 792, 839, 856, 508, 510, 512, 832, 494, 498, 589, 396, 401, 400, 532, 405, 407, 408, 409, 411, 429, 454, 455, 457, 461, 464, 465, 627, 484, 485, 937, 938, 486, 487, 490, 492, 491, 493, 853, 497, 501, 580, 1013, 480, 511, 554, 862, 365, 376, 859, 861, 860, 858, 959, 863, 837, 817, 1373, 890, 557, 274, 281, 277, 283, 939, 292, 876, 531, 555, 867, 868, 551, 527, 524, 528, 900, 570, 579, 1012, 628, 688, 659, 864, 842, 880, 802, 831, 754, 611, 616, 617, 618, 619, 620, 621, 622, 623, 629, 630, 643, 644, 755, 650, 799, 656, 657, 658, 675, 748, 791, 1304, 841, 840, 676, 678, 679, 686, 770, 901, 692, 687, 696, 697, 699, 700, 701, 826, 722, 731, 732, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 733, 760, 761, 762, 448, 790, 787, 788, 607, 1336, 1337, 481, 750, 751, 749, 818, 820, 821, 822, 823, 838, 847, 795, 796, 50, 869, 928, 488, 929, 933, 936, 1211, 1212, 53, 1305, 1306, 879, 889, 382, 893, 1068, 1069, 1048, 1049, 1078, 1079, 894, 896, 373, 906, 907, 909, 910, 911, 902, 903, 904, 908, 912, 905, 913, 919, 922, 916, 920, 914, 923, 917, 921, 915, 924, 918, 489, 930, 932, 931, 935, 943, 1122, 944, 1123, 947, 949, 948, 950, 945, 946, 1587, 1224, 1227, 994, 1248, 1130, 1228, 1114, 1159, 1199, 951, 952, 814, 1202, 940, 941, 958, 1200, 942, 955, 402, 957, 970, 1146, 364, 1007, 975, 976, 1156, 978, 977, 979, 1327, 982, 989, 980, 984, 985, 986, 987, 996, 991, 990, 993, 995, 997, 1000, 998, 999, 1412, 992, 1003, 1004, 1005, 988, 1006, 1008, 1018, 1010, 1011, 1014, 1016, 1017, 1009, 1265, 1015, 1266, 1019, 1264, 1020, 49, 1021, 1267, 1033, 1034, 52, 1023, 1022, 1268, 1024, 1310, 1643, 1567, 1646, 1560, 1644, 1565, 1645, 1025, 1027, 1028, 1136, 1154, 286, 1142, 1231, 1239, 1233, 1328, 1112, 1140, 1210, 1274, 374, 1234, 1329, 1330, 1237, 1144, 1241, 1126, 1148, 1151, 1153, 1152, 1147, 1116, 1108, 1109, 1139, 1029, 1030, 1031, 1032, 1269, 1036, 1270, 1037, 1271, 1039, 1040, 1041, 1044, 1045, 1046, 1047, 1052, 1367, 1053, 1368, 1054, 1369, 1062, 1063, 1064, 1065, 1066, 1067, 1085, 1086, 1087, 1107, 1537, 1119, 1129, 1216, 1439, 1138, 1196, 1236, 1203, 1213, 1214, 1215, 1225, 1226, 1217, 1218, 1219, 1331, 1332, 1334, 1262, 1333, 1257, 1251, 1245, 1229, 1256, 1232, 1235, 1417, 1252, 1244, 1246, 1255, 1250, 1434, 1263, 1247, 1335, 1253, 1254, 1260, 1261, 1349, 1275, 1338, 1238, 1223, 1276, 1282, 1283, 1286, 1277, 1278, 1348, 1287, 1284, 1285, 1291, 1295, 1294, 1293, 1292, 1584, 1585, 1586, 1383, 1384, 1651, 1378, 1380, 1387, 1388, 428, 1391, 1386, 1381, 1382, 412, 1354, 1353, 1322, 1342, 1343, 1313, 1344, 1346, 1345, 1317, 1371, 1347, 1340, 1355, 1356, 1357, 1352, 1435, 381, 1594, 827, 1628, 1590, 1602, 829, 1629, 1605, 830, 1631, 1603, 828, 1630, 1374, 1366, 1573, 1375, 1376, 1510, 1511, 1513, 1512, 1497, 1498, 1377, 1379, 1542, 1500, 1501, 1502, 1503, 1509, 1514, 1504, 1392, 1396, 1397, 1398, 1399, 1400, 1401, 1404, 1403, 1402, 1405, 1406, 1407, 1408, 1411, 1415, 1414, 1413, 1418, 1420, 1430, 1421, 1425, 1427, 1426, 1432, 1423, 1637, 1442, 1444, 1636, 1451, 1456, 1545, 1454, 1638, 1468, 1469, 1473, 1475, 1476, 1477, 1478, 1479, 1460, 1461, 1463, 1464, 1641, 1549, 1481, 375, 1462, 1550, 1487, 1557, 1499, 1505, 1506, 1515, 1518, 1519, 1521, 1517, 1524, 1529, 1525, 1530, 1526, 1531, 1527, 1532, 1534, 1535, 1538, 1639, 1649, 1563, 1564, 1569, 1574, 1575, 1570, 1571, 1572, 1640, 1650, 1656, 1672, 1680, 1681, 1682, 1683]
var skillIDArray = [361, 360, 363, 372, 370, 10, 371, 369, 288, 126, 362, 248, 247, 321, 289, 573, 574, 335, 195, 196, 197, 198, 368, 223, 325, 314, 315, 298, 378, 476, 477, 478, 451, 595, 596, 342, 358, 345, 338, 1094, 1099, 1100, 572, 1082, 1083, 1042, 1038, 604, 639, 640, 365, 376, 859, 860, 858, 364, 979, 982, 1009, 1015, 1019, 1021, 1022, 1310, 1567, 1560, 1565, 1233, 374, 1234, 1032, 1036, 1037, 1537, 1119, 1331, 1332, 1262, 1235, 1371, 381, 1590, 1497, 1456, 1461, 1463, 1464, 375]
var skillIDArraySorted = [10,126,195,196,197,198,223,247,248,288,289,298,314,315,321,325,335,338,342,345,358,360,361,362,363,364,365,368,369,370,371,372,374,375,376,378,381,451,476,477,478,572,573,574,595,596,604,639,640,858,859,860,979,982,1009,1015,1019,1021,1022,1032,1036,1037,1038,1042,1082,1083,1094,1099,1100,1119,1233,1234,1235,1262,1310,1331,1332,1371,1456,1461,1463,1464,1497,1537,1560,1565,1567,1590]
/*
for(const i of skillIDArraySorted){
    console.log(`"${i}":{`)
    var cooldownFile = require(`C:/Users/Blake The Great/Downloads/lubot/lu-json-master/tables/SkillBehavior/${i}.json`)
    console.log(`"cooldown": "${cooldownFile.cooldown}", "cooldowngroup": "${cooldownFile.cooldowngroup}","armorBonusUI": "${cooldownFile.armorBonusUI}","lifeBonusUI": "${cooldownFile.lifeBonusUI}","imBonusUI": "${cooldownFile.imBonusUI}","imaginationcost": "${cooldownFile.imaginationcost}","${i}":[`)
    for(var l=0;l<256*66;l++){
        var id = i
        var folder_loc = Math.floor(l / 256)
        var item_loc = l
//`C:/Users/Blake The Great/Downloads/lubot/lu-json-master`
        try {
            var item = require(`C:/Users/Blake The Great/Downloads/lubot/lu-json-master/objects/0/${folder_loc}/${item_loc}.json`);
            for (var k = 0; k < item.skills.length; k++) {
                if(item.type != "Loot" || item.skills.length < 0){
                    k = item.skills.length
                }

                if(item.id != null && item.displayName != null && item.id != undefined && item.displayName != undefined && id == item.skills[k].skillID) {
                    //console.log(`"id_${item.id}": "${item.id}", "item": "${item.displayName}",`)
                    console.log(`{"id": "${item.id}", "item": "${item.displayName}"},`)

                }
                // if(item.id != null && item.displayName != null && item.id != undefined && item.displayName != undefined && id == item.skills[k].skillID) {
                //     console.log(`"id": "${item.id}", "item": "${item.displayName}",`)
                // }
            //var skillID = (item.skills[i].skillID)
            //console.log(`"${i}":{"item":${id}, "skillID":${item.skills[k].skillID}},`)
            //skillz.push(item.skills[k].skillID)
            }
            //if(item.id != null && item.displayName != null && item.id != undefined && item.displayName != undefined && id == item.skills[item.skills.length-1].skillID) {
            //    console.log(`"id": "${item.id}", "item": "${item.displayName}"`)
            //}


        } catch {
            //console.log(`Object ${id} DNE`)

        }
    }
    console.log(`],\n},`)


}
*/
// var file = fs.createWriteStream('array.txt');
// file.on('error', function(err) { /* error handling */ });
// skillz.forEach(function(v) { file.write(skillz.join(', ') + '\n'); });
// file.end();
const cooldowngroup = require(`./cooldowngroupwithid.json`)

//console.log(cooldowngroup[1].skillID)
var skillID = 298
const cooldownbyid = require(`./cooldownbyid.json`)
//console.log(cooldownbyid[skillID].list[0])

for (var k = 0; k < (Object.keys(cooldowngroup["null"].skillID).length);k++) {
    console.log(`"null" ${cooldowngroup["null"].skillID[k]-1}`)
}
console.log(`},`)

for (var i = 0; i<=103;i++){
    console.log(`"${i}":{`)

    for (var k = 0; k < (Object.keys(cooldowngroup[i].skillID).length);k++) {

        var tempSkillID = (cooldowngroup[i].skillID[k])-1
        //console.log(tempSkillID)
        //try{
            //console.log(``)
        if(cooldownbyid[tempSkillID]!=undefined){
            for (var j = 0; j < ((cooldownbyid[tempSkillID].list).length - 1); j++) {
                console.log(`${tempSkillID}:${cooldownbyid[tempSkillID].list[j].id}`)
            }
        }
        //} catch{//console.log(``);
            //}
        //console.log(`"${i}": ${tempSkillID} ${cooldownbyid[tempSkillID]}`)
    }
    console.log(`},`)

}
tempSkillID = "98"
console.log(cooldownbyid[1537].list[0].id)
console.log(cooldownbyid[1537].list.length)




// const all = require(`C:/Users/Blake The Great/Desktop/iis.json`)
// console.log(all.length)
// for(var i=0; i< 870;i++){
//     console.log(all['skillID']);
// }

//console.log(`array: ${array}`)
/*
var id = 7415
var folder_loc = Math.floor(id / 256)
var item_loc = id
var item = require(`./objects/0/${folder_loc}/${item_loc}.json`)
//console.log(`${item.name}`)
var isWeapon = false
var Armor = 0
var Health = 0
var Imagination = 0
for (var i = 0; i < item.skills.length; i++) {

//    var skillID = (item.skills[i].skillID)
    var behav_folder_loc = Math.floor(skillID / 256)
    var skillBehavior = require(`./locale/SkillBehavior/${behav_folder_loc}.json`)
    var dmg = skillBehavior[skillID].descriptionUI.substring(15, 20);
    var cooldownFile = require(`./tables/SkillBehavior/${skillID}.json`)
    //console.log(`cool: ${cooldownFile.cooldown}`)
    if(cooldownFile.cooldown != 0) {
        //console.log(`Cooldown Group: ${cooldownFile.cooldowngroup}\nItem Cooldown: ${cooldownFile.cooldown} seconds`)
    }


    if(cooldownFile.armorBonusUI != null){
        Armor = cooldownFile.armorBonusUI
    }
    if(cooldownFile.lifeBonusUI != null){
        Health = cooldownFile.lifeBonusUI
    }
    if(cooldownFile.imBonusUI != null){
        Imagination = cooldownFile.imBonusUI
    }

    if(i == item.skills.length-1) {
        //console.log(`Bonuses:`)
        //console.log(`Armor: ${Armor}`)
        //console.log(`Health: ${Health}`)
        //console.log(`Imagination: ${Imagination}`)
    }

    if (dmg[1] == '+') {
        //console.log(`Damage: ${dmg}`)
        isWeapon = true
    }

}


*/
