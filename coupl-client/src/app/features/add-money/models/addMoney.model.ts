export interface AddMoneyData {
  amount: number; // dynamic
  flow: AddMoneyFlow;
  header: string; // dynamic
  category: string; // Deposit
  sender: cardToDuoForm; // dynamic
}

// export flow enum
export enum AddMoneyFlow {
  IN = 'IN',
  OUT = 'OUT',
}

export interface cardToDuoForm {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  amount: number;
}
