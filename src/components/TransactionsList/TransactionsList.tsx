import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { TransactionType } from '../../types/schemas';

import { transactions } from '../../data/transactions';
import { getFullDate } from '../../helpers/date-helpers';
import { CurrencyColors, FilterFields } from '../../types/enums';
import { SearchInput } from '../SearchInput/SearchInput';

import style from './TransactionsList.module.scss';
import { emulateDelay } from '../../api/methods';
import LinkButton from '../../UI/LinkButton';
import { amountParser } from '../../helpers/amount-helper';
import Pagination from '../Pagination';

const SEARCH_KEY = 'search';
const LIMIT = 10;

type filterTypeObj = {
  filterType: FilterFields | string;
  value: string;
};

export const TransactionsList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, setFilterState] = useState<filterTypeObj>({
    filterType: '',
    value: '',
  });
  const [transactionsState, setTransactionsState] =
    useState<TransactionType[]>(transactions);

  console.log(filterState);

  const [loading, setLoading] = useState(false);

  const filterTransactions = async (filter: filterTypeObj) => {
    setLoading(true);
    await emulateDelay(1000);
    const filteredArr = transactions.filter((transaction) => {
      switch (filter.filterType) {
        case FilterFields.CARD_ID:
          return String(transaction.cardID)
            .toLowerCase()
            .includes(filter.value);
        case FilterFields.AMOUNT:
          return String(transaction.amount)
            .toLowerCase()
            .includes(filter.value);
        case FilterFields.CARD_ACCOUNT:
          return String(transaction.cardAccount)
            .toLowerCase()
            .includes(filter.value);
        case FilterFields.CURRENCY:
          return transaction.currency.toLowerCase().includes(filter.value);
        case FilterFields.MERCHANT_INFO:
          return transaction.merchantInfo.toLowerCase().includes(filter.value);
        case FilterFields.TRANSACTION_DATE:
          return getFullDate(transaction.transactionDate).includes(
            filter.value,
          );
        case FilterFields.TRANSACTION_ID:
          return String(transaction.transactionID).includes(filter.value);
      }
    });
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
    const filterType = searchParams.get('filterType') as string;
    const filterValue = searchParams.get('value') as string;
    if (filterType && filterValue) {
      filterTransactions({ filterType, value: filterValue }).then();
      setFilterState({ filterType, value: filterValue });
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

  const applyFilter = () => {
    if (filterState.filterType && filterState.value) {
      setSearchParams({
        filterType: filterState.filterType,
        value: filterState.value,
      });
    }
  };

  const cancelFilter = () => {
    setSearchParams({});
    setFilterState({ filterType: '', value: '' });
  };

  return (
    <div className={style.tableWrapper}>
      <div className={style.inputWrapper}>
        <SearchInput
          inputValue={filterState.value}
          placeholder={
            'Filter by cardID, cardAccount, amount, currency and date '
          }
          setInputValue={(e) =>
            setFilterState((state) => ({ ...state, value: e.toLowerCase() }))
          }
        />
        <select
          className={style.select}
          placeholder={'Select filter field'}
          value={filterState.filterType}
          onChange={(e) =>
            setFilterState((prevState) => ({
              ...prevState,
              filterType: e.target.value,
            }))
          }
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>
          {Object.values(FilterFields).map((filterValue) => (
            <option key={filterValue}>{filterValue}</option>
          ))}
        </select>
        <button
          className={style.applyButton}
          disabled={!filterState.filterType || !filterState.value}
          onClick={applyFilter}
        >
          Apply
        </button>
        <button
          className={style.cancelButton}
          disabled={!filterState.filterType || !filterState.value}
          onClick={cancelFilter}
        >
          Cancel Filter
        </button>
      </div>
      <LinkButton
        callback={goToCardList}
        text={'TO CARD LIST'}
        additionClassName={style.goCardLink}
      />
      <Pagination
        blockPagination={!!searchParams.get('filterType')}
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
