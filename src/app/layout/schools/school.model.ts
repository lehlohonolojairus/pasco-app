export interface School {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNumber: string;
  headOfficeFaxNumber: string;
  status: SchoolStatus,
  statusName: string
}
export enum SchoolStatus {
  ACTIVE = 1,
  PENDING = 2,
  SUSPENDED = 3,
  ARCHIVED = 4,
}
export type SchoolEnumMap = Record<SchoolStatus, string>;
export const schoolEnumMap: SchoolEnumMap = {
  [SchoolStatus.ACTIVE]: 'Active',
  [SchoolStatus.PENDING]: 'Pending',
  [SchoolStatus.SUSPENDED]: 'Suspended',
  [SchoolStatus.ARCHIVED]: 'Archived',
};
