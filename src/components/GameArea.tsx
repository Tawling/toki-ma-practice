import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Button } from 'reactstrap';
import { useRefLocalStorage, useRefState } from '../utils/use';
import { buildWordList, fetchWordList, pickWord, ProgressMap, WordDef } from '../words';
import FlashCard from './FlashCard';
import { Settings } from './AppSettings';

import './GameArea.scss';

interface Props {
    settings: Settings;
}

const GameArea = ({ settings }: Props) => {
    const [_wordCount, wordCountRef, setWordCount, removeWordCount] = useRefLocalStorage('wordCount', 0);
    const wordCount = _wordCount ?? 0;
    const [curWord, curWordRef, setCurWord] = useRefState(null as WordDef | null);
    const [recentWords, recentWordsRef, setRecentWords] = useRefState([] as string[]);
    const [fullWordList, fullWordListRef, setFullWordList] = useRefState([] as WordDef[]);
    const [activeWordList, activeWordListRef, setActiveWordList] = useRefState([] as WordDef[]);
    const [showAnswer, showAnswerRef, setShowAnswer] = useRefState(false);
    const [progressMap, progressMapRef, setProgressMap, removeProgressMap] = useRefLocalStorage(
        'progress',
        {} as ProgressMap
    );

    const pickNewWord = () => {
        const nextWord = pickWord(
            activeWordListRef.current,
            recentWordsRef.current,
            settings,
            progressMapRef.current ?? {}
        );
        console.log(nextWord);
        if (!!nextWord) {
            setRecentWords([...recentWords, nextWord.word]);
            setCurWord(nextWord);
            setShowAnswer(false);
            setWordCount(wordCount + 1);
        }
    };

    const markCorrect = (word: string) => {
        const oldProgress = progressMapRef.current?.[word];
        const newProgress = {
            count: (oldProgress?.count ?? 0) + 1,
            correct: (oldProgress?.correct ?? 0) + 1,
            progress: ((oldProgress?.correct ?? 0) + 1) / ((oldProgress?.count ?? 0) + 1),
            lastInstance: wordCount,
        };
        setProgressMap({ ...progressMapRef.current, [word]: newProgress });
    };

    const markWrong = (word: string) => {
        const oldProgress = progressMapRef.current?.[word];
        const newProgress = {
            count: (oldProgress?.count ?? 0) + 1,
            correct: oldProgress?.correct ?? 0,
            progress: (oldProgress?.correct ?? 0) / ((oldProgress?.count ?? 0) + 1),
            lastInstance: wordCount,
        };
        setProgressMap({ ...progressMapRef.current, [word]: newProgress });
    };

    // Fetch word list on first load
    useEffect(() => {
        (async () => {
            const wordList = await fetchWordList();
            setFullWordList(wordList);
        })();
    }, []);

    // handle settings change
    useEffect(() => {
        setActiveWordList(buildWordList(settings, fullWordList));
    }, [fullWordList, settings]);

    // handle word list change
    useEffect(() => {
        if (!!!curWord || activeWordList.filter((value) => value.word === curWord.word).length === 0) {
            pickNewWord();
        }
    }, [fullWordList, activeWordList]);

    const handleSkipBtn = () => {
        pickNewWord();
    };
    const handleShowBtn = () => {
        if (showAnswerRef.current) {
            // go to next?
            setShowAnswer(false);
        } else {
            setShowAnswer(true);
        }
    };
    const handleCorrectBtn = () => {
        if (curWordRef.current) markCorrect(curWordRef.current.word);
        pickNewWord();
    };
    const handleWrongBtn = () => {
        if (curWordRef.current) markWrong(curWordRef.current.word);
        pickNewWord();
    };

    const handleKey = (event: KeyboardEvent) => {
        console.log(event.key, event.code);
        switch (event.key) {
            case 'ArrowRight':
                event.preventDefault();
                handleShowBtn();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                handleSkipBtn();
                break;
            case 'ArrowUp':
                event.preventDefault();
                handleCorrectBtn();
                break;
            case 'ArrowDown':
                event.preventDefault();
                handleWrongBtn();
                break;
        }
    };

    // Listen for key inputs
    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <>
            <div className="game-buttons">
                <Button onClick={handleSkipBtn}>Skip Word</Button>
                <Button onClick={handleShowBtn}>Show Answer</Button>
                <Button onClick={handleCorrectBtn}>Correct</Button>
                <Button onClick={handleWrongBtn}>Wrong</Button>
            </div>
            <div className="game-area">
                <FlashCard isAnswer={false}>{curWord?.word}</FlashCard>
            </div>
            {showAnswer ? (
                <div className="game-area">
                    <FlashCard isAnswer={true}>{curWord?.definitions.join(', ')}</FlashCard>
                    {curWord?.images.map((url) => (
                        <FlashCard key={url} isAnswer={true}>
                            <img src={url} />
                        </FlashCard>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default GameArea;