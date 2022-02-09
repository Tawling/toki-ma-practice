const fs = require('fs');

// const words = fs.readdirSync('./words');
// words.forEach((word) => {
//     const dir = fs.readdirSync(`./words/${word}`)
//     if (dir.includes('definition.txt')) {
//         fs.unlinkSync(`./words/${word}/definition.txt`)
//     }
// })

// const sss = fs.readdirSync('./public/sounds').map((s) => s.split('.')[0])
// const www = words.map((w) => w.split('.')[0])

// console.log(www.filter((w) => !sss.includes(w)))

// console.log(sss.filter((w) => !www.includes(w)))

const json = {};
fs.readdirSync('./words').forEach((word) => {
    const images = fs.readdirSync(`./words/${word}`);
    if (images.length) {
        json[word] = images.map((fn) => `./images/${word}/fn`);
    }
});

fs.writeFileSync('./public/images.json', JSON.stringify(json, undefined, 2));
