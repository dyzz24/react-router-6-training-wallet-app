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
import { amountParser } from '../../helpers/amount-helper';
import Pagination from '../Pagination';

const SEARCH_KEY = 'search';
const LIMIT = 10;

export const TransactionsList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { inputValue, setInputValue } = useInputValue();
  const [transactionsState, setTransactionsState] =
    useState<TransactionType[]>(transactions);

  const [loading, setLoading] = useState(false);

  const filterTransactions = async (filter: string) => {
    setLoading(true);
    await emulateDelay(1000);
    const toLowerCaseFilter = filter.toLowerCase();
    const filteredArr = transactions.filter(
      (transaction) =>
        String(transaction.cardID).toLowerCase().includes(toLowerCaseFilter) ||
        String(transaction.cardAccount)
          .toLowerCase()
          .includes(toLowerCaseFilter) ||
        String(transaction.amount).toLowerCase().includes(toLowerCaseFilter) ||
        transaction.currency.toLowerCase().includes(toLowerCaseFilter) ||
        getFullDate(transaction.transactionDate).includes(toLowerCaseFilter) ||
        transaction.merchantInfo.toLowerCase().includes(toLowerCaseFilter),
    );
    setTransactionsState(filteredArr.filter((_, idx) => idx < 10));
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [inputValue, setSearchParams]);

  useEffect(() => {
    if (searchParams.get(SEARCH_KEY)) {
      debouncedChangeHandler(searchParams.get(SEARCH_KEY));
      setInputValue(searchParams.get(SEARCH_KEY) as string);
    } else {
      setTransactionsState(transactions.filter((_, idx) => idx < 10));
    }
  }, [debouncedChangeHandler, searchParams, setInputValue]);

  const onPaginationCallback = useCallback(
    (page: number) => {
      setSearchParams({});
      setInputValue('');
      setTransactionsState(
        transactions.filter(
          (_, idx) => idx >= page * LIMIT && idx < page * LIMIT + LIMIT,
        ),
      );
    },
    [setInputValue, setSearchParams],
  );

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
      <Pagination
        totalItemsCount={transactions.length}
        limit={LIMIT}
        setPageCallback={onPaginationCallback}
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
                {amountParser(transaction.amount, transaction.currency)}
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
