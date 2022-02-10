import ToggleSwitch from './common/ToggleSwitch';
import './AppSettings.scss';
import { Button, ButtonGroup, Collapse } from 'reactstrap';
import { useEffect, useState } from 'react';
import EngText from './common/EngText';
import TokiText from './common/TokiText';

import chevron from './../assets/chevron.svg';

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
    useRandomForm: boolean;
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
    useRandomForm?: boolean;
}

interface Props {
    updateSettings(partial: SettingsPartial): void;
    settings: Settings;
}

const AppSettings = ({ settings, updateSettings }: Props) => {
    const [collapseWords, setCollapseWords] = useState(true);
    const [collapseSettings, setCollapseSettings] = useState(true);
    const [cardType, setCardType] = useState(settings.randomReversal ? 2 : (settings.reverseCards ? 1 : 0));
    const [definitionType, setDefinitionType] = useState(settings.useRandomForm ? 2 : (settings.useBaseForm ? 1 : 0));

    useEffect(() => {
        if (cardType === 0) {
            updateSettings({ reverseCards: false, randomReversal: false });
        } else if (cardType === 1) {
            updateSettings({ reverseCards: true, randomReversal: false });
        } else {
            updateSettings({ reverseCards: false, randomReversal: true });
        }
    }, [cardType]);

    useEffect(() => {
        if (definitionType === 0) {
            updateSettings({ useBaseForm: false, useRandomForm: false });
        } else if (definitionType === 1) {
            updateSettings({ useBaseForm: true, useRandomForm: false });
        } else {
            updateSettings({ useBaseForm: false, useRandomForm: true });
        }
    }, [definitionType]);
    return (
        <div className="settings-container">
            <span className="setting-group-heading" onClick={() => setCollapseWords(!collapseWords)}>
                <EngText>Words</EngText>
                <TokiText>nimi</TokiText>
                <img className={`key-icon collapse-icon ${collapseWords ? '' : 'expanded'}`} src={chevron} />
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
                <img className={`key-icon collapse-icon ${collapseSettings ? '' : 'expanded'}`} src={chevron} />
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
                        <div style={{ marginBottom: 1 }}>
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
                                    color={definitionType === 0 ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => setDefinitionType(0)}
                                >
                                    Use full definition
                                </Button>
                                <Button
                                    color={definitionType === 1 ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => setDefinitionType(1)}
                                >
                                    Use base form
                                </Button>
                                <Button
                                    color={definitionType === 2 ? 'success' : 'secondary'}
                                    active={false}
                                    onClick={() => setDefinitionType(2)}
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
