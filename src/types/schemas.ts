import { CurrencyEnum, StatusEnum } from './enums';

export type CardType = {
  cardID: number;
  cardAccount: number;
  maskedCardNumber: string;
  expireDate: string;
  currency: CurrencyEnum;
  status: StatusEnum;
  balance: number;
};

export type TransactionType = {
  transactionID: number;
  cardAccount: number;
  cardID: number;
  amount: number;
  currency: CurrencyEnum;
  transactionDate: string;
  merchantInfo: string;
};
