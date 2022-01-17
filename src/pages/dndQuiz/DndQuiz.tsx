import _ from 'lodash';
import * as React from 'react';
import * as dataService from '../../dataService';

import { BubbleQuestion } from '../../components/bubbleQuestion/BubbleQuestion';
import { AnswerModal } from '../../components/answerModal/AnswerModal';

import styles from './DndQuiz.module.css';



export interface IDndQuizProps {
};



export const DndQuiz: React.FC<IDndQuizProps> = props => {
    const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
    const [data, setData] = React.useState(_.map(dataService.convertCsvToData(), row => {
        return {
            ...row,
            value: 3
        }
    }))
    
    return (
        <div className={styles.root}>
            <AnswerModal
                onClose={() => {setIsAnswerVisible(!isAnswerVisible)}}
                visible={isAnswerVisible} />

            {_.map(data, (row, index) => (
                <BubbleQuestion
                onClick={(id) => {
                    const tempArr = data;

                    tempArr[index] = {
                        ...row,
                        value: id
                    }

                    setData(tempArr)
                }}
                question={row.question || ""} />
            ))}

            <div
                onClick={() => {
                    setIsAnswerVisible(!isAnswerVisible)
                }} 
                className={styles.submitButton}>
                Submit
            </div>
        </div>
    )
}