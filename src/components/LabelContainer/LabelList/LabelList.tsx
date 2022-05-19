import React from 'react';
import style from './LabelList.module.scss';
import { labelListType } from '../LabelContainer';

export const LabelList: React.FC<{ list: labelListType[] }> = ({ list }) => {
  return (
    <>
      {list.map(({ id, top, left, text }) => (
        <div
          title={text}
          key={id}
          className={style.label}
          style={{ top: `${top}%`, left: `${left}%` }}
        >
          {text}
        </div>
      ))}
    </>
  );
};
