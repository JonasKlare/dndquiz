import { count } from 'console';
import _ from 'lodash';
import * as React from 'react';
import { skipPartiallyEmittedExpressions } from 'typescript';

import styles from './BubbleQuestion.module.css';



export interface IBubbleQuestionProps {
    question: String;
    onClick: (id: number) => void;
};

export const BubbleQuestion: React.FC<IBubbleQuestionProps> = props => {
    const [selected, setSelected] = React.useState(
        _.map(_.range(7), (element) => {
            return false;
    }))



    const handleClickCircle = (circleId: number) => {
        let selectedId = 0;
        const newSelected = _.map(selected, (s, id) => {

            if(id == circleId) {
                selectedId = id;
                return true
            }

            return false
        });

        setSelected(newSelected);
        props.onClick(selectedId);
    }


    
    return (
        <div className={styles.root}>

            <div className={styles.question}>
                {props.question}
            </div>
    
            <div className={styles.selector}>
                <div className={styles.agree}> 
                    Agree
                </div>

                <div onClick={() => handleClickCircle(0)} className={styles.largeContainer}>
                    {selected[0] && <div className={styles.leftCircleSelected} />}
                    {!selected[0] && <div className={styles.leftCircle} />}
                </div>

                <div onClick={() => handleClickCircle(1)} className={styles.medContainer}>
                    {selected[1] && <div className={styles.leftCircleSelected} />}
                    {!selected[1] && <div className={styles.leftCircle} />}
                </div>

                <div onClick={() => handleClickCircle(2)} className={styles.smallContainer}>
                    {selected[2] && <div className={styles.leftCircleSelected} />}
                    {!selected[2] && <div className={styles.leftCircle} />}
                </div>

                <div onClick={() => handleClickCircle(3)} className={styles.tinyContainer}>
                    {selected[3] && <div className={styles.neutralCircleSelected} />}
                    {!selected[3] && <div className={styles.neutralCircle} />}
                </div>

                <div onClick={() => handleClickCircle(4)} className={styles.smallContainer}>
                    {selected[4] && <div className={styles.rightCircleSelected} />}
                    {!selected[4] && <div className={styles.rightCircle} />}
                </div>
                
                <div onClick={() => handleClickCircle(5)} className={styles.medContainer}>
                    {selected[5] && <div className={styles.rightCircleSelected} />}
                    {!selected[5] && <div className={styles.rightCircle} />}
                </div>

                <div onClick={() => handleClickCircle(6)} className={styles.largeContainer}>
                    {selected[6] && <div className={styles.rightCircleSelected} />}
                    {!selected[6] && <div className={styles.rightCircle} />}
                </div>

                <div className={styles.disagree}>
                    Disagree
                </div>
            </div>
        </div>
    )
}