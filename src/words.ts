import { Settings } from './components/containers/AppSettings';

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
            })
        )
    );
    return words;
};

export const buildWordList = (settings: Settings, wordList: WordDef[]) =>
    wordList.filter((word) => settings[word.category]);

export const pickWord = (
    wordList: WordDef[],
    recentWords: string[],
    settings: Settings,
    progressMap: ProgressMap
): WordDef | null => {
    // TODO: take recent words and settings into account
    return wordList.length > 0 ? wordList[Math.floor(Math.random() * wordList.length)] : null;
};
