import _ from 'lodash';
import * as React from 'react';

import styles from './AnswerModal.module.css';

export interface IAnswerModalProps {
    visible: boolean
};


export const AnswerModal: React.FC<IAnswerModalProps> = props => {
    return (
        <div className={styles.root}>
            {props.visible && <div>
                Test
            </div>}
        </div>
    )
}