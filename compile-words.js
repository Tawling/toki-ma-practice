// Converts the word data from the format on toki-ma.com to a more organized format.
const tmData = require('./toki-ma-website-data.json');
const categories = require('./categories.json');

const wordLists = tmData.slice(2);

const languages = ['English', '简体中文', '繁體中文', 'हिंदी', 'Русский', 'Português', 'Deutsch'];

const languageLabels = [
    ['toki ma', 'Etymology', 'Short Definition', 'Verb', 'Noun', 'Modifier', 'Particle', 'Preposition', 'Numeral'],
    ['toki ma', '词源', '简略定义', '动词', '名词', '修饰词', '助词', '介词', '数词'],
    ['toki ma', '詞源', '簡略定義', '動詞', '名詞', '修飾詞', '助詞', '介詞', '數詞'],
    ['तोकी मा', 'मूल', 'मुख़तसिर अर्थ', 'क्रिया', 'संज्ञा', 'विशेषण', 'प्रतीक', 'पूर्वसर्ग', 'अंक'],
    [
        'токи ма',
        'Этимология',
        'Краткое значение',
        'Глагол',
        'Существительное',
        'Модификатор',
        'Частица',
        'Предлог',
        'Числительное',
    ],
    [
        'toki ma',
        'Etimologia',
        'Definição curta',
        'Verbo',
        'Substantivo',
        'Modificador',
        'Partícula',
        'Preposição',
        'Numeral',
    ],
    ['toki ma', 'Ethymologie', 'Kurzdefinition', 'Verb', 'Nomen', 'Modifizierer', 'Partikel', 'Präposition', 'Zahlen'],
];

const wordKeys = ['word', 'etymology', 'short', 'verb', 'noun', 'mod', 'particle', 'prep', 'numeral'];

const data = languages.reduce(
    (acc, lang, index) => ({
        ...acc,
        [lang]: {
            words: {},
            labels: {
                ...languageLabels[index].reduce((a, l, i) => ({ ...a, [wordKeys[i]]: l }), {}),
                emoji: '🗣️🌍',
                base: 'Part of Speech',
            },
        },
    }),
    {},
);

const getBase = (base) => {
    return { modifier: 'mod', preposition: 'prep' }[base] || base;
};

const getCategory = (word, base) => {
    for (const category in categories) {
        if (categories[category].includes(word)) {
            return category;
        }
    }
    return {
        verb: 'miscVerbs',
        noun: 'miscNouns',
        mod: 'miscModifiers',
        particle: 'particles',
        prep: 'prepositions',
        numeral: 'numbers',
    }[base];
};

wordLists.forEach((wordData) => {
    languages.forEach((lang, index) => {
        const d = {
            emoji: wordData[0],
            base: getBase(wordData[1]),
            category: getCategory(wordData[2], getBase(wordData[1])),
        };
        for (let i = 0; i < 9; i++) {
            wordData[2 + i + 9 * index] ? (d[wordKeys[i]] = wordData[2 + i + 9 * index]) : null;
        }
        data[lang]['words'][wordData[2]] = d;
    });
});

const fs = require('fs');
fs.writeFileSync('./public/words.json', JSON.stringify(data));
