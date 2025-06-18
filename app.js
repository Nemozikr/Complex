// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.


const fs = require('node:fs');
const process = require('node:process');
const readline = require('readline');

const Tokenise = require('./src/tokeniser');
const Search = require('./src/cli-complex');


const fileName = Search(process.argv);

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
})