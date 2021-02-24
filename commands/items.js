module.exports = {
    name: ['items'],
    description: 'Info about several items in LEGO Universe',
    args: true,
    use: `items [args]`,
    example:[`items 7415 7416 7417`, `items 7415`],
    execute(message, args) {
        for(var k=0;k<args.length;k++){
            const func = require(`./item.js`);
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