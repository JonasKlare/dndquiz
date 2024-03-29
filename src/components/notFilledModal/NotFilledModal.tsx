import _ from 'lodash';
import * as React from 'react';

import styles from './NotFilledModal.module.css';

export interface INotFilledModalProps {
    visible: boolean;

    onClose: () => void;
};


export const NotFilledModal: React.FC<INotFilledModalProps> = props => {
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
                <div className={styles.response}>
                    Please fill out all bubbles! (click off to exit)
                </div>
            </div>
        </div>
    );
}