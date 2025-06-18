// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.


const patterns = [
    {   type: "WHITESPACE", regex: /^(\s+)/   },
    {   type: "NUMBER", regex: /^(\d+(\.\d+)?)/  },
    {   type: "DOUBLE_QUOTES", regex: /^("(?:\\.|[^"\\])*")/   },
    {   type: "SINGLE_QUOTES", regex: /^('(?:\\.|[^'\\])*)'/  },
    {   type: "MODE_KEYWORD", regex: /^(Set|optimised|complex|burst)/},
    {   type: "STARTERS", regex: /^(let|const|state|eventzone|zone|mergeskip|merge|skip)/  },
    {   type: "KEYWORDS", regex: /^(dropIf|on|off)/},
    {   type: "IDENTIFIER", regex: /^(\b[a-zA-Z_][a-zA-Z0-9_]*\b)/   },
    {   type: "BOOL_LOGIC", regex: /^(==|!=|<=|>=|=>|::|&&|\|\|)/   },
    {   type: "SYMBOLS", regex: /^([;{}()\[\]=+\-*/\.,])/ },
];

function Tokenise(file, {KeepWhitespace, KeepComments} = true) {
    let source = file;
    let tokens = [];
    let nll = 0
    while (source.length > 0) {
        for (const {type, regex} of patterns) {
            const match = regex.exec(source);  

            if ((type === 'WHITESPACE' && KeepWhitespace == false) 
                || type === 'COMMENTS' && KeepComments == false) {
                nll = 0;
                source = source.slice(match[0].length);
                break;
            } else if (match) {
                nll = 0;
                tokens.push({   type,   value: match[0] })
                source = source.slice(match[0].length);
                break;
            }
            
            
            if (match === null) {
                nll++;
                if (nll >= 10) {
                    throw new Error("Lexer stuck: unable to match next token in source: " + source.slice(0, 25));
                }
            }
        }
    }
    return tokens;
};

module.exports = Tokenise;