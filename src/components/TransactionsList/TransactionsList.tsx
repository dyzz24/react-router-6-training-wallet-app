import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { TransactionType } from '../../types/schemas';

import { transactions } from '../../data/transactions';
import { getFullDate } from '../../helpers/date-helpers';
import {
  CurrencyColors,
  FilterParams,
  TransactionFilterFields,
} from '../../types/enums';

import style from './TransactionsList.module.scss';
import { emulateDelay } from '../../api/methods';
import LinkButton from '../../UI/LinkButton';
import { amountParser } from '../../helpers/amount-helper';
import Pagination from '../Pagination';
import { Filter, filterTypeObj } from '../Filter/Filter';

const LIMIT = 10;

export const TransactionsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [transactionsState, setTransactionsState] =
    useState<TransactionType[]>(transactions);

  const [loading, setLoading] = useState(false);

  const filterTransactions = async (filter: filterTypeObj) => {
    setLoading(true);
    await emulateDelay(1000);

    const filteredArr = transactions.filter((transaction) => {
      switch (filter.filterType) {
        case TransactionFilterFields.CARD_ID:
          return String(transaction.cardID)
            .toLowerCase()
            .includes(filter.value);
        case TransactionFilterFields.AMOUNT:
          return String(transaction.amount)
            .toLowerCase()
            .includes(filter.value);
        case TransactionFilterFields.CARD_ACCOUNT:
          return String(transaction.cardAccount)
            .toLowerCase()
            .includes(filter.value);
        case TransactionFilterFields.CURRENCY:
          return transaction.currency.toLowerCase().includes(filter.value);
        case TransactionFilterFields.MERCHANT_INFO:
          return transaction.merchantInfo.toLowerCase().includes(filter.value);
        case TransactionFilterFields.TRANSACTION_DATE:
          return getFullDate(transaction.transactionDate).includes(
            filter.value,
          );
        case TransactionFilterFields.TRANSACTION_ID:
          return String(transaction.transactionID).includes(filter.value);
        default:
          return true;
      }
    });
    setTransactionsState(filteredArr.filter((_, idx) => idx < 10));
    setLoading(false);
  };

  const cardLinkHandler = useCallback(
    (id: number) => () => navigate(`/home/cards/${id}`),
    [navigate],
  );

  const transactionLinkHandler = useCallback(
    (id: number) => () => navigate(`/home/transactions/${id}`),
    [navigate],
  );

  const goToCardList = useCallback(() => navigate('/home/cards'), [navigate]);

  useEffect(() => {
    const filterType = searchParams.get(FilterParams.FILTER_TYPE) as string;
    const filterValue = searchParams.get(FilterParams.FILTER_VALUE) as string;
    if (filterType && filterValue) {
      filterTransactions({ filterType, value: filterValue }).then();
    } else {
      setTransactionsState(transactions.filter((_, idx) => idx < 10));
    }
  }, [searchParams]);

  const onPaginationCallback = useCallback(
    (page: number) => {
      setSearchParams({});
      setTransactionsState(
        transactions.filter(
          (_, idx) => idx >= page * LIMIT && idx < page * LIMIT + LIMIT,
        ),
      );
    },
    [setSearchParams],
  );

  return (
    <div className={style.tableWrapper}>
      <Filter type={'transaction'} />
      <LinkButton
        callback={goToCardList}
        text={'TO CARD LIST'}
        additionClassName={style.goCardLink}
      />
      <Pagination
        blockPagination={!!searchParams.get(FilterParams.FILTER_TYPE)}
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
                text={`${transaction.transactionID} (link)`}
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
