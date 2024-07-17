import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { SubtitleComponent } from '../shared';

@Component({
  selector: 'aldero-dresscode',
  standalone: true,
  imports: [
    PageTitleComponent,
    SubtitleComponent,
  ],
  templateUrl: './dresscode.component.html',
  styleUrl: './dresscode.component.scss'
})
export class DresscodeComponent {
  public readonly title = 'Dresscode inspiratie';
  public readonly subtitle = `
    Het thema van onze trouw is ‘aardse kleuren’.
    Hieronder enkele foto’s en een kleurpalet ter inspiratie voor je feestoutfit. 
    Zeker niet verplicht, maar altijd fijn als je mee in het plaatje past!
  `
}
