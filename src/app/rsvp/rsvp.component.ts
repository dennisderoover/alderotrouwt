import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { Activity, Attendance, Attending, Credentials, Guest, LoadingState, SelectionAnswer } from './rsvp.interfaces';
import { RSVPService } from './rsvp.service';
import {
  PageTitleComponent,
  SubtitleComponent
} from '../shared'

@Component({
  selector: 'aldero-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    PageTitleComponent,
    SubtitleComponent,
  ],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
})
export class RSVPComponent {
  public rsvpService = inject(RSVPService);

  public isLoading = false;
  public showInput = true;
  public showAlreadyAnswered = false;
  public showAntwerp = false;
  public showCeremony = false;
  public showDiner = false;
  public showParty = false;
  public showQuestionsOrRemarks = false;
  public showEndComing = false;
  public showEndNotComing = false;

  public eSelectionAnswer = SelectionAnswer;
  public eActivity = Activity;

  public notFoundCredentials = '';

  public form = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    remarks: new FormControl('', {
      nonNullable: true
    }),
  })

  public attendances: Attendance[] = [];

  public requestInvitation(): void {
    const credentials: Credentials = {
      firstName: this.form.controls.firstName.value.trim(),
      lastName: this.form.controls.lastName.value.trim()
    }

    this.rsvpService.getHouseHoldForGuest(credentials)
      .pipe(
        tap((result: LoadingState<Guest[]>) => this.isLoading = result.loading),
        tap(() => {
          if (!this.isLoading && this.rsvpService.currentHousehold && this.rsvpService.currentHousehold.length > 0) {
            this.resetNotFoundCredentials();

            const currentHousehold = this.rsvpService.currentHousehold;

            this.showAlreadyAnswered = this.checkAlreadyAnswered(currentHousehold);

            currentHousehold.forEach((guest: Guest) => this.attendances.push({
              guest: guest
            }))

            this.showInput = false;

            if (!this.showAlreadyAnswered && currentHousehold.find((guest: Guest) => guest.invitedFor.includes(Activity.ANTWERP))) {
              this.showAntwerp = true;
            }
          } else if (!this.isLoading && credentials.firstName === 'Esther' && credentials.lastName === 'Alderweireld') {
            this.notFoundCredentials = `${this.form.controls.firstName.value.trim()} ${this.form.controls.lastName.value.trim()}`;
            this.form.reset();
            this.form.setErrors({
              brideNameEntered: true
            })

          } else if (!this.isLoading && credentials.firstName === 'Dennis' && credentials.lastName === 'De Roover') {
            this.notFoundCredentials = `${this.form.controls.firstName.value.trim()} ${this.form.controls.lastName.value.trim()}`;
            this.form.reset();
            this.form.setErrors({
              groomNameEntered: true
            })

          } else if (!this.isLoading) {
            this.notFoundCredentials = `${this.form.controls.firstName.value.trim()} ${this.form.controls.lastName.value.trim()}`;
            this.form.reset();
            this.form.setErrors({
              invitationNotFound: true
            })
          }
        })
      )
      .subscribe();
  }

  private resetNotFoundCredentials(): void {
    this.notFoundCredentials = '';
  }

  private checkAlreadyAnswered(currentHousehold: Guest[]): boolean {
    return !!currentHousehold.find((guest: Guest) => guest.alreadyReplied);
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
    if (!this.rsvpService.currentHousehold || this.rsvpService.currentHousehold.length === 0) {
      return;
    }

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

    this.goToQuestionsOrRemarks();
  }

  public goToQuestionsOrRemarks(): void {
    this.resetActivitySteps();
    this.showQuestionsOrRemarks = true;
  }

  public submitAttendances(): void {
    const remarks = this.form.controls.remarks.value;

    if (remarks) {
      this.attendances.forEach((attendance: Attendance) => attendance.remarks = remarks);
    }

    this.rsvpService.submitAttendances(this.attendances)
      .pipe(
        tap((result: LoadingState<string>) => this.isLoading = result.loading),
        tap(() => {
          if (!this.isLoading) {
            this.goToNextActivity()
          }
        })
      )
      .subscribe();
  }

  public goToNextActivity(activity?: Activity): void {
    if (this.showAlreadyAnswered) {
      this.showAlreadyAnswered = false;
    }

    if (activity) {
      this.showAntwerp = Activity.ANTWERP === activity;
      this.showCeremony = Activity.CEREMONY === activity;
      this.showDiner = Activity.DINER === activity;
      this.showParty = Activity.PARTY === activity;
      return;
    }

    this.resetActivitySteps();

    if (
      this.attendances.find((attendance: Attendance) => 
        attendance.antwerp === SelectionAnswer.COMING ||
        attendance.ceremony === SelectionAnswer.COMING ||
        attendance.diner === SelectionAnswer.COMING ||
        attendance.party === SelectionAnswer.COMING
      )
    ) {
      this.showEndComing = true;
    } else {
      this.showEndNotComing = true;
    }
  }

  private resetActivitySteps(): void {
    this.showAntwerp = false;
    this.showCeremony = false;
    this.showDiner = false;
    this.showParty = false;
    this.showQuestionsOrRemarks = false;
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

  public attendingEvent(event: Activity, guestAttending: Attending[]): boolean {
    switch (event) {
      case Activity.ANTWERP:
        return !!guestAttending.find((att: Attending) => att.antwerp);
      case Activity.CEREMONY:
        return !!guestAttending.find((att: Attending) => att.ceremony);
      case Activity.DINER:
        return !!guestAttending.find((att: Attending) => att.diner);
      case Activity.PARTY:
        return !!guestAttending.find((att: Attending) => att.party);
      default:
        return false;
    }
  }
}
