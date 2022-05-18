import React, {useState} from 'react';
import style from './CreateLabel.module.scss';
import {labelListType} from "../LabelContainer";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export const CreateLabel: React.FC<{top: number, left: number,
    onLabelCreateCallback: (arg: labelListType) => void}> =
    ({top, left, onLabelCreateCallback}) => {

    const [labelText, setLabelText] = useState('');

    const onLabelCreate = () => {
        if(!labelText) return;
        const newLabel: labelListType = {
            id: generateUniqueID(),
            text: labelText,
            top,
            left
        }
        onLabelCreateCallback(newLabel)
    }

    return <div className={style.label} style={{top: `${top}%`, left: `${left}%`}}>
        <input value={labelText} onChange={(e) => setLabelText(e.target.value)} type={'text'}/>
        <button onClick={onLabelCreate}>Добавить метку</button>
    </div>
}
