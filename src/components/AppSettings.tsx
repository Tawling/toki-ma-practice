import ToggleSwitch from './common/ToggleSwitch';
import './AppSettings.scss';
import { Button, ButtonGroup, Collapse } from 'reactstrap';
import { useEffect, useState } from 'react';
import EngText from './common/EngText';
import TokiText from './common/TokiText';

export interface Settings {
    [key: string]: boolean;
    directions: boolean;
    animals: boolean;
    bodyParts: boolean;
    miscNouns: boolean;
    miscVerbs: boolean;
    colors: boolean;
    feelings: boolean;
    miscModifiers: boolean;
    prepositions: boolean;
    particles: boolean;
    numbers: boolean;
    showEnglishAnswers: boolean;
    reverseCards: boolean;
    randomReversal: boolean;
    autoplay: boolean;
    enableProgression: boolean;
    useBaseForm: boolean;
}

export interface SettingsPartial {
    directions?: boolean;
    animals?: boolean;
    bodyParts?: boolean;
    miscNouns?: boolean;
    miscVerbs?: boolean;
    colors?: boolean;
    feelings?: boolean;
    miscModifiers?: boolean;
    prepositions?: boolean;
    particles?: boolean;
    numbers?: boolean;
    showEnglishAnswers?: boolean;
    reverseCards?: boolean;
    randomReversal?: boolean;
    autoplay?: boolean;
    enableProgression?: boolean;
    useBaseForm?: boolean;
}

interface Props {
    updateSettings(partial: SettingsPartial): void;
    settings: Settings;
}

const AppSettings = ({ settings, updateSettings }: Props) => {
    const [collapseWords, setCollapseWords] = useState(true);
    const [collapseSettings, setCollapseSettings] = useState(true);
    const [cardType, setCardType] = useState(2);

    useEffect(() => {
        if (cardType === 0) {
            updateSettings({ reverseCards: false });
            updateSettings({ randomReversal: false });
        } else if (cardType === 1) {
            updateSettings({ reverseCards: true });
            updateSettings({ randomReversal: false });
        } else {
            updateSettings({ reverseCards: false });
            updateSettings({ randomReversal: true });
        }
    }, [cardType]);
    return (
        <div className="settings-container">
            <span className="setting-group-heading" onClick={() => setCollapseWords(!collapseWords)}>
                <EngText>Words</EngText>
                <TokiText>nimi</TokiText>
                <span>{collapseWords ? ' ⮞' : ' ⮟'}</span>
            </span>
            <Collapse isOpen={!collapseWords}>
                <div className="setting-group">
                    <div className="setting-subgroup">
                        <ToggleSwitch
                            checked={settings.directions}
                            onChange={(value: boolean) => updateSettings({ directions: value })}
                        >
                            <EngText>Locative Nouns / Directions</EngText>
                            <TokiText>nimi pi an</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.animals}
                            onChange={(value: boolean) => updateSettings({ animals: value })}
                        >
                            <EngText>Animals</EngText>
                            <TokiText>nimi janwa</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.bodyParts}
                            onChange={(value: boolean) => updateSettings({ bodyParts: value })}
                        >
                            <EngText>Body Parts</EngText>
                            <TokiText>nimi pi osa tijelo</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.miscNouns}
                            onChange={(value: boolean) => updateSettings({ miscNouns: value })}
                        >
                            <EngText>Misc. Nouns</EngText>
                            <TokiText>nimi ante pi ijo</TokiText>
                        </ToggleSwitch>
                    </div>
                    <div className="setting-subgroup">
                        <ToggleSwitch
                            checked={settings.miscVerbs}
                            onChange={(value: boolean) => updateSettings({ miscVerbs: value })}
                        >
                            <EngText>Misc. Verbs</EngText>
                            <TokiText>nimi pali</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.colors}
                            onChange={(value: boolean) => updateSettings({ colors: value })}
                        >
                            <EngText>Colors</EngText>
                            <TokiText>nimi kule</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.feelings}
                            onChange={(value: boolean) => updateSettings({ feelings: value })}
                        >
                            <EngText>Emotions/Feelings</EngText>
                            <TokiText>nimi pilin</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.miscModifiers}
                            onChange={(value: boolean) => updateSettings({ miscModifiers: value })}
                        >
                            <EngText>Misc. Modifiers</EngText>
                            <TokiText>nimi ante pi ante e konta</TokiText>
                        </ToggleSwitch>
                    </div>
                    <div className="setting-subgroup">
                        <ToggleSwitch
                            checked={settings.prepositions}
                            onChange={(value: boolean) => updateSettings({ prepositions: value })}
                        >
                            <EngText>Prepositions</EngText>
                            <TokiText>nimi anta</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.particles}
                            onChange={(value: boolean) => updateSettings({ particles: value })}
                        >
                            <EngText>Particles</EngText>
                            <TokiText>nimi pi tewe e osa</TokiText>
                        </ToggleSwitch>
                    </div>
                    <div className="setting-subgroup">
                        <ToggleSwitch
                            checked={settings.numbers}
                            onChange={(value: boolean) => updateSettings({ numbers: value })}
                        >
                            <EngText>Numbers</EngText>
                            <TokiText>nimi nanpa</TokiText>
                        </ToggleSwitch>
                    </div>
                </div>
            </Collapse>
            <span className="setting-group-heading" onClick={() => setCollapseSettings(!collapseSettings)}>
                <EngText>Settings</EngText>
                <TokiText>saku</TokiText>
                <span>{collapseSettings ? ' ⮞' : ' ⮟'}</span>
            </span>
            <Collapse isOpen={!collapseSettings}>
                <div className="setting-group">
                    <div className="setting-subgroup">
                        {/* <ToggleSwitch
                            checked={settings.showEnglishAnswers}
                            onChange={(value: boolean) => updateSettings('showEnglishAnswers', value)}
                        >
                            <EngText>Show English Definitions</EngText>
                            <TokiText>li lukin wa e toki Inli</TokiText>
                        </ToggleSwitch> */}
                        <div style={{marginBottom: 1}}>
                            <ButtonGroup>
                                <Button
                                    color={cardType === 0 ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => setCardType(0)}
                                >
                                    Ask in toki ma
                                </Button>
                                <Button
                                    color={cardType === 1 ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => setCardType(1)}
                                >
                                    Answer in toki ma
                                </Button>
                                <Button
                                    color={cardType === 2 ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => setCardType(2)}
                                >
                                    Randomize
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <ButtonGroup>
                                <Button
                                    color={settings.useBaseForm ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => updateSettings({ useBaseForm: true })}
                                >
                                    Use base form
                                </Button>
                                <Button
                                    color={!settings.useBaseForm ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => updateSettings({ useBaseForm: false })}
                                >
                                    Randomize part of speech
                                </Button>
                            </ButtonGroup>
                        </div>
                        <ToggleSwitch
                            checked={settings.autoplay}
                            onChange={(value: boolean) => updateSettings({ autoplay: value })}
                        >
                            <EngText>Auto-Play Pronunciations</EngText>
                            <TokiText>autoplay</TokiText>
                        </ToggleSwitch>
                        <ToggleSwitch
                            checked={settings.enableProgression}
                            onChange={(value: boolean) => updateSettings({ enableProgression: value })}
                        >
                            <EngText>Progression-Based Learning Mode</EngText>
                            <TokiText>progression learning</TokiText>
                        </ToggleSwitch>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default AppSettings;
