import { useState, createContext } from 'react';
import AppSettings, { Settings } from './components/containers/AppSettings';
import './App.scss';
import GameArea from './components/containers/GameArea';
import { Button } from 'reactstrap';
import EngText from './components/common/EngText';
import TokiText from './components/common/TokiText';

export const LanguageContext = createContext('eng');

function App() {
    const [language, setLanguage] = useState('eng');
    const [settings, setSettings] = useState({
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
        askWithDefinitions: true,
    } as Settings);

    return (
        <LanguageContext.Provider value={language}>
            <div className='App'>
                <header className='App-header'>
                    <h1>
                        <EngText>Toki Ma Practice Flashcards</EngText>
                        <TokiText>pali sona pi toki ma</TokiText>
                    </h1>
                    <div className='language-select'>
                        <Button type='button' onClick={() => setLanguage(language === 'eng' ? 'toki' : 'eng')}>
                            Switch Language
                        </Button>
                    </div>
                </header>
                <AppSettings
                    settings={settings}
                    updateSettings={(settingName, value) => setSettings({ ...settings, [settingName]: value })}
                />
                <GameArea settings={settings}/>
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
