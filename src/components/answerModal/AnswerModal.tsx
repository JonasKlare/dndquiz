import _ from 'lodash';
import * as React from 'react';
import { IStatBlock } from '../../pages/dndQuiz/DndQuiz';

import styles from './AnswerModal.module.css';

export interface IAnswerModalProps {
    visible: boolean;
    result: IStatBlock;

    onClose: () => void;
};


export const AnswerModal: React.FC<IAnswerModalProps> = props => {
    const refContainer = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        function handleWheel(event: MouseEvent) {
            const elContainer = refContainer.current;
            if(elContainer && event.target && props.visible) {
                event.preventDefault();
            }
       
        }

        document.addEventListener('wheel', handleWheel, {passive: false});
        return () => document.removeEventListener('wheel', handleWheel);
    }, [props]);

    return (
        <div
            ref={refContainer}
            className={`${styles.root} ${props.visible ? styles.visible : styles.hidden}`}>
            <div 
                className={styles.backdrop} 
                onClick={props.onClose} /> 
            
            <div className={styles.modal}>
                <div className={styles.results}>
                    Strength: {props.result.str}
                    <br/>
                    Dexterity: {props.result.dex}
                    <br/>
                    Constitution: {props.result.con}
                    <br/>
                    Intelligence: {props.result.int}
                    <br/>
                    Wisdom: {props.result.wis}
                    <br/>
                    Charisma: {props.result.cha}
                </div>
            </div>
        </div>
    );
}