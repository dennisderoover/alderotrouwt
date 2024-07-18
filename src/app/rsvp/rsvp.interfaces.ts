export type Attending = {
  [event in 'antwerp' | 'ceremony' | 'diner' | 'party']: boolean;
};

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  householdId: number;
  invitedFor: Activity[];
  alreadyReplied: boolean;
  attending: Attending[];
}

export interface Credentials {
  firstName: string;
  lastName: string;
}

export interface Attendance {
  guest?: Guest;
  antwerp?: SelectionAnswer;
  ceremony?: SelectionAnswer;
  diner?: SelectionAnswer;
  party?: SelectionAnswer;
  remarks?: string;
}

export interface LoadingState<T = unknown> {
  loading: boolean;
  error?: Error | null;
  data?: T;
}

export enum Activity {
  ANTWERP = 'antwerp',
  CEREMONY = 'ceremony',
  DINER = 'diner',
  PARTY = 'party',
}
    
export enum SelectionAnswer {
  COMING = 'COMING',
  NOT_COMING = 'NOT_COMING',
}
