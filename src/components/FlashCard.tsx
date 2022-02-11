import React from 'react';
import classNames from 'classnames';
import useFitText from 'use-fit-text';

import './FlashCard.scss';

interface Props {
    children: React.ReactNode;
    isAnswer: boolean;
    style?: object;
}

const FlashCard = ({ children, isAnswer = false, style }: Props) => {
    const { fontSize, ref } = useFitText();
    return (
        <div style={{ fontSize: 'x-large' }}>
            <div
                ref={ref}
                style={{...style, fontSize}}
                className={classNames('flashcard', {
                    'card-answer': isAnswer,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default FlashCard;
