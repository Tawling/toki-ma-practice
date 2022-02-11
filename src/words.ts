import { Settings } from './components/AppSettings';

export interface WordProgress {
    count: number;
    correct: number;
    recent: boolean[];
    recentCorrect: number;
    progress: number;
    lastInstance: number;
}

export interface ProgressMap {
    [key: string]: WordProgress | undefined;
}

export interface WordDef {
    [key: string]: string | string[] | undefined;
    images: string[];
    emoji: string;
    base: string;
    word: string;
    category?: string;
    etymology: string;
    short: string;
    noun?: string;
    verb?: string;
    modifier?: string;
    preposition?: string;
    particle?: string;
    numeral?: string;
}

interface WordListResponse {
    [language: string]: {
        labels: {
            [key: string]: string;
        };
        words: {
            [word: string]: {
                emoji: string;
                base: string;
                word: string;
                etymology: string;
                short: string;
                noun?: string;
                verb?: string;
                modifier?: string;
                preposition?: string;
                particle?: string;
                numeral?: string;
            };
        };
    };
}

interface ImagesResponse {
    [word: string]: string[];
}

interface CategoriesResponse {
    [category: string]: string[];
}

export const buildWordList = (settings: Settings, wordList: WordDef[]) =>
    wordList.filter((word) => settings[word.category || '']);

export const fetchWordList = async (language = 'English'): Promise<WordDef[]> => {
    const wordList = (await (await fetch('https://toki-ma.com/api/words.php')).json()) as WordListResponse;
    const defDict = wordList[language].words;
    const words = Object.keys(defDict).map((word) => defDict[word]);
    const wordsOnly = words.map(({word}) => word);
    const categories = (await (await fetch('./categories.json')).json()) as CategoriesResponse;
    validateCategories(wordsOnly, categories);
    const ordering = (await (await fetch('./order.json')).json()) as string[];
    validateOrdering(wordsOnly, ordering);
    const categoryKeys = Object.keys(categories);
    const imageSets = (await (await fetch('./images.json')).json()) as ImagesResponse;
    return words
        .map((word) => ({
            ...word,
            category:
                categoryKeys.find((key) => categories[key].includes(word.word)) ??
                {
                    noun: 'miscNouns',
                    verb: 'miscVerbs',
                    modifier: 'miscModifiers',
                    particle: 'particles',
                    preposition: 'prepositions',
                    numeral: 'numbers',
                    irregular: 'irregulars',
                }[word.base] ??
                '',
        }))
        .map((wordDef) => ({ ...wordDef, images: imageSets?.[wordDef.word] ?? [] }))
        .map((word) => ({ value: word, sort: ordering.indexOf(word.word) + 1 || 10000 }))
        .sort((a, b) => (a.sort - b.sort))
        .map(({ value }) => value);
};

const validateCategories = (
    words: string[],
    categories: {
        [category: string]: string[];
    },
) => {
    const flatCategories = Object.keys(categories).reduce((acc: string[], cat) => acc.concat(categories[cat]), [])
    const extraCategorized = flatCategories.filter((w) => !words.includes(w));
    const notCategorized = words.filter((w) => !flatCategories.includes(w));
    if (notCategorized.length) console.log('No category assigned to:', notCategorized);
    if (extraCategorized.length) console.log('Assigned category but not in word list:', extraCategorized);
};

const validateOrdering = (words: string[], ordering: string[]) => {
    const duplicates = ordering.filter((w, i) => ordering.indexOf(w, i+1) >= 0);
    if (duplicates.length) console.log("Duplicate words in ordering:", duplicates);
    const extraOrdered = ordering.filter((w) => !words.includes(w));
    const notOrdered = words.filter((w) => !ordering.includes(w));
    if (notOrdered.length) console.log('No ordering assigned to:', notOrdered);
    if (extraOrdered.length) console.log('Assigned order but not in word list:', extraOrdered);
};
