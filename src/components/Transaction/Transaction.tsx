import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionType } from '../../types/schemas';
import { transactions } from '../../data/transactions';

import style from './Transaction.module.scss';
import LinkButton from '../../UI/LinkButton';
import { getFullDate } from '../../helpers/date-helpers';
import { amountParser } from '../../helpers/amount-helper';
import { BreadCrumbs } from '../../UI/BreadCrumbs/BreadCrumbs';

export const Transaction = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [transactionState, setTransactionState] =
    useState<TransactionType | null>(null);

  const cardLinkHandler = useCallback(
    (id: number) => () => navigate(`/home/cards/${id}`),
    [navigate],
  );

  useEffect(() => {
    if (params.id) {
      setTransactionState(
        transactions.find(
          (transaction) => String(transaction.transactionID) === params.id,
        ) || null,
      );
    }
  }, [params.id]);

  if (!transactionState) return null;

  return (
    <>
      <BreadCrumbs />
      <div className={style.wrapper}>
        <span className={style.description}>Current transaction ID: </span>
        <span className={style.value}>{transactionState.transactionID}</span>
        <span className={style.description}>Current Card Account: </span>
        <span className={style.value}>{transactionState.cardAccount}</span>
        <span className={style.description}>Current Card ID: </span>
        <LinkButton
          callback={cardLinkHandler(transactionState.cardID)}
          text={`Open Card from here`}
        />
        <span className={style.description}>Merchant Info</span>
        <span className={style.value}>{transactionState.merchantInfo}</span>
        <span className={style.description}>Current amount: </span>
        <span className={style.description}>
          {amountParser(transactionState.amount, transactionState.currency)}
        </span>
        <span className={style.description}>Date: </span>
        <span className={style.description}>
          {getFullDate(transactionState.transactionDate)}
        </span>
      </div>
    </>
  );
};
