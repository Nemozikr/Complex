const fs = require('node:fs');
const process = require('node:process');
const readline = require('readline');

const Tokenise = require('./components/tokeniser');
const Search = require('./components/cli-complex');

const args = process.argv.splice(2);


if (args[0] !== 'complex') throw Error(`${args[0]} is not a complex command`);

const fileName = Search(args);

console.log(`Initialising ${fileName}\n`)
const reader = readline.createInterface({
    input: fs.createReadStream(`${fileName}`)
})

const Complex = {
    process: {
        line: 0,
    },
    state: []
}

reader.on('line', function (data) {
    Complex.process.line++;
    const tokens = Tokenise(data);
    //console.log(data)
    //console.log(Complex.state)
})