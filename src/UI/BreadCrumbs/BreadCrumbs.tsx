import React from 'react';
import style from './BreadCrumbs.module.scss';
import LinkButton from '../LinkButton';
import { useNavigate } from 'react-router-dom';

export const BreadCrumbs = () => {
  const navigate = useNavigate();

  return (
    <div className={style.wrapper}>
      <LinkButton
        callback={() => navigate('/home/cards')}
        text={`To Card List`}
      />
      <LinkButton
        callback={() => navigate('/home/transactions')}
        text={`To Transaction List`}
      />
    </div>
  );
};
