import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TransactionsList from '../../components/TransactionsList';
import Transaction from '../../components/Transaction';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import style from './HomePage.module.scss';
import { Navigation } from '../../components/Navigation/Navigation';

export const HomePage = () => {
  return (
    <div className={style.wrapper}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="transactions" replace />} />
        <Route path="transactions">
          <Route path={''} element={<TransactionsList />} />
          <Route path={':id'} element={<Transaction />} />
        </Route>
        <Route path="cards">
          <Route path={''} element={<CardList />} />
          <Route path={':id'} element={<Card />} />
        </Route>
      </Routes>
    </div>
  );
};
