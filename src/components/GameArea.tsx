import { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import { useRefLocalStorage, useRefState } from '../utils/hooks';
import { buildWordList, fetchWordList, ProgressMap, WordDef } from '../words';
import FlashCard from './FlashCard';
import { Settings } from './AppSettings';
import useAudio from 'react-use/lib/useAudio';

import up_arrow from '../assets/up-arrow.svg';
import down_arrow from '../assets/down-arrow.svg';
import left_arrow from '../assets/left-arrow.svg';
import right_arrow from '../assets/right-arrow.svg';
import audio_img from '../assets/audio.svg';

import './GameArea.scss';
import { weightedRandom } from '../utils/weightedRandom';

const RECENT_WORD_TRACK_COUNT = 8;
const RECENT_SEEN_SIZE = 100;

const ACTIVE_MIN = 5;
const NEW_MIN = 3;

interface Props {
    settings: Settings | undefined;
    settingsRef: React.MutableRefObject<Settings | undefined>;
    progressMapRef: React.MutableRefObject<ProgressMap | undefined>;
    setProgressMap: React.Dispatch<ProgressMap>;
}

const getWordPool = (wordList: WordDef[], progressMap: ProgressMap) => {
    const activeProgress = wordList
        .map(
            ({ word }) =>
                wordList.find((w) => w.word === word)
                    ? {
                          ...(progressMap?.[word] ?? {
                              count: 0,
                              correct: 0,
                              recent: Array(RECENT_WORD_TRACK_COUNT).fill(false) as boolean[],
                              recentCorrect: 0,
                              progress: 0,
                              lastInstance: 0,
                          }),
                          word,
                      }
                    : null,
            {},
        )
        .filter((progress) => progress !== null) as {
        word: string;
        count: number;
        correct: number;
        recent: boolean[];
        recentCorrect: number;
        progress: number;
        lastInstance: number;
    }[];
    const sortedProgress = activeProgress
        .map((value) => ({
            value,
            sort: value.count + 0.5 * (value.recentCorrect / RECENT_WORD_TRACK_COUNT),
        }))
        .sort((a, b) => b.sort - a.sort)
        .map(({ value }) => value);
    const activePool = [];
    const learnedPool = [];
    let unlearnedCount = 0;
    for (const wordProgress of sortedProgress) {
        if (wordProgress.recentCorrect / RECENT_WORD_TRACK_COUNT < 0.95) {
            activePool.push(wordProgress.word);
        } else {
            learnedPool.push(wordProgress.word);
        }
        if (wordProgress.recentCorrect / RECENT_WORD_TRACK_COUNT < 0.5) {
            unlearnedCount++;
        }
        if (activePool.length >= ACTIVE_MIN && unlearnedCount >= NEW_MIN) {
            break;
        }
    }
    return [activePool, learnedPool];
};

const GameArea = ({ settings, settingsRef, progressMapRef, setProgressMap }: Props) => {
    const [_wordCount, wordCountRef, setWordCount, removeWordCount] = useRefLocalStorage('wordCount', 0);
    const wordCount = _wordCount ?? 0;
    const [curWord, curWordRef, setCurWord] = useRefState(null as WordDef | null);
    const [fullWordList, fullWordListRef, setFullWordList] = useRefState([] as WordDef[]);
    const [activeWordList, activeWordListRef, setActiveWordList] = useRefState([] as WordDef[]);
    const [showAnswer, showAnswerRef, setShowAnswer] = useRefState(false);

    const [audio, audioState, audioControls, audioRef] = useAudio({
        src: `./sounds/${curWord?.word}.mp3`,
        autoPlay: settings?.autoplay,
    });

    const [reversed, setReversed] = useState(!!settings?.reverseCards);
    const [randomPoS, setPoS] = useState('noun');
    const [imageIndex, setImageIndex] = useState(-1);

    const [correctClass, setCorrectClass] = useState('correct-btn');
    const [wrongClass, setWrongClass] = useState('wrong-btn');

    const pickNewWord = () => {
        let nextWord: WordDef | undefined | null;
        if (settingsRef.current?.enableProgression) {
            const [activePool, learnedPool] = getWordPool(activeWordListRef.current, progressMapRef.current ?? {});
            console.log('pool', activePool, learnedPool);

            const activeList = activeWordListRef.current.filter(
                ({ word }) => word !== curWordRef.current?.word && activePool.includes(word),
            );
            const learnedList = activeWordListRef.current.filter(
                ({ word }) => word !== curWordRef.current?.word && learnedPool.includes(word),
            );
            const weights = activeList.map((word) => {
                const learnedness =
                    1 -
                    Math.pow(
                        (progressMapRef.current?.[word.word]?.recentCorrect ?? 0) / (RECENT_WORD_TRACK_COUNT + 0.2),
                        2,
                    );
                const staleness =
                    Math.min(
                        RECENT_SEEN_SIZE,
                        (wordCountRef.current ?? 0) - (progressMapRef.current?.[word.word]?.lastInstance ?? 0),
                    ) / RECENT_SEEN_SIZE;
                return learnedness * 0.69 + staleness * 0.3 + 0.01;
            });
            let selection;
            if (learnedList.length > 0) {
                selection =
                    activeList.length > 0
                        ? weightedRandom(
                              [...activeList, learnedList],
                              [
                                  ...weights,
                                  Math.min(1, Math.max(0, ACTIVE_MIN + NEW_MIN - weights.reduce((a, w) => a + w, 0))),
                              ],
                          )
                        : learnedList;
            } else {
                selection = activeList.length > 0 ? weightedRandom(activeList, weights) : null;
            }

            if (Array.isArray(selection)) {
                nextWord = selection[Math.floor(Math.random() * selection.length)];
            } else {
                nextWord = selection;
            }
        } else {
            nextWord = activeWordListRef.current[Math.floor(Math.random() * activeWordListRef.current.length)];
        }

        if (!!nextWord) {
            setCurWord(nextWord);
            setShowAnswer(false);
            setWordCount((wordCountRef?.current ?? 0) + 1);
            const validPoS = ['noun', 'verb', 'modifier', 'preposition', 'particle', 'numeral'].filter(
                (p) => nextWord?.[p],
            );
            setPoS(validPoS[Math.floor(Math.random() * validPoS.length)]);
            setReversed(
                !!(settingsRef.current?.randomReversal ? Math.random() >= 0.5 : settingsRef.current?.reverseCards),
            );
            setImageIndex(Math.floor(Math.random() * nextWord.images.length));
        } else {
            console.log('no word...');
        }
    };

    const markCorrect = (word: string) => {
        const oldProgress = progressMapRef.current?.[word];
        const newProgress = {
            count: (oldProgress?.count ?? 0) + 1,
            correct: (oldProgress?.correct ?? 0) + 1,
            recent: [...(oldProgress?.recent ?? []).slice(-RECENT_WORD_TRACK_COUNT + 1), true],
            recentCorrect: [...(oldProgress?.recent ?? []).slice(-RECENT_WORD_TRACK_COUNT + 1), true].reduce(
                (a, r) => a + +r,
                0,
            ),
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
            recent: [...(oldProgress?.recent ?? []).slice(-RECENT_WORD_TRACK_COUNT + 1), false],
            recentCorrect: [...(oldProgress?.recent ?? []).slice(-RECENT_WORD_TRACK_COUNT + 1), false].reduce(
                (a, r) => a + +r,
                0,
            ),
            progress: (oldProgress?.correct ?? 0) / ((oldProgress?.count ?? 0) + 1),
            lastInstance: wordCount,
        };
        setProgressMap({ ...progressMapRef.current, [word]: newProgress });
    };

    const markLearned = (word: string) => {
        const oldProgress = progressMapRef.current?.[word];
        const newProgress = {
            count: (oldProgress?.count ?? 0) + 1,
            correct: (oldProgress?.correct ?? 0) + 1,
            recent: Array(RECENT_WORD_TRACK_COUNT).fill(true),
            recentCorrect: RECENT_WORD_TRACK_COUNT,
            progress: ((oldProgress?.correct ?? 0) + 1) / ((oldProgress?.count ?? 0) + 1),
            lastInstance: wordCount,
        };
        setProgressMap({ ...progressMapRef.current, [word]: newProgress });
    };

    useEffect(() => {
        if (!settings?.randomReversal) {
            setReversed(!!settings?.reverseCards);
        }
    }, [settings?.reverseCards, settings?.randomReversal]);

    // Fetch word list on first load
    useEffect(() => {
        (async () => {
            const wordList = await fetchWordList();
            setFullWordList(wordList);
        })();
    }, []);

    // handle settings change
    useEffect(() => {
        if (settings) setActiveWordList(buildWordList(settings, fullWordList));
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
        if (!showAnswerRef.current) return;
        if (curWordRef.current) markCorrect(curWordRef.current.word);
        pickNewWord();
        setCorrectClass('correct-btn flash');
        setTimeout(() => setCorrectClass('correct-btn'), 50);
    };
    const handleWrongBtn = () => {
        if (!showAnswerRef.current) return;
        if (curWordRef.current) markWrong(curWordRef.current.word);
        pickNewWord();
        setWrongClass('wrong-btn flash');
        setTimeout(() => setWrongClass('wrong-btn'), 50);
    };

    const handleKey = (event: KeyboardEvent) => {
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

    if (!!!activeWordList.length) {
        return (
            <>
                <div className="game-buttons">
                    <Button disabled={true}>
                        Skip Word <img className="key-icon" src={left_arrow} />
                    </Button>
                    <Button disabled={true}>
                        {showAnswer ? 'Hide Answer' : 'Show Answer'} <img className="key-icon" src={right_arrow} />
                    </Button>
                    <Button className={correctClass} disabled={!true}>
                        Correct <img className="key-icon" src={up_arrow} />
                    </Button>
                    <Button className={wrongClass} disabled={!true}>
                        Wrong <img className="key-icon" src={down_arrow} />
                    </Button>
                </div>
                <div className="game-area">Loading word list...</div>
            </>
        );
    }

    const pos = settings?.useBaseForm ? curWord?.base : randomPoS;

    const tmCard = (
        <FlashCard isAnswer={false}>
            <div>
                {curWord ? (pos === 'modifier' ? '[sa] ' : pos === 'verb' ? '[li] ' : '') + curWord?.word : null}
                {audio}
                <br />
                <img
                    className="icon key-icon"
                    src={audio_img}
                    style={{ cursor: 'pointer', height: '1em' }}
                    onClick={() => {
                        audioControls.seek(0);
                        audioControls.play();
                    }}
                />
            </div>
        </FlashCard>
    );

    const defCard = (
        <FlashCard isAnswer={true}>
            {curWord?.[pos ?? curWord?.base] ??
                [
                    curWord?.noun,
                    curWord?.verb,
                    curWord?.modifier,
                    curWord?.preposition,
                    curWord?.particle,
                    curWord?.numeral,
                ].filter((a) => a)[0]}
        </FlashCard>
    );
    const imageCards =
        curWord?.images.map((url) => (
            <FlashCard key={url} isAnswer={true}>
                <img src={url} />
            </FlashCard>
        )) ?? [];

    return (
        <>
            <div className="game-buttons">
                <Button onClick={handleSkipBtn}>
                    Skip Word <img className="key-icon" src={left_arrow} />
                </Button>
                <Button onClick={handleShowBtn}>
                    {showAnswer ? 'Hide Answer' : 'Show Answer'} <img className="key-icon" src={right_arrow} />
                </Button>
                <Button className={correctClass} onClick={handleCorrectBtn} disabled={!showAnswer}>
                    Correct <img className="key-icon" src={up_arrow} />
                </Button>
                <Button className={wrongClass} onClick={handleWrongBtn} disabled={!showAnswer}>
                    Wrong <img className="key-icon" src={down_arrow} />
                </Button>
            </div>
            <div className="game-area">
                {reversed ? (
                    <>
                        {defCard}
                        {imageCards.length ? imageCards[imageIndex] : null}
                    </>
                ) : (
                    tmCard
                )}
            </div>
            {showAnswer ? (
                <>
                    <div className="game-area">
                        {reversed ? (
                            tmCard
                        ) : (
                            <>
                                {defCard}
                                {imageCards}
                            </>
                        )}
                    </div>
                    <div>
                        <a
                            href="javascript:void(0);"
                            onClick={() => {
                                if (curWord) markLearned(curWord.word);
                                pickNewWord();
                            }}
                            style={{ marginLeft: 50, fontSize: '0.8em' }}
                        >
                            I definitely know this word
                        </a>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default GameArea;
