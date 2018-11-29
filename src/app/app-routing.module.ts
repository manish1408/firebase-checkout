import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'webshop',
    loadChildren: '../app/webshop/webshop.module#WebshopModule'
  },
  {
    path: '',
    redirectTo: 'webshop',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
