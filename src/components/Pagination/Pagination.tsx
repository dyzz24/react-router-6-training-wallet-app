import React, { useState } from 'react';
import style from './Pagination.module.scss';
import clsx from 'clsx';

type Props = {
  setPageCallback: (arg: number) => void;
  totalItemsCount: number;
  limit: number;
  blockPagination?: boolean;
};
export const Pagination: React.FC<Props> = ({
  setPageCallback,
  totalItemsCount,
  limit,
  blockPagination,
}) => {
  const [page, setPage] = useState(0);
  const buttons = Math.ceil(totalItemsCount / limit);
  const filledArr = new Array(buttons).fill(null);

  const paginationHandler = (pageCount: number) => {
    setPageCallback(pageCount);
    setPage(pageCount);
  };

  return (
    <div className={clsx(style.wrapper, blockPagination && style.disable)}>
      <span>Pagination</span>
      {filledArr.map((_, idx) => (
        <div
          onClick={() => paginationHandler(idx)}
          className={clsx(style.button, page === idx && style.active)}
          // DON'T DO THAT in real life
          key={idx}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
};
