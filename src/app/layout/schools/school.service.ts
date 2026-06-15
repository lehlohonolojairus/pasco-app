import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { School, schoolEnumMap } from './school.model';
import { Config } from '../../config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private readonly http = inject(HttpClient);

  loadSchools() {
    return this.http
      .get<School[]>(Config.schools.getAll)
      .pipe(map((response: any) => response.data ?? []))
      .pipe(
        map((schools: School[]) =>
          schools.map((school) => ({
            ...school,
            statusName: schoolEnumMap[school.status],
          })),
        ),
      );
  }
}
