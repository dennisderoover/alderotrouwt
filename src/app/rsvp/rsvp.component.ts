import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'aldero-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss'
})
export class RSVPComponent {

}
