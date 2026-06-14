import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'pasco-schools-toolbar',
  imports: [SelectModule, ButtonModule, ToolbarModule],
  templateUrl: './schools-toolbar.html',
  styleUrl: './schools-toolbar.scss',
})
export class SchoolsToolbar {
  searchChanged = (value: any) => {
    console.log('Search changed:', value);
  };
}
