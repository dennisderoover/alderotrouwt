import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DresscodeComponent } from './dresscode/dresscode.component';
import { LocatieComponent } from './locatie/locatie.component';
import { CadeauComponent } from './cadeau/cadeau.component';
import { RSVPComponent } from './rsvp/rsvp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'dresscode',
    component: DresscodeComponent,
  },
  {
    path: 'locatie',
    component: LocatieComponent,
  },
  {
    path: 'cadeau',
    component: CadeauComponent,
  },
  {
    path: 'rsvp',
    component: RSVPComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
