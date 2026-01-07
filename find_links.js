const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\saksham\\Downloads\\pendragoncycle.com (1)\\pendragoncycle.com\\_next\\static\\chunks\\153-12f1039551e1e429.js', 'utf8');
const logStream = fs.createWriteStream('match_output.txt');
function log(msg) {
    console.log(msg);
    logStream.write(msg + '\n');
}

function findIndices(substring) {
    const indices = [];
    let i = -1;
    while ((i = content.indexOf(substring, i + 1)) >= 0) {
        indices.push(i);
        // Print surrounding context
        log(`Match for '${substring}' at ${i}: ...${content.substring(i - 100, i + 100)}...`);
    }
    return indices;
}

const idx = content.indexOf('leftUrlQuery');
if (idx >= 0) {
    log(`Content dump: ...${content.substring(1400, 3000)}...`);
}
