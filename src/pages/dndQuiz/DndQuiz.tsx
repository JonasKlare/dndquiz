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
            selected: -1
        }
    }))
    const [result, setResult] = React.useState(calculateResults(data));
    
    return (
        <div className={styles.root}>
            <AnswerModal
                onClose={() => {
                    setIsAnswerVisible(!isAnswerVisible);
                }}
                result={result}
                visible={isAnswerVisible} />

            {_.map(data, (row, index) => (
                <BubbleQuestion
                    onClick={(id) => {
                        const tempArr = data;

                        tempArr[index] = {
                            ...row,
                            selected: id
                        };

                        setData(tempArr);
                    }}
                    question={row.question || ""} />
            ))}

            <div
                onClick={() => {
                    let hasUnfilledSelection = true;
                    _.map(data, row => {
                        if((row.selected-3) === -1) {
                            hasUnfilledSelection = false;
                        }
                    });


                    if(hasUnfilledSelection) {
                        console.log(data)
                        setResult(calculateResults(data))
                        setIsAnswerVisible(!isAnswerVisible)
                    }
                }} 
                className={styles.submitButton}>
                Submit
            </div>
        </div>
    )
}

export interface IStatBlock {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
}

const calculateResults = (data: { selected: number; question: string; attribute: string; value: number; }[]) => {
    const statBlock: IStatBlock = {
        "str": 10,
        "dex": 10,
        "con": 10,
        "int": 10,
        "wis": 10,
        "cha": 10
    };

    //Could use this switch statement to store which sections aren't finished in the form
    //  Whenever there is a 0 value, add to a 'missing val' block
    _.map(data, row => {
        switch(row.attribute) {
            case "str":
                console.log(row)
                statBlock.str += (row.selected-3) * row.value;
                break;
            case "dex":
                statBlock.dex += (row.selected-3) * row.value;
                break;
            case "con": 
                statBlock.con += (row.selected-3) * row.value;
                break;
            case "int":
                statBlock.int += (row.selected-3) * row.value;
                break;
            case "wis":
                statBlock.wis += (row.selected-3) * row.value;
                break;
            case "cha":
                statBlock.cha += (row.selected-3) * row.value;
                break;
        }
    });

    return statBlock;
}
