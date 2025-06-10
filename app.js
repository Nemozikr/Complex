const fs = require('node:fs');
const process = require('node:process');
const readline = require('readline');

const args = process.argv.splice(2);

if (args[0] !== 'complex') throw Error(`${args[0]} is not a complex command`);

const search = {
    fileExt: '.cx',
    i: 0,
    j: this.i + 3,
    previous: null,
    current: null,
    foundFile: false,
    fileName: null,
    reset() {
        this.i = 0; 
        this.j = this.i + 3;
        this.previous = this.current
        this.current = null;
    },
    next() {
        this.i++;this.j++;
    },
    set(value) {
        this.previous = this.current;
        this.current = value;
    }

}
for (let arg = 0; arg < args.length; arg++) {
    const argStr = args[arg]
    for (search; search.j <= argStr.length; null) {
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

let lineNum = 0;


reader.on('line', function (line) {
    lineNum++;
    console.log(line)
})