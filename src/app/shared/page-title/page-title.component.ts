import { Component, Input } from '@angular/core';

@Component({
  selector: 'aldero-page-title',
  template: `
    <h1 class="title">{{ pageTitle }}</h1>
  `,
  styles: `
    .title {
      position: relative;
      margin-top: 31px; // adjust for '~the' element

      &::before {
        content: url('/assets/svgs/the.svg');
        position: absolute;
        top: -45px;
        width: 20px;
      }
    }
  `,
  standalone: true,
})

export class PageTitleComponent {
  @Input() pageTitle!: string;
}