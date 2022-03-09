import _ from 'lodash';
import * as React from 'react';
import * as dataService from '../../dataService';
import { FacebookIcon, FacebookShareButton,
    RedditIcon, RedditShareButton,
    TwitterIcon, TwitterShareButton 
} from 'react-share';

import { BubbleQuestion } from '../../components/bubbleQuestion/BubbleQuestion';
import { AnswerModal } from '../../components/answerModal/AnswerModal';
import { NotFilledModal } from '../../components/notFilledModal/NotFilledModal';

import styles from './DndQuiz.module.css';



export interface IDndQuizProps {
};



export const DndQuiz: React.FC<IDndQuizProps> = props => {
    const websiteLink = "https://jonasklare.github.io/dndquiz/";
    const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
    const [isNotFilledVisible, setIsNotFilledVisible] = React.useState(false);
    const [data, setData] = React.useState(_.map(dataService.convertCsvToData(), row => {
        return {
            ...row,
            selected: -1
        }
    }));
    const [result, setResult] = React.useState(calculateResults(data));
    


    return (
        <div className={styles.root}>
            <AnswerModal
                onClose={() => {
                    setIsAnswerVisible(!isAnswerVisible);
                }}
                result={result}
                visible={isAnswerVisible} />

            <NotFilledModal
                onClose={() => {
                    setIsNotFilledVisible(!isNotFilledVisible);
                }}
                visible={isNotFilledVisible} />

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
                className={styles.submitButton}
                onClick={() => {
                    let hasUnfilledSelection = false;
                    _.map(data, row => {
                        if ((row.selected) === -1) {
                            hasUnfilledSelection = true;
                        }
                    });

                    if (!hasUnfilledSelection) {
                        setResult(calculateResults(data))
                        setIsAnswerVisible(!isAnswerVisible)
                    }
                    else {
                        console.log("not filled")
                        setIsNotFilledVisible(!isNotFilledVisible)
                    }
                }}>
                <div className={styles.submitButtonText}>
                    Get Results
                </div>
            </div>
            
            <div className={styles.lineBreak}/>

            <div className={styles.shareContainer}>
                <div className={styles.shareButtonContainer}>
                    <FacebookShareButton url={websiteLink}>
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                </div>

                <div className={styles.shareButtonContainer}>
                    <TwitterShareButton url={websiteLink}>
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                </div>
                
                <div className={styles.shareButtonContainer}>
                    <RedditShareButton url={websiteLink}>
                        <RedditIcon size={32} round={true} />
                    </RedditShareButton>
                </div>
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
};



interface ISelectedQuestionData {
    selected: number;
    value: number;
    question: string;
    attribute: string;
}



const calculateResults = (data: ISelectedQuestionData[]) => {
    const statBlock: IStatBlock = {
        "str": 0,
        "dex": 0,
        "con": 0,
        "int": 0,
        "wis": 0,
        "cha": 0
    };
    
    const maxSelectedValue = 6;
    const maxStatBlock: IStatBlock = {
        "str": 0,
        "dex": 0,
        "con": 0,
        "int": 0,
        "wis": 0,
        "cha": 0
    }

    //Could use this switch statement to store which sections aren't finished in the form Whenever there is a 0 value, 
    //  add to a 'missing val' block
    _.map(data, row => {

        const calculatedValue = 6 - row.selected;
        switch(row.attribute) {
            case "str":
                statBlock.str += calculatedValue * row.value;
                maxStatBlock.str += maxSelectedValue * row.value
                break;
            case "dex":
                statBlock.dex += calculatedValue * row.value;
                maxStatBlock.dex += maxSelectedValue * row.value
                break;
            case "con":
                statBlock.con += calculatedValue * row.value;
                maxStatBlock.con += maxSelectedValue * row.value
                break;
            case "int":
                statBlock.int += calculatedValue * row.value;
                maxStatBlock.wis += maxSelectedValue * row.value
                break;
            case "wis":
                statBlock.wis += calculatedValue * row.value;
                maxStatBlock.wis += maxSelectedValue * row.value
                //console.log("wisdom", statBlock.wis)
                break;
            case "cha":
                statBlock.cha += calculatedValue * row.value;
                maxStatBlock.cha += maxSelectedValue * row.value
                break;
        }
    });

    //Normalize the values to be on a 3-18 scale. To do this there are 15 unique values, so we divide by max nums then 
    //  add 3. It checks if there are questions of that kind and then add them up.
    const newStatBlock = {
        "str": maxStatBlock.str !== 0 ? Math.floor(statBlock.str/maxStatBlock.str*15) + 3 : 10, 
        "dex": maxStatBlock.dex !== 0 ? Math.floor(statBlock.dex/maxStatBlock.dex*15) + 3 : 10,
        "con": maxStatBlock.con !== 0 ? Math.floor(statBlock.con/maxStatBlock.con*15) + 3 : 10,
        "int": maxStatBlock.int !== 0 ? Math.floor(statBlock.int/maxStatBlock.int*15) + 3 : 10,
        "wis": maxStatBlock.wis !== 0 ? Math.floor(statBlock.wis/maxStatBlock.wis*15) + 3 : 10,
        "cha": maxStatBlock.cha !== 0 ? Math.floor(statBlock.cha/maxStatBlock.cha*15) + 3 : 10
    };
    
    return newStatBlock;
}
