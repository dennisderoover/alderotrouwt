import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, startWith, tap } from 'rxjs';
import { Credentials, Guest, LoadingState } from './rsvp.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RSVPService {
  private readonly _httpClient = inject(HttpClient);
  private _currentHousehold: Guest[] | undefined = [];

  get currentHousehold(): Guest[] | undefined {
    return this._currentHousehold;
  }
  
  public getHouseHoldForGuest(credentials: Credentials): Observable<LoadingState<Guest[]>> {
    const url = `${environment.apiUrl}/fetch`;

    return this._httpClient.get<Guest[]>(url).pipe(
      map((guests: Guest[]) => guests.filter((guest: Guest) => guest.householdId)),
      map((guests: Guest[]) => {
        const householdId = guests.find((guest: Guest) => guest.firstName === credentials.firstName && guest.lastName === credentials.lastName)?.householdId
        
        return guests.filter((guest: Guest) => guest.householdId === householdId);
        }),
      map((guests: Guest[]) => ({ data: guests, loading: false })),
      tap((result: LoadingState<Guest[]>) => this._currentHousehold = result.data),
      startWith({ error: null, loading: true }),
    );
  }
}