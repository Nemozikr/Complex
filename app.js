const fs = require('node:fs');
const process = require('node:process');
const readline = require('readline');

const args = process.argv.splice(2);

if (args[0] !== 'complex') throw Error(`${args[0]} is not a complex command`);

const search = {
    fileExt: '.cx',
    i: 0,
    j: search.i + 3,
    previous: null,
    current: null,
    foundFile: false,
    fileName: null,
    reset() {
        search.i = 0; 
        search.j = search.i + 3;
        search.previous = search.current
        search.current = null;
    },
    next() {
        search.i++;search.j++;
    },
    set(value) {
        search.previous = search.current;
        search.current = value;
    }

}
for (let arg = 0; arg < args.length; arg++) {
    const argStr = args[arg]
    for (;search.j <= argStr.length;) {
        search.set(argStr.slice(search.i, search.j));
        if (search.current == search.fileExt) {
            search.foundFile = true
            search.fileName = argStr;
        }
        search.next()
    }
    search.reset(this)
}
if (!search.foundFile) throw Error("No executables found");


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

const type = ['let', 'const'];
const sign = ['+', '-'];
const symbol = [';'];

function evaluate(line) {
    if (line[3] === '=') {
        const val = line[4].replace(';', '');
        Complex.state.push({
            type: line[0],
            name: line[1],
            value: val,
        });
    }
}


function readUnderstand(line) {
    let i = 0;
    let current = '';
    let statement = {
        name: undefined,
        type: undefined,
    }
    do {
        // Read until ';' or end of line;
        current += line[i];

        if (type.includes(current.trim())) {
            statement.type = current.trim();
            current = '';
        }
        if (current === '=') {
            statement.name = current.trim()
        }
        i++;
    }while ( i < line.length );
}

reader.on('line', function (data) {
    Complex.process.line++;
    const line = data.split('');
    //console.log(parts)
    readUnderstand(line)
    
    console.log(Complex.state)
})