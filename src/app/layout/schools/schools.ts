import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { delay, finalize, map } from 'rxjs';
import { Config } from '../../config';
import { ApplicationState } from '../services/application-state';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { School, schoolEnumMap, SchoolStatus } from './school.model';
import { SchoolService } from './school.service';

@Component({
  selector: 'pasco-schools',
  templateUrl: './schools.html',
  styleUrls: ['./schools.scss'],
  standalone: false,
})
export class Schools implements OnInit {
  appState = inject(ApplicationState);
  private readonly http = inject(HttpClient);
  private readonly schoolService = inject(SchoolService);

  title: string = 'Schools';
  private readonly pageSize = 5;

  schools = signal<School[]>([]);
  loading = signal(false);

  rows = 25;

  pageSizeOptions = [
    { label: '5 Rows', value: 5 },
    { label: '10 Rows', value: 10 },
    { label: '25 Rows', value: 25 },
    { label: '50 Rows', value: 50 },
    { label: '100 Rows', value: 100 },
  ];

  rowActions: MenuItem[] = [
    {
      label: 'View School',
      icon: 'pi pi-eye',
      command: (school: any) => this.viewSchool(school),
    },
    {
      label: 'Edit School',
      icon: 'pi pi-pencil',
      command: (school: any) => this.editSchool(school),
    },
    {
      separator: true,
    },
    {
      label: 'Delete School',
      icon: 'pi pi-trash',
      command: (school: any) => this.deleteSchool(school),
      styleClass: 'text-red-500',
    },
  ];

  statusOptions = [
    { label: 'All Statuses', value: null },
    { label: 'Active', value: 1 },
    { label: 'Pending', value: 2 },
    { label: 'Suspended', value: 3 },
    { label: 'Archived', value: 4 },
  ];

  provinceOptions = [
    { label: 'All Provinces', value: null },
    { label: 'Gauteng', value: 'GAUTENG' },
    { label: 'Western Cape', value: 'WESTERN_CAPE' },
    { label: 'Eastern Cape', value: 'EASTERN_CAPE' },
    { label: 'KwaZulu-Natal', value: 'KWAZULU_NATAL' },
    { label: 'Free State', value: 'FREE_STATE' },
    { label: 'Limpopo', value: 'LIMPOPO' },
    { label: 'Mpumalanga', value: 'MPUMALANGA' },
    { label: 'North West', value: 'NORTH_WEST' },
    { label: 'Northern Cape', value: 'NORTHERN_CAPE' },
  ];

  constructor() {
    this.appState.pageTitle.set(this.title);
  }

  ngOnInit(): void {
    this.loadSchools();
  }

  private loadSchools(): void {
    this.loading.set(true);

    this.schoolService.loadSchools().subscribe({
      next: (schools: any) => {
        this.schools.set(schools ?? []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load schools', error);
        this.schools.set([]);
        this.loading.set(false);
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  addSchool() {
    console.log('Add School');
  }

  editSchool(school: School) {
    console.log('Edit School');
  }

  deleteSchool(school: School) {
    console.log('Delete School');
  }

  viewSchool(school: School) {
    console.log('View School');
  }

  getRowActions(school: School): MenuItem[] {
    return [
      {
        label: 'View School',
        icon: 'pi pi-eye',
        command: () => this.viewSchool(school),
      },
      {
        label: 'Edit School',
        icon: 'pi pi-pencil',
        command: () => this.editSchool(school),
      },
      {
        label: 'Manage Users',
        icon: 'pi pi-users',
        command: () => this.manageUsers(school),
      },
      {
        label: 'View Attendance',
        icon: 'pi pi-calendar',
        command: () => this.viewAttendance(school),
      },
      {
        separator: true,
      },
      {
        label: 'Delete School',
        icon: 'pi pi-trash',
        command: () => this.deleteSchool(school),
        styleClass: 'text-red-500',
      },
    ];
  }

  manageUsers(school: School): void {
    throw new Error('Method not implemented.');
  }

  viewAttendance(school: School): void {
    throw new Error('Method not implemented.');
  }

  getSeverityClass(
    status: SchoolStatus,
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined {
    switch (status) {
      case SchoolStatus.ACTIVE:
        return 'success';
      case SchoolStatus.PENDING:
        return 'warn';
      case SchoolStatus.SUSPENDED:
        return 'danger';
      case SchoolStatus.ARCHIVED:
        return 'info';
      default:
        return 'info';
    }
  }

  clear(table: Table) {
    table.clear();
  }
}
