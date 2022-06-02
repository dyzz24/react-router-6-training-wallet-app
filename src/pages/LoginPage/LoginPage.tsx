import React from 'react';
import style from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const onLogin = () => navigate('/home');

  return (
    <div className={style.wrapper}>
      <button className={style.button} onClick={onLogin}>
        Войти
      </button>
    </div>
  );
};
