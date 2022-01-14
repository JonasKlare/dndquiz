import _ from 'lodash';
import { Questions } from './Questions'



export interface IQuestionInfo {
    question: string;
    attribute: string;
    value: number;
}

export const convertCsvToData = () => {

    const data = Questions;

    const rows = _.split(data, '\n')

    const fullData = _.map(rows, row => {
        const delimitedInfo = _.split(row, ',')
        return ({
            question: delimitedInfo[0],
            attribute: delimitedInfo[1],
            value: delimitedInfo[2]
        });
    });

    return fullData;
}