// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.


function Search(args) {
    const search = {
        EXT: '.cmpx',
        i: 0,
        j: 5,
        previous: null,
        current: null,
        foundFile: false,
        fileName: null,
        reset() {
            search.i = 0; 
            search.j = search.i + 5;
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

    // Initial check is the command Complex related
    if (args[0] !== 'complex') throw Error(`${args[0]} is not a complex command`);

    for (let arg = 0; arg < args.length; arg++) {
        const argStr = args[arg]
        for (;search.j <= argStr.length;) {
            search.set(argStr.slice(search.i, search.j));
            if (search.current == search.EXT) {
                search.foundFile = true
                search.fileName = argStr;
                return search.fileName;
            }
            search.next()
        }
        search.reset(this)
    }
    if (!search.foundFile) throw Error("No executables found");
}

module.exports = Search;