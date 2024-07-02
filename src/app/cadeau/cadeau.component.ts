import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
  selector: 'aldero-cadeau',
  standalone: true,
  imports: [
    PageTitleComponent
  ],
  templateUrl: './cadeau.component.html',
  styleUrl: './cadeau.component.scss'
})
export class CadeauComponent {

}
