import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadChildren: () => import('../login/login-module').then((m) => m.LoginModule) },
  {
    path: 'layout',
    loadChildren: () => import('../layout/layout-module').then((m) => m.LayoutModule),
  },
];
