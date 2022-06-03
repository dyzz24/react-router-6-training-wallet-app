import React from 'react';
import style from './CardUI.module.scss';
import { CardType } from '../../types/schemas';
import clsx from 'clsx';
import {
  CurrencyColors,
  FilterParams,
  StatusEnum,
  TransactionFilterFields,
} from '../../types/enums';
import { amountParser } from '../../helpers/amount-helper';
import { getFullDate } from '../../helpers/date-helpers';
import { Link } from 'react-router-dom';

type Props = {
  card: CardType;
};
export const CardUI: React.FC<Props> = ({ card }) => {
  return (
    <div
      className={clsx(
        style.wrapper,
        card.status === StatusEnum.BLOCKED && style.blocked,
      )}
    >
      <div className={style.row}>
        <span className={style.title}>#ID{card.cardID}</span>
        <span className={style.text}>acc: {card.cardAccount}</span>
      </div>
      <div className={style.row}>
        <span
          className={style.text}
          style={{ color: CurrencyColors[card.currency] }}
        >
          {card.currency}
        </span>
        <span className={style.title}>
          {amountParser(card.balance, card.currency)}
        </span>
      </div>
      <div className={style.row}>
        <span className={style.text}>Mask number:</span>
        <span className={style.text}>{card.maskedCardNumber}</span>
      </div>
      <div className={style.row}>
        <span className={style.text}>Exp date:</span>
        <span className={style.text}>{getFullDate(card.expireDate)}</span>
      </div>
      <div className={style.row}>
        <span className={style.text}>STATUS</span>
        <span className={style.title}>{card.status}</span>
      </div>
      <div className={style.inlineRow}>
        <Link
          className={style.link}
          to={`/home/transactions/?${FilterParams.FILTER_TYPE}=${TransactionFilterFields.CARD_ACCOUNT}&${FilterParams.FILTER_VALUE}=${card.cardAccount}`}
        >
          Card Acc Transact
        </Link>
        <Link
          className={style.link}
          to={`/home/transactions/?${FilterParams.FILTER_TYPE}=${TransactionFilterFields.CARD_ID}&${FilterParams.FILTER_VALUE}=${card.cardID}`}
        >
          Card Id Transact
        </Link>
        <Link className={style.link} to={`/home/cards/${card.cardID}`}>
          Card Info
        </Link>
      </div>
    </div>
  );
};
