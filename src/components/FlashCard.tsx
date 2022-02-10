import React from 'react';
import classNames from 'classnames';

import './FlashCard.scss';

interface Props {
    children: React.ReactNode;
    isAnswer: boolean;
    ref?: React.MutableRefObject<HTMLDivElement>;
    style?: object;
}

const FlashCard = ({ children, isAnswer = false, ref, style }: Props) => {
    return (
        <div style={{ fontSize: 'x-large' }}>
            <div
                ref={ref}
                style={style}
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
