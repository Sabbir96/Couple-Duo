export enum MerchantCategory {
  TELECOMMUNICATIONS = 'Telecommunications',
  UTILITIES = 'Utilities',
  CABLE_SERVICE = 'Cable Services',
  WASTE_MANAGEMENT = 'Waste Management',
  AIRLINE = 'Airline',
  FITNESS = 'Fitness',
  Retail = 'Retail',
  MUSIC_STREAMING = 'Music Streaming',
  VIDEO_STREAMING = 'Video Streaming',
}

export enum MerchantName {
  TELECOMMUNICATIONS = 'Atlantic Mobile Networks',
  ELECTRICITY = 'Pacific Light & Power Co',
  WATER = 'Clearwater Utilities Inc',
  CABLE_SERVICE = 'Denver Cable Co',
  WASTE_MANAGEMENT = 'Waste Management Inc',
  AIRLINE = 'Southwest Airlines',
  FITNESS = '24 Hour Fitness',
  RETAILS = 'Amazon Prime',
  MUSIC_STREAMING = 'Spotify',
  VIDEO_STREAMING = 'Netflix',
  GAS = 'Gas Co',
}

export interface BillData {
  amount: number;
  flow: string;
  type: string;
}

// export flow enum
export enum BillFlow {
  IN = 'IN',
  OUT = 'OUT',
}

// export type enum
export enum BillType {
  Electricity = 'Electricity',
  Gas = 'Gas',
  Water = 'Water',
  Waste = 'Waste',
  Utilities = 'Utilities',
  Airline = 'Airline',
  Fitness = 'Fitness',
  Retail = 'Retail',
  MusicStreaming = 'Music Streaming',
  VideoStreaming = 'Video Streaming',
  Telecommunications = 'Telecommunications',
}

export interface payBillDto {
  amount: number;
  flow: BillFlow;
  category: MerchantCategory;
  header: MerchantName;
  receiver: string;
}

export interface payBillReceiverDto {}

export interface PayTelecommunicationsBillDto {
  amount: number;
  operator: string;
}

export interface MerchantBillData {
  amount: number;
  flow: BillFlow;
  category: MerchantCategory;
  header: string;
  receiver: unknown;
}

export interface PayElectricityBillDto {
  meterNumber: number;
  contactNumber: number;
  billingMonth: string;
  amount: number;
}

export interface PayGasBillDto {
  customerId: number;
  contactNumber: number;
  billingMonth: string;
  amount: number;
}

export interface PayWasteBillDto {
  customerId: number;
  contactNumber: number;
  billingMonth: string;
  amount: number;
}

export interface PayWaterBillDto {
  customerId: number;
  contactNumber: number;
  billingMonth: string;
  amount: number;
}