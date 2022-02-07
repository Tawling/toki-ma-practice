const fs = require('fs');

const getWordDef = (section, word) => {
    return {
        definitions: fs
            .readFileSync(`./words/${section}/${word}/definition.txt`, { encoding: 'utf-8' })
            .split(/\r?\n/g),
        images: fs
            .readdirSync(`./words/${section}/${word}`)
            .filter((f) => f !== 'definition.txt')
            .map((f) => `./images/${section}/${word}/${f}`),
    };
};

const defs = fs.readdirSync('./words').reduce(
    (acc, section) => ({
        ...acc,
        [section]: fs
            .readdirSync(`./words/${section}`)
            .reduce((acc, word) => ({ ...acc, [word]: getWordDef(section, word) }), {}),
    }),
    {},
);

fs.writeFileSync('./public/words.json', JSON.stringify(defs, undefined, 2));
