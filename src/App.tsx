import { useState, createContext } from 'react';
import AppSettings, { Settings, SettingsPartial } from './components/AppSettings';
import './App.scss';
import GameArea from './components/GameArea';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EngText from './components/common/EngText';
import TokiText from './components/common/TokiText';

import { version } from '../package.json';
import { useRefLocalStorage, useRefState } from './utils/hooks';
import { ProgressMap } from './words';

export const LanguageContext = createContext('eng');

function App() {
    const [language, setLanguage] = useState('eng');
    const [settings, settingsRef, setSettings, removeSettings] = useRefLocalStorage('tokimaSettings', {
        directions: true,
        animals: true,
        bodyParts: true,
        miscNouns: true,
        miscVerbs: true,
        colors: true,
        feelings: true,
        miscModifiers: true,
        prepositions: true,
        particles: true,
        numbers: true,
        showEnglishAnswers: true,
        reverseCards: false,
        randomReversal: false,
        autoplay: false,
        enableProgression: true,
        useBaseForm: true,
    } as Settings);
    const [progressMap, progressMapRef, setProgressMap, removeProgressMap] = useRefLocalStorage(
        'tokimaProgress',
        {} as ProgressMap,
    );

    const [showModal, setShowModal] = useState(false);
    console.log(showModal);
    return (
        <LanguageContext.Provider value={language}>
            <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader closeButton>Reset All Progress?</ModalHeader>
                <ModalBody>This will reset all word learning data permanently.</ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="primary"
                        onClick={() => {
                            removeProgressMap();
                            setShowModal(false);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className="App">
                <header className="App-header">
                    <h1>
                        <EngText>Toki Ma Practice Flashcards</EngText>
                        <TokiText>pali sona pi toki ma</TokiText>
                        <span style={{ fontSize: '0.3em', fontWeight: 100, marginLeft: 10 }}> (version {version})</span>
                    </h1>
                    <div className="header-buttons">
                        {/* <div className="language-select">
                            <Button type="button" onClick={() => setLanguage(language === 'eng' ? 'toki' : 'eng')}>
                                Switch Interface Language
                            </Button>
                        </div> */}
                        <div>
                            <Button type="button" onClick={() => setShowModal(true)}>
                                Reset Learning Progress
                            </Button>
                        </div>
                    </div>
                </header>
                {settings && <AppSettings
                    settings={settings}
                    updateSettings={(partial: SettingsPartial) => setSettings({ ...settings, ...partial })}
                />}
                
                <GameArea
                    settings={settings}
                    settingsRef={settingsRef}
                    progressMapRef={progressMapRef}
                    setProgressMap={setProgressMap}
                />
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
