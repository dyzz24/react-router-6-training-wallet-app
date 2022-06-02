import React from 'react';
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import TransactionsList from './components/TransactionsList';
import Transaction from './components/Transaction';
import CardList from './components/CardList';
import Card from './components/Card';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<Navigate to="transactions" replace />} />
        <Route path="home">
          <Route path="transactions">
            <Route path={''} element={<TransactionsList />} />
            <Route path={':id'} element={<Transaction />} />
          </Route>
          <Route path="cards">
            <Route path={''} element={<CardList />} />
            <Route path={':id'} element={<Card />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
