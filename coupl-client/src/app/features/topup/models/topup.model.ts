export interface TopUpDto {
  amount: number;
  flow: string;
  category: Category;
  header: string;
  receiver: string;
}

export interface TopUpReceiver {
  phoneNumber: string;
  amount: number;
}

export enum Flow {
  IN = 'IN',
  OUT = 'OUT',
}

export enum Category {
  TELECOMMUNICATIONS = 'telecommunications',
}
