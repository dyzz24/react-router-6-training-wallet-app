import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useInputValue } from '../../hooks/useInputValue';
import { TransactionType } from '../../types/schemas';

import { transactions } from '../../data/transactions';
import { getFullDate } from '../../helpers/date-helpers';
import { CurrencyColors } from '../../types/enums';
import { SearchInput } from '../SearchInput/SearchInput';

import style from './TransactionsList.module.scss';

export const TransactionsList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { inputValue, setInputValue } = useInputValue();
  const [transactionsState, setTransactionsState] =
    useState<TransactionType[]>(transactions);

  const filterTransactions = (filter: string) => {
    if (filter) {
      const filteredArr = transactions.filter(
        (transaction) =>
          String(transaction.cardID).includes(filter) ||
          String(transaction.cardAccount).includes(filter) ||
          String(transaction.amount).includes(filter) ||
          transaction.currency.includes(filter) ||
          getFullDate(transaction.transactionDate).includes(filter) ||
          transaction.merchantInfo.includes(filter),
      );
      setTransactionsState(filteredArr);
    } else setTransactionsState(transactions);
  };

  const debouncedChangeHandler = useCallback(
    debounce((value) => filterTransactions(value), 200),
    [],
  );

  const linkClickHandler = (id: number) => navigate(`${pathname}/${id}`);

  useEffect(() => {
    debouncedChangeHandler(inputValue);
  }, [inputValue]);

  return (
    <div className={style.tableWrapper}>
      <div className={style.inputWrapper}>
        <SearchInput
          inputValue={inputValue}
          placeholder={
            'Filter by cardID, cardAccount, amount, currency and date '
          }
          setInputValue={setInputValue}
        />
      </div>
      <div className={clsx(style.tableRow, style.title)}>
        <span>Transaction ID</span>
        <span>Card Account</span>
        <span>Card ID</span>
        <span>Amount</span>
        <span>Currency</span>
        <span>Transaction Date</span>
        <span>Merchant Info</span>
        {/*<Link to={`${pathname}/12`}>Link to 12</Link>*/}
      </div>
      {transactionsState.length ? (
        transactionsState.map((transaction) => (
          <div
            className={clsx(style.tableRow, style.content)}
            key={transaction.transactionID}
            onClick={() => linkClickHandler(transaction.transactionID)}
          >
            <span>{transaction.transactionID}</span>
            <span>{transaction.cardAccount}</span>
            <span>{transaction.cardID}</span>
            <span>
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: transaction.currency,
              }).format(transaction.amount)}
            </span>
            <span style={{ color: CurrencyColors[transaction.currency] }}>
              {transaction.currency}
            </span>
            <span>{getFullDate(transaction.transactionDate)}</span>
            <span>{transaction.merchantInfo}</span>
          </div>
        ))
      ) : (
        <span className={style.notFound}>Transactions not found</span>
      )}
    </div>
  );
};
