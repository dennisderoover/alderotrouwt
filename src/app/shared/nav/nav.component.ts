import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuAnimation } from './animations';

@Component({
  selector: 'aldero-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  animations: [MenuAnimation]
})
export class NavComponent {
  @Input() navTransparant!: boolean
  public navItems = [
    'home',
    'dresscode',
    'locatie',
    'cadeau',
    'rsvp',
  ];
  public isMobileMenuOpen = false;
  private router = inject(Router);


  public navigate(navItem: string): void {
    this.isMobileMenuOpen = false;
    this.router.navigate([navItem]);
  }

  public openMobileMenu(): void {
    this.isMobileMenuOpen = true;
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
