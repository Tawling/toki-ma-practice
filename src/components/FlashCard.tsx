import React from 'react';
import classNames from 'classnames';

import './FlashCard.scss';

interface Props {
    children: React.ReactNode
    isAnswer: boolean
}

const FlashCard = ({ children, isAnswer = false }: Props) => {
    return (
        <div className={classNames(
                'flashcard',
                {
                    'card-answer': isAnswer,
                },
            )}>
            {children}
        </div>
    );
}

export default FlashCard;
