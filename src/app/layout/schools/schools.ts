import { Component, computed, inject, signal } from '@angular/core';
import { ApplicationState } from '../services/application-state';
import { Table } from 'primeng/table';

interface School {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNumber: string;
  headOfficeFaxNumber: string;
}

@Component({
  selector: 'pasco-schools',
  templateUrl: './schools.html',
  styleUrls: ['./schools.scss'],
  standalone: false,
})
export class Schools {
  appState = inject(ApplicationState);
  title: string = 'Schools';

  private readonly pageSize = 5;
  schools = signal<School[]>([
    {
      id: '54169578-25f9-4c2f-9259-44d9f5970d90',
      name: 'Alma Mater',
      logoUrl: 'https://almamaterinternationalschool.co.za/wp-content/uploads/2024/02/Logo.png',
      website: '',
      headOfficeEmailAddress: 'admin@almacambridge.org.za',
      headOfficeTelephoneNumber: '+27 11 660 7567',
      headOfficeFaxNumber: '',
    },
    {
      id: 'd93d7777-3e66-45be-87f4-2a2f21a6c41e',
      name: 'Crawford International',
      logoUrl:
        'https://lirp.cdn-website.com/0f45544c/dms3rep/multi/opt/cwfdint_logo_landscape-1920w.png',
      website: '',
      headOfficeEmailAddress: 'ruimsig@crawfordinternational.co.za',
      headOfficeTelephoneNumber: '+27 11 958 0707',
      headOfficeFaxNumber: '',
    },
    {
      id: '0eb30fea-94d6-4b28-a605-fde157ce1e80',
      name: 'Kingsmead',
      logoUrl: 'https://kingsmead.co.za/wp-content/uploads/2021/02/Kingsmead-LOGO-4.png',
      website: '',
      headOfficeEmailAddress: 'senior@kingsmead.co.za',
      headOfficeTelephoneNumber: '+27 11 731 7300',
      headOfficeFaxNumber: '+27 11 731-7399',
    },
    {
      id: 'b0392ee6-aac8-4198-85f1-44f312a63c26',
      name: 'Legends Academy',
      logoUrl: 'https://legendschools.co.za/wp-content/uploads/2019/04/Logo-300x162.png',
      website: '',
      headOfficeEmailAddress: 'legendsacademysa@gmail.com',
      headOfficeTelephoneNumber: '+27 11 766 2545',
      headOfficeFaxNumber: '',
    },
    {
      id: '997d54cf-9194-46df-8675-f746e059a2c6',
      name: 'Lion Pride Academy',
      logoUrl:
        'https://www.lionprideacademy.co.za/wp-content/uploads/2025/02/LPA-secondary-logo-without-EN.png',
      website: '',
      headOfficeEmailAddress: 'info@lionprideacademy.co.za',
      headOfficeTelephoneNumber: '+27 60 014 0722',
      headOfficeFaxNumber: '',
    },
    {
      id: 'fabbb55a-84c1-4521-b3f7-b7ff51171341',
      name: 'Little Legends',
      logoUrl: 'https://legendschools.co.za/wp-content/uploads/2019/04/Logo-300x162.png',
      website: '',
      headOfficeEmailAddress: 'legendsacademysa@gmail.com',
      headOfficeTelephoneNumber: '+27 11 766 2545',
      headOfficeFaxNumber: '',
    },
    {
      id: '019cb68a-a542-7cd7-8bf4-d2e5686ddbf3',
      name: 'Moletsane Secondary School',
      logoUrl: '',
      website: 'https://www.moletsane.ac.za',
      headOfficeEmailAddress: 'moletsane@high.school',
      headOfficeTelephoneNumber: '0710114331',
      headOfficeFaxNumber: '',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Spark Schools',
      logoUrl:
        'https://cdn.prod.website-files.com/6703af5097c43447fde54ce5/6705181e5cdd70fabf9241e8_SPARK%20Logo%20banner.png',
      website: '',
      headOfficeEmailAddress: 'privacy@sparkschools.co.za',
      headOfficeTelephoneNumber: '+27 10 125 0601',
      headOfficeFaxNumber: '',
    },
  ]);

  rows = 25;

  pageSizeOptions = [
    { label: '10 Rows', value: 10 },
    { label: '25 Rows', value: 25 },
    { label: '50 Rows', value: 50 },
    { label: '100 Rows', value: 100 },
  ];

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  addSchool() {
    console.log('Add School');
  }

  constructor() {
    this.appState.pageTitle.set(this.title);
  }

  clear(table: Table) {
    table.clear();
  }
}
