export interface SendMoneyData {
  amount: number; // dynamic
  flow: SendMoneyFlow;
  category: string; // Deposit
  type: SendMoneyType; // internal or external,
  header: string; // sender email
  receiver: string; // sender email
}

export enum SendMoneyFlow {
  IN = 'IN',
  OUT = 'OUT',
}

export enum SendMoneyType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export interface SendMoneyOutsideDto {
  name: string;
  accountNumber: string;
  routingNumber: string;
  amount: number;
}

export interface SendMoneyOutside {
  amount: number;
  flow: 'OUT';
  category: 'Sent Money';
  type: SendMoneyType.EXTERNAL;
  header: string;
  receiver: {
    name: string;
    accountNumber: string;
    routingNumber: string;
  };
}
