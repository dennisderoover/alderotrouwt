import { Component, OnInit, inject } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  public navTransparant = false;
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        if (event.url === '/' || event.url === '/home') {
          this.navTransparant = true;
          console.log(this.navTransparant)
        } else {
          this.navTransparant = false;
          console.log(this.navTransparant)
        }
      }
    })
  }
}
