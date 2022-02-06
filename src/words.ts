import { Settings } from './components/AppSettings';

export interface WordDef {
    word: string;
    definitions: string[];
    images: string[];
    category: string;
}

interface WordListResponse {
    [category: string]: {
        [word: string]: {
            definitions: string[];
            images: string[];
        };
    };
}

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

export const fetchWordList = async () => {
    const response = (await (await fetch('/words.json')).json()) as WordListResponse;
    const words: WordDef[] = [];
    Object.keys(response).forEach((category) =>
        Object.keys(response[category]).forEach((word) =>
            words.push({
                word,
                category,
                definitions: response[category][word].definitions,
                images: response[category][word].images,
            }),
        ),
    );
    return words;
};

export const buildWordList = (settings: Settings, wordList: WordDef[]) =>
    wordList.filter((word) => settings[word.category]);

    const weightedRandom = <T>(items: T[], weights: number[]) => {
        let i;
        for (i = 0; i < weights.length; i++) weights[i] += weights[i - 1] || 0;
    
        const random = Math.random() * weights[weights.length - 1];
    
        for (i = 0; i < weights.length; i++) if (weights[i] > random) break;
    
        return items[i];
    };
