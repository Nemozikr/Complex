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
    {   type: "UNKNOWN", regex: /^(w|d|\s)+/ }
];

function Tokenise(file) {
    let source = file;
    let tokens = [];
    let nll = 0
    while (source.length > 0) {
        for (const {type, regex} of patterns) {
            const match = regex.exec(source);  
            if (match) {
                nll = 0;
                if (type) {
                    tokens.push({   type,   value: match[0] })
                    source = source.slice(match[0].length);
                    break;
                }
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