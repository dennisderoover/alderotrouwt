import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { take, tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { Credentials, Guest, LoadingState } from './rsvp.interfaces';
import { RSVPService } from './rsvp.service';

@Component({
  selector: 'aldero-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
})
export class RSVPComponent {
  public rsvpService = inject(RSVPService);

  public isLoading = false;
  public showStepZero = true;
  public showStepOne = false;
  public form = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    })
  })

  public requestInvitation(): void {
    const credentials: Credentials = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value
    }

    this.rsvpService.getHouseHoldForGuest(credentials)
      .pipe(
        tap((result: LoadingState<Guest[]>) => this.isLoading = result.loading),
        tap(() => {
          if (!this.isLoading && this.rsvpService.currentHousehold && this.rsvpService.currentHousehold.length > 0) {
            this.showStepZero = false;
            this.showStepOne = true;
          }
        })
      )
      .subscribe();
  }
}
