import { Settings } from './components/AppSettings';

// export interface WordDef {
//     word: string;
//     definitions: string[];
//     images: string[];
//     category: string;
// }

// interface WordListResponse {
//     [category: string]: {
//         [word: string]: {
//             definitions: string[];
//             images: string[];
//         };
//     };
// }

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

export const buildWordList = (settings: Settings, wordList: WordDef[]) =>
    wordList.filter((word) => settings[word.category || '']);

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

export interface WordDef {
    [key:string]: string | string[] | undefined;
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

interface ImagesResponse {
    [word: string]: string[];
}

interface CategoriesResponse {
    [category: string]: string[];
}
export const fetchWordList = async (language = 'English'): Promise<WordDef[]> => {
    const wordList = (await (await fetch('https://toki-ma.com/api/words.php')).json()) as WordListResponse;
    const defDict = wordList[language].words;
    const words = Object.keys(defDict).map((word) => defDict[word]);
    const categories = (await(await fetch('./categories.json')).json()) as CategoriesResponse;
    const categoryKeys = Object.keys(categories);
    const imageSets = (await (await fetch('./images.json')).json()) as ImagesResponse;
    return words.map((word) => ({ ...word, category: categoryKeys.find((key) => categories[key].includes(word.word))}))
        .map((wordDef) => ({ ...wordDef, images: imageSets?.[wordDef.word] ?? [] }))
        .map((word) => ({ value: word, sort: word.category ?? 'zzzz' })).sort((a, b) => (a.sort < b.sort ? -1 : (a.sort > b.sort ? 1 : 0))).map(({value}) => value);
};
