import React, { useEffect, useState } from 'react';
import style from './Filter.module.scss';
import {
  CardFilterFields,
  FilterParams,
  TransactionFilterFields,
} from '../../types/enums';
import { useSearchParams } from 'react-router-dom';
import { SearchInput } from '../SearchInput/SearchInput';

export type filterTypeObj = {
  [FilterParams.FILTER_TYPE]:
    | TransactionFilterFields
    | CardFilterFields
    | string;
  [FilterParams.FILTER_VALUE]: string;
};

export const Filter: React.FC<{ type: 'transaction' | 'cards' }> = ({
  type,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterState, setFilterState] = useState<filterTypeObj>({
    [FilterParams.FILTER_TYPE]: '',
    [FilterParams.FILTER_VALUE]: '',
  });

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

  useEffect(() => {
    const filterType = searchParams.get(FilterParams.FILTER_TYPE) as string;
    const filterValue = searchParams.get(FilterParams.FILTER_VALUE) as string;
    if (filterType && filterValue) {
      setFilterState({ filterType, [FilterParams.FILTER_VALUE]: filterValue });
    }
  }, [searchParams]);

  return (
    <div className={style.inputWrapper}>
      <SearchInput
        inputValue={filterState.value}
        placeholder={
          'Filter by cardID, cardAccount, amount, currency and date '
        }
        setInputValue={(e) =>
          setFilterState((state) => ({
            ...state,
            [FilterParams.FILTER_VALUE]: e.toLowerCase(),
          }))
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
        {Object.values(
          type === 'transaction' ? TransactionFilterFields : CardFilterFields,
        ).map((filterValue) => (
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
  );
};
