import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Layout } from './layout/layout';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { UserProfile } from './components/user-profile/user-profile';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TableModule } from 'primeng/table';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
@NgModule({
  declarations: [Layout, Sidebar, Header, UserProfile, ModalDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChangePasswordComponent,
    TableModule,
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
          {
            path: 'schools',
            loadChildren: () => import('./schools/schools-module').then((m) => m.SchoolsModule),
          },
        ],
      },
    ]),
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: 'aura',
      },
    }),
  ],
})
export class LayoutModule {
  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: Aura,
    });
  }
}
