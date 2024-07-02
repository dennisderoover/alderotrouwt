import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { SubtitleComponent } from '../shared';

@Component({
  selector: 'aldero-locatie',
  standalone: true,
  imports: [
    PageTitleComponent,
    SubtitleComponent,
  ],
  templateUrl: './locatie.component.html',
  styleUrl: './locatie.component.scss'
})
export class LocatieComponent {

}
