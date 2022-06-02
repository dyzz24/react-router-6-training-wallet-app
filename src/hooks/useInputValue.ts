import { useState } from 'react';

export const useInputValue = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  return { inputValue, setInputValue };
};
