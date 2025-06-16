const fs = require('node:fs');
const process = require('node:process');
const readline = require('readline');

const Tokenise = require('./components/tokeniser');
const Search = require('./components/cli-complex');

const args = process.argv.splice(2);


if (args[0] !== 'complex') throw Error(`${args[0]} is not a complex command`);

Search(args);

console.log(`Initialising ${search.fileName}\n`)
const reader = readline.createInterface({
    input: fs.createReadStream(`${search.fileName}`)
})

const Complex = {
    process: {
        line: 0,
    },
    state: []
}

reader.on('line', function (data) {
    Complex.process.line++;
    const line = data.split();
    //console.log(parts)
    readUnderstand(line)
    
    console.log(Complex.state)
})