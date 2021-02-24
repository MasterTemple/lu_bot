module.exports = {
    name: ['all'],
    description: 'Info about several objects in LEGO Universe',
    args: true,
    use: `all [args]`,
    example:[`all 6789 7415`, `all 7415`],
    execute(message, args) {
        for(var k=0;k<args.length;k++){
            const func = require(`./type.js`);
            try {
                var newARG = []
                newARG.push(args[k])

                func.execute(message, newARG);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
