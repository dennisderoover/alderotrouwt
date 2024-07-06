import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { SubtitleComponent } from '../shared';
import { GoogleMapsModule } from '@angular/google-maps';

const mapId = '864a1405d36d9f6';

interface Location {
  lat: number,
  lng: number,
  marker: HTMLElement
}

@Component({
  selector: 'aldero-locatie',
  standalone: true,
  imports: [
    PageTitleComponent,
    SubtitleComponent,
    GoogleMapsModule,
  ],
  templateUrl: './locatie.component.html',
  styleUrl: './locatie.component.scss'
})
export class LocatieComponent {
  public options: google.maps.MapOptions = {
    mapId: mapId,
    center: { lat: 51.160, lng: 4.571 },
    zoom: 10,
    disableDefaultUI: true,
  };
  public locations: Location[];

  constructor() {
    const parser = new DOMParser();
    const svgString = `
      <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#945030" /></svg>
    `
    this.locations = [
      {
        lat: 51.069,
        lng: 4.730,
        marker: parser.parseFromString(svgString, "image/svg+xml").documentElement
      },
      {
        lat: 51.221,
        lng: 4.399,
        marker: parser.parseFromString(svgString, "image/svg+xml").documentElement
      },
    ]
  }
}
