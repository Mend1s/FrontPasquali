import { Routes } from '@angular/router';
import { PessoasComponent } from '../pages/pessoas/pessoas.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-person',
    pathMatch: 'full'
  },
  {
    path: 'list-person',
    component: PessoasComponent
  }
];
