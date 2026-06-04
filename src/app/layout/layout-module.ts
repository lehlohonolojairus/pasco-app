import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Layout } from './layout/layout';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { UserProfile } from './components/user-profile/user-profile';

@NgModule({
  declarations: [Layout, Sidebar, Header, UserProfile],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Layout,
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
          },
        ],
      },
    ]),
  ],
})
export class LayoutModule {}
