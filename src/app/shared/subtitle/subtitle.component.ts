import { Component, Input } from '@angular/core';

@Component({
  selector: 'aldero-subtitle',
  template: `
    <p class="subtitle">
      <span class="bold">
        {{ title }}
      </span>
      <br>
      {{ subtitle }}
    </p>
  `,
  styles: `
    .subtitle {
      line-height: 1.5;
    }
  `,
  standalone: true,
})

export class SubtitleComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}