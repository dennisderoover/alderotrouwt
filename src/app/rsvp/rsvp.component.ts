import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'aldero-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss'
})
export class RSVPComponent {
  form = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required
    }),
    lastName: new FormControl('', {
      validators: Validators.required
    })
  })

  public requestInvitation(): void {
    const credentials = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value
    }

    alert(
      'searching invitation for: '
      + credentials.firstName
      + ' '
      + credentials.lastName
    );
  }
}
