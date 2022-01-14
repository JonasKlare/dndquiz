import _ from 'lodash';
import * as React from 'react';

import styles from './BinaryQuestion.module.css';

import filledPurpleCircle from './../../assets/purpleCircleFill.svg';


export interface IBinaryQuestionProps {
    question: string;
    onAnswer: (answer: boolean) => void;
};

export const BinaryQuestion: React.FC<IBinaryQuestionProps> = props => {
    return (
        <div className={styles.root}>
            hi :)

            <img src={filledPurpleCircle} />
        </div>
    )
}