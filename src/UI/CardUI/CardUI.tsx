import React from 'react';
import style from './CardUI.module.scss';
import { CardType } from '../../types/schemas';

type Props = {
  card: CardType;
};
export const CardUI: React.FC<Props> = ({ card }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.row}>
        <span className={style.title}>#ID{card.cardId}</span>
      </div>
    </div>
  );
};
