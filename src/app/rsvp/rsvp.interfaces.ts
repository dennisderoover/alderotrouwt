export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  householdId: number;
  invitedFor: Activity[];
}

export enum Activity {
  ANTWERP = 'antwerp',
  CEREMONY = 'ceremony',
  DINER = 'diner',
  PARTY = 'party',
}

export interface Credentials {
  firstName: string;
  lastName: string;
}

export interface LoadingState<T = unknown> {
  loading: boolean;
  error?: Error | null;
  data?: T;
}