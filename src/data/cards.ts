import { CardType } from '../types/schemas';
import { CurrencyEnum, StatusEnum } from '../types/enums';

export const cards: CardType[] = [
  {
    cardId: 1,
    cardAccount: 1209932199123,
    maskedCardNumber: '**** 1231',
    expireDate: '2025-02-23T09:44:05.316915+00:00',
    currency: CurrencyEnum.EUR,
    status: StatusEnum.ACTIVE,
    balance: 14123.21,
  },
  {
    cardId: 2,
    cardAccount: 1209932199124,
    maskedCardNumber: '**** 4214',
    expireDate: '2025-03-23T09:44:05.316915+00:00',
    currency: CurrencyEnum.AZN,
    status: StatusEnum.ACTIVE,
    balance: 171233.24,
  },
  {
    cardId: 3,
    cardAccount: 1209932199125,
    maskedCardNumber: '**** 1209',
    expireDate: '2024-03-23T09:44:05.316915+00:00',
    currency: CurrencyEnum.USD,
    status: StatusEnum.ACTIVE,
    balance: 9200,
  },
  {
    cardId: 4,
    cardAccount: 1209932199125,
    maskedCardNumber: '**** 1260',
    expireDate: '2023-03-23T09:44:05.316915+00:00',
    currency: CurrencyEnum.USD,
    status: StatusEnum.BLOCKED,
    balance: 12,
  },
];
