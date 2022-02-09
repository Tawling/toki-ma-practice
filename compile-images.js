const fs = require('fs');

const json = {};
fs.readdirSync('./words').forEach((word) => {
    const images = fs.readdirSync(`./words/${word}`);
    if (images.length) {
        json[word] = images.map((fn) => `./images/${word}/${fn}`);
    }
});

fs.writeFileSync('./public/images.json', JSON.stringify(json, undefined, 2));
