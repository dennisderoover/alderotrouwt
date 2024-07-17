import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { SubtitleComponent } from "../shared/subtitle/subtitle.component";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: 'aldero-cadeau',
  standalone: true,
  imports: [
    PageTitleComponent,
    SubtitleComponent,
],
  templateUrl: './cadeau.component.html',
  styleUrl: './cadeau.component.scss'
})
export class CadeauComponent {
  public clipboard = inject(Clipboard);
  public title = 'La felicidad solo es real cuando se comparte'
  public subtitle = 
    `Jullie aanwezigheid is voor ons het grootste cadeau. 
    Voor wie toch graag een extra gebaar wil maken, zouden 
    wij een centje om onze huwelijksreis naar Andalusië 
    te maken enorm waarderen.`

  public copyToClipboard(): void {
    this.clipboard.copy('BE44143112368945')
  }
}
