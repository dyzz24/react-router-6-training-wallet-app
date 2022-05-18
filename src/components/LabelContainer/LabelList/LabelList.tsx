import React from 'react';
import style from './LabelList.module.scss';
import {labelListType} from "../LabelContainer";

export const LabelList: React.FC<{list: labelListType[]}> = ({list}) => {

    return  (<>{list.map(({id, top, left, text}) =>
        <div key={id} className={style.label} style={{top, left}}>
        {text}
        </div>)}</>)
}
