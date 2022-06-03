import { uniqueId } from 'lodash';
import React, { useState } from 'react';
import style from './Pagination.module.scss';
import clsx from 'clsx';

type Props = {
  setPageCallback?: () => void;
  totalItemsCount: number;
  limit: number;
};
export const Pagination: React.FC<Props> = ({
  setPageCallback,
  totalItemsCount,
  limit,
}) => {
  const [page, setPage] = useState(0);
  const buttons = Math.round(totalItemsCount % limit);
  const filledArr = new Array(buttons).fill(null);

  const paginationHandler = (pageCount: number) => {
    setPage(pageCount);
  };

  return (
    <div className={style.wrapper}>
      <span>Pagination</span>
      {filledArr.map((_, idx) => (
        <div
          onClick={() => paginationHandler(idx)}
          className={clsx(style.button, page === idx && style.active)}
          key={uniqueId()}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
};
