const patterns = [
    {   type: "WHITESPACE", regex: /^\s+/   },
    {   type: "NUMBER", regex: /^\d+(\.\d+)?/  },
    {   type: "STRING", regex: /^"(?:\\.|[^"\\])*"|^'(?:\\.|[^'\\])*'/   },
    {   type: "KEYWORD", regex: /^(let|const|state|Set|zone|dropIf|complex|merge|skip|mergeskip|eventzone|on|off)/  },
    {   type: "IDENTIFIER", regex: /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/   },
    {   type: "SYMBOL", regex: /^(==|!=|<=|>=|=>|::|&&|\|\||[;{}()\[\]=+\-*/.,])/   },
];

function Tokenise(file) {
    let source = file;
    let tokens = [];
    let nll = 0
    while (source.length > 0) {
        for (const {type, regex} of patterns) {
            const match = regex.exec(source);
            if (type === "WHITESPACE") break;
            if (match) {
                tokens.push({   type,   value: match[0] })
                source = source.slice(match[0].length);
                console.log(tokens)
                console.log(source)
                nll = 0;
                break;
            }
            
            if (match === null) {
                nll++;
                if (nll > 10) {
                    throw new Error("Lexer stuck: unable to match next token in source: " + source.slice(0, 20));
                }
            }
        }
    }
    console.log(tokens);
};

module.exports = Tokenise;