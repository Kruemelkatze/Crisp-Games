const fs = require('fs');

fs.rmSync("publish", { recursive: true, force: true });
fs.mkdirSync("publish");

fs.copyFileSync("docs/bundle.js", "publish/bundle.js");
fs.copyFileSync("docs/index.html", "publish/index.html");
console.log(`Copied bundle.[js,html]`);


var docsContents = fs.readdirSync("docs");
var games = docsContents.filter(name => name.match(/^[A-Z0-9]/));

var additionalFiles = docsContents.filter(name => name !== "bundle.js" && name.match(/\.js$/));
if (additionalFiles.length) {
    console.log(`\nFound additional files: ${additionalFiles.join(', ')}`);

    for (let file of additionalFiles) {
        fs.copyFileSync(`docs/${file}`, `publish/${file}`);
        console.log(`Copied ${file}`);
    }
}

console.log(`\nFound games: ${games.join(', ')}`);
for (const game of games) {
    fs.mkdirSync(`publish/${game}`);

    let gameFiles = fs.readdirSync(`docs/${game}`);
    for (let file of gameFiles) {
        if (file === "jsconfig.json") {
            continue;
        }

        fs.copyFileSync(`docs/${game}/${file}`, `publish/${game}/${file}`);
        console.log(`Copied ${game}/${file}`);
    }
}