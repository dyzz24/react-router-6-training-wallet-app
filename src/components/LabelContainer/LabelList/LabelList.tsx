import React from 'react';
import style from './LabelList.module.scss';
import {labelListType} from "../LabelContainer";
import {deltaState} from "../../ImagePreview/ImagePreview";

export const LabelList: React.FC<{list: labelListType[], delta: deltaState}> =
    ({list, delta}) => {

    return  (<>{list.map(({id, top, left, text}) =>
        <div key={id} className={style.label}
             style={{top: `${top - delta.deltaY}px`, left: `${left - delta.deltaX}px`}}>
        {text}
        </div>)}</>)
}
