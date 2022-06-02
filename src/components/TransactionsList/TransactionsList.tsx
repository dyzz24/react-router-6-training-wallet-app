import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
import { emulateDelay } from '../../api/methods';
import LinkButton from '../../UI/LinkButton';
import { amountHelper } from '../../helpers/amount-helper';

const SEARCH_KEY = 'search';

export const TransactionsList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { inputValue, setInputValue } = useInputValue();
  const [transactionsState, setTransactionsState] =
    useState<TransactionType[]>(transactions);

  const [loading, setLoading] = useState(false);

  const filterTransactions = async (filter: string) => {
    setLoading(true);
    await emulateDelay(1000);
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

    setLoading(false);
  };

  const debouncedChangeHandler = useCallback(
    debounce((value) => filterTransactions(value), 200),
    [],
  );

  const cardLinkHandler = useCallback(
    (id: number) => () => navigate(`/home/cards/${id}`),
    [navigate],
  );

  const transactionLinkHandler = useCallback(
    (id: number) => () => navigate(`${pathname}/${id}`),
    [navigate, pathname],
  );

  const goToCardList = useCallback(() => navigate('/home/cards'), [navigate]);

  useEffect(() => {
    // dont use hook when INPUT has initial value
    if (typeof inputValue === 'object') return;
    if (inputValue) {
      setSearchParams({ [SEARCH_KEY]: inputValue });
    } else {
      setSearchParams({});
    }
  }, [inputValue]);

  useEffect(() => {
    // console.log(searchParams.get(SEARCH_KEY));
    if (searchParams.get(SEARCH_KEY)) {
      debouncedChangeHandler(searchParams.get(SEARCH_KEY));
      setInputValue(searchParams.get(SEARCH_KEY) as string);
    } else {
      setTransactionsState(transactions);
    }
  }, [searchParams]);

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
      <LinkButton
        callback={goToCardList}
        text={'TO TO CARD LIST'}
        additionClassName={style.goCardLink}
      />
      <div className={clsx(style.tableRow, style.title)}>
        <span>Transaction ID</span>
        <span>Card Account</span>
        <span>Card ID</span>
        <span>Amount</span>
        <span>Currency</span>
        <span>Transaction Date</span>
        <span>Merchant Info</span>
      </div>
      <div className={clsx(style.contentWrapper, loading && style.loading)}>
        {loading && <span className={style.loadingTitle}>loading</span>}
        {transactionsState.length ? (
          transactionsState.map((transaction) => (
            <div
              className={clsx(style.tableRow, style.content)}
              key={transaction.transactionID}
            >
              <LinkButton
                callback={transactionLinkHandler(transaction.transactionID)}
                text={`${transaction.transactionID} (link`}
              />

              <span>{transaction.cardAccount}</span>
              <LinkButton
                callback={cardLinkHandler(transaction.cardID)}
                text={`${transaction.cardID} (link)`}
              />

              <span>
                {amountHelper(transaction.amount, transaction.currency)}
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
    </div>
  );
};
