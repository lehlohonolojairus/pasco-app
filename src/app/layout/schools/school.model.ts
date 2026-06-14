export interface School {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNumber: string;
  headOfficeFaxNumber: string;
  status: SchoolStatus,
}
export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
}
