import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Schools } from './schools';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Select, SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [Schools],
  imports: [
    CommonModule,
    TableModule,
    SelectModule,
    ProgressBarModule,
    TagModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    ToolbarModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Schools }]),
  ],
})
export class SchoolsModule {}
