import React from 'react';
import style from './CardList.module.scss';
import { Link, useLocation } from 'react-router-dom';

export const CardList = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <Link to={`${pathname}/12`}>Link to 12 CARD</Link>
    </div>
  );
};
