import { Component, computed, input } from '@angular/core';
import { SchoolStatus } from '../../schools/school.model';

@Component({
  selector: 'pasco-schools-stats',
  imports: [],
  templateUrl: './schools-stats.html',
  styleUrls: ['./schools-stats.scss'],
  standalone: true,
})
export class SchoolsStats {
  schools = input.required<any[]>();

  totalSchoolsCount = computed(() => {
    return this.schools().length;
  });
  activeSchoolsCount = computed(() => {
    return this.schools().filter((school: any) => school.status === SchoolStatus.ACTIVE).length;
  });
  pendingSchoolsCount = computed(() => {
    return this.schools().filter((school: any) => school.status === SchoolStatus.PENDING).length;
  });
  suspendedSchoolsCount = computed(() => {
    return this.schools().filter((school: any) => school.status === SchoolStatus.SUSPENDED).length;
  });
  archivedSchoolsCount = computed(() => {
    return this.schools().filter((school: any) => school.status === SchoolStatus.ARCHIVED).length;
  });
}
