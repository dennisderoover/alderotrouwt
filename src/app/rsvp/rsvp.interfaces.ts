export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  householdId: number;
  invitedFor: Activity[];
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
