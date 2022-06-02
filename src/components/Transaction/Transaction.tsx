import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionType } from '../../types/schemas';
import { transactions } from '../../data/transactions';

import style from './Transaction.module.scss';
import LinkButton from '../../UI/LinkButton';
import { amountHelper } from '../../helpers/amount-helper';

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
  console.log(params);
  return (
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
      <span className={style.description}>Current amount: </span>
      <span className={style.description}>
        {amountHelper(transactionState.amount, transactionState.currency)}
      </span>
    </div>
  );
};
