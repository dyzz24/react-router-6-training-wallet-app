import React, { useCallback, useEffect, useState } from 'react';
import style from './CardList.module.scss';
import Filter from '../Filter';
import { cards } from '../../data/cards';
import { CardType } from '../../types/schemas';
import CardUI from '../../UI/CardUI';
import { CardFilterFields, FilterParams } from '../../types/enums';
import { useSearchParams } from 'react-router-dom';
import { filterTypeObj } from '../Filter/Filter';
import Pagination from '../Pagination';

const LIMIT = 10;

export const CardList = () => {
  const [cardList, setCardList] = useState<CardType[]>(cards);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterCards = (filter: filterTypeObj) => {
    const filteredArr = cards.filter((card) => {
      switch (filter.filterType) {
        case CardFilterFields.CARD_ID:
          return String(card.cardID).toLowerCase().includes(filter.value);
        case CardFilterFields.CARD_ACCOUNT:
          return String(card.cardAccount).toLowerCase().includes(filter.value);
        case CardFilterFields.CURRENCY:
          return String(card.currency).toLowerCase().includes(filter.value);
        case CardFilterFields.STATUS:
          return card.status.toLowerCase().includes(filter.value);
        default:
          return true;
      }
    });
    setCardList(filteredArr);
  };

  useEffect(() => {
    const filterType = searchParams.get(FilterParams.FILTER_TYPE) as string;
    const filterValue = searchParams.get(FilterParams.FILTER_VALUE) as string;
    if (filterType && filterValue) {
      filterCards({ filterType, value: filterValue });
    } else {
      setCardList(cards);
    }
  }, [searchParams]);

  const onPaginationCallback = useCallback(
    (page: number) => {
      setSearchParams({});
      setCardList(
        cards.filter(
          (_, idx) => idx >= page * LIMIT && idx < page * LIMIT + LIMIT,
        ),
      );
    },
    [setSearchParams],
  );

  return (
    <div className={style.col}>
      <Pagination
        blockPagination={!!searchParams.get(FilterParams.FILTER_TYPE)}
        setPageCallback={onPaginationCallback}
        totalItemsCount={cards.length}
        limit={LIMIT}
      />
      <Filter type={'cards'} />
      <div className={style.cardWrapper}>
        {cardList.length ? (
          cardList.map((card) => <CardUI key={card.cardID} card={card} />)
        ) : (
          <span>Cards not found :(</span>
        )}
      </div>
    </div>
  );
};
