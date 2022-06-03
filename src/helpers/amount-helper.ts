import { CurrencyEnum } from '../types/enums';

export const amountParser = (amount: number, currency: CurrencyEnum) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
  }).format(amount);
