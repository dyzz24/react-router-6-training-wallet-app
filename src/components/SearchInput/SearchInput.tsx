import React from 'react';
import style from './SearchInput.module.scss';

type Props = {
  setInputValue: (arg: string) => void;
  inputValue: string | null;
  placeholder?: string;
};
export const SearchInput: React.FC<Props> = ({
  setInputValue,
  inputValue,
  placeholder = 'Поиск',
}) => {
  return (
    <input
      placeholder={placeholder}
      className={style.input}
      value={inputValue || ''}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
