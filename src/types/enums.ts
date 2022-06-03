export enum CurrencyEnum {
  AZN = 'AZN',
  EUR = 'EUR',
  USD = 'USD',
}

export enum StatusEnum {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export const CurrencyColors = {
  [CurrencyEnum.AZN]: '#F6A623',
  [CurrencyEnum.EUR]: '#ff6a59',
  [CurrencyEnum.USD]: '#8174E0',
};

export enum TransactionFilterFields {
  TRANSACTION_ID = 'transactionID',
  CARD_ACCOUNT = 'cardAccount',
  CARD_ID = 'cardID',
  AMOUNT = 'amount',
  CURRENCY = 'currency',
  TRANSACTION_DATE = 'transactionDate',
  MERCHANT_INFO = 'merchantInfo',
}

export enum CardFilterFields {
  CARD_ID = 'cardID',
  CARD_ACCOUNT = 'cardAccount',
  CURRENCY = 'currency',
  STATUS = 'status',
}

export enum FilterParams {
  FILTER_TYPE = 'filterType',
  FILTER_VALUE = 'value',
}
