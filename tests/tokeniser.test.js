// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.


const Tokenise = require('../src/tokeniser');

const answer = 'let x = 1;'

const tokens = Tokenise(answer);

let result = '';
for (const token of tokens) {
    result+= token.value
}

test("Tokenise and reconstruct input string correctly", () => {
    expect(result).toBe(answer);
})