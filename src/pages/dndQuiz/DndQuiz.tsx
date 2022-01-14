import _ from 'lodash';
import * as React from 'react';
import * as dataService from '../../dataService';

import { BubbleQuestion } from '../../components/bubbleQuestion/BubbleQuestion';

import styles from './DndQuiz.module.css';



export interface IDndQuizProps {
};



export const DndQuiz: React.FC<IDndQuizProps> = props => {
    const data = dataService.convertCsvToData()

    return (
        <div className={styles.root}>
            {_.map(data, row => (
                <BubbleQuestion
                onClick={() => _.noop()}
                question={row.question || ""} />
            ))}
        </div>
    )
}