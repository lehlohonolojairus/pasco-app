import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApplicationState } from '../services/application-state';
import { CreateSchoolRequest, School, SchoolStatus } from './school.model';
import { SchoolService } from './school.service';
import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';
import { ModalDialogService } from '../components/modal-dialog/modal-dialog.service';
import { CreateSchoolDialog } from '../components/create-school-dialog/create-school-dialog';

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
  private readonly confirmationDialog = inject(ConfirmationDialogService);
  private readonly modalService = inject(ModalDialogService);
  private readonly messageService = inject(MessageService);

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
  SchoolStatus = SchoolStatus;

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

  async addSchool() {
    this.modalService.open({
      title: 'Create School',
      icon: 'pi-building',
      component: CreateSchoolDialog,
      onSave: (component: CreateSchoolDialog) => {
        const payload = component.getPayload();

        if (!payload) {
          component.markAllAsTouched();
          return;
        }

        this.loading.set(true);

        this.schoolService.createSchool(payload as CreateSchoolRequest).subscribe({
          next: (school) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Create School',
              detail: `${school.name} created successfully.`,
              life: 5000,
            });
            this.modalService.close();
            this.loadSchools();
          },
          error: (error) => {
            this.loading.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Create School',
              detail: 'Failed to create school.',
              life: 5000,
            });
            console.error('Failed to create school', error);
          },
        });
      },
    });
  }

  editSchool(school: School) {
    console.log('Edit School');
  }

  async deleteSchool(school: School) {
    console.log('Delete School');
    const confirmed = await this.confirmationDialog.open({
      message: `Are you sure you want to delete ${school.name}?`,
      icon: 'pi pi-trash',
      isDeleteAction: true,
    });

    if (!confirmed) {
      return;
    }

    this.schoolService.deleteSchool(school.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Delete School',
          detail: `${school.name} deleted successfully.`,
          life: 5000,
        });
        this.loadSchools();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete School',
          detail: `Failed to delete ${school.name}.`,
          life: 5000,
        });
        console.error(`Failed to delete school with ID ${school.id}`, error);
      },
    });
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
