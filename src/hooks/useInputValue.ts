import { useState } from 'react';

export const useInputValue = () => {
  const [inputValue, setInputValue] = useState('');
  return { inputValue, setInputValue };
};
