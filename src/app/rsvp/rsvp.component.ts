import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { Activity, Attendance, Credentials, Guest, LoadingState, SelectionAnswer } from './rsvp.interfaces';
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
  public showAntwerp = false;
  public showCeremony = false;
  public showDiner = false;
  public showParty = false;
  public eSelectionAnswer = SelectionAnswer;
  public eActivity = Activity;
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
  public attendances: Attendance[] = [];

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
            const currentHousehold = this.rsvpService.currentHousehold;

            currentHousehold.forEach((guest: Guest) => this.attendances.push({
              guest: guest
            }))

            this.showStepZero = false;

            if (currentHousehold.find((guest: Guest) => guest.invitedFor.includes(Activity.ANTWERP))) {
              this.showAntwerp = true;
            }
          }
        })
      )
      .subscribe();
  }

  public selectAnswer(activity: Activity, answer: SelectionAnswer, guest: Guest): void {
    const guestAttandance = this.attendances.find((item: Attendance) => item.guest?.id === guest.id);

    if (!guestAttandance) {
      return;
    }

    switch (activity) {
      case Activity.ANTWERP:
        guestAttandance.antwerp = answer;
        break;
      case Activity.CEREMONY:
        guestAttandance.ceremony = answer;
        break;
      case Activity.DINER:
        guestAttandance.diner = answer;
        break;
      case Activity.PARTY:
        guestAttandance.party = answer;
        break;
      default:
        break;
    }
  }

  public guestIsNotComing(activity: Activity, guest: Guest): boolean {
    const guestAttandance = this.attendances.find((item: Attendance) => item.guest?.id === guest.id);

    if (!guestAttandance) {
      return false;
    }

    switch (activity) {
      case Activity.ANTWERP:
        return guestAttandance.antwerp === SelectionAnswer.NOT_COMING;
      case Activity.CEREMONY:
        return guestAttandance.ceremony === SelectionAnswer.NOT_COMING;
      case Activity.DINER:
        return guestAttandance.diner === SelectionAnswer.NOT_COMING;
      case Activity.PARTY:
        return guestAttandance.party === SelectionAnswer.NOT_COMING;
      default:
        return false;
    }
  }

  public guestIsComing(activity: Activity, guest: Guest): boolean {
    const guestAttandance = this.attendances.find((item: Attendance) => item.guest?.id === guest.id);

    if (!guestAttandance) {
      return false;
    }

    switch (activity) {
      case Activity.ANTWERP:
        return guestAttandance.antwerp === SelectionAnswer.COMING;
      case Activity.CEREMONY:
        return guestAttandance.ceremony === SelectionAnswer.COMING;
      case Activity.DINER:
        return guestAttandance.diner === SelectionAnswer.COMING;
      case Activity.PARTY:
        return guestAttandance.party === SelectionAnswer.COMING;
      default:
        return false;
    }
  }

  public submitAnswers(activity: Activity): void {
    if (this.rsvpService.currentHousehold && this.rsvpService.currentHousehold.length > 0) {
      const currentHousehold = this.rsvpService.currentHousehold;

      if (
        activity === Activity.ANTWERP &&
        currentHousehold.every((guest: Guest) => guest.invitedFor.includes(Activity.CEREMONY))
      ) {
        return this.goToNextActivity(Activity.CEREMONY);
      }

      if (
        (
          activity === Activity.ANTWERP ||
          activity === Activity.CEREMONY
        ) &&
        currentHousehold.every((guest: Guest) => guest.invitedFor.includes(Activity.DINER))
      ) {
        return this.goToNextActivity(Activity.DINER);
      }

      if (
        (
          activity === Activity.ANTWERP ||
          activity === Activity.CEREMONY ||
          activity === Activity.DINER
        ) &&
        currentHousehold.every((guest: Guest) => guest.invitedFor.includes(Activity.PARTY))
      ) {
        return this.goToNextActivity(Activity.PARTY);
      }

      // TODO: persist these answers to Google Sheet
      console.log('persist these answers:', this.attendances)
    }
  }

  private goToNextActivity(activity: Activity): void {
    this.showAntwerp = Activity.ANTWERP === activity;
    this.showCeremony = Activity.CEREMONY === activity;
    this.showDiner = Activity.DINER === activity;
    this.showParty = Activity.PARTY === activity;
  }

  public submitStepEnabled(activity: Activity): boolean {
    switch (activity) {
      case Activity.ANTWERP:
        return this.attendances.every((attendance: Attendance) => !!attendance.antwerp)
      case Activity.CEREMONY:
        return this.attendances.every((attendance: Attendance) => !!attendance.ceremony)
      case Activity.DINER:
        return this.attendances.every((attendance: Attendance) => !!attendance.diner)
      case Activity.PARTY:
        return this.attendances.every((attendance: Attendance) => !!attendance.party)
      default:
        return false;
    }
  }
}
