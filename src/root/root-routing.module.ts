import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'account/login', pathMatch: 'full'
  },
  {
    path: "account",
    loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
    data: { preload: true },
  },
  {
    path: "app",
    loadChildren: () => import('../app/app.module').then(m => m.AppModule),
    data: { preload: true },
  },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }

