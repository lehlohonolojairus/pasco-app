import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateSchoolRequest, School, schoolEnumMap, UpdateSchoolRequest } from './school.model';
import { Config } from '../../config';
import { map, Observable } from 'rxjs';

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

  getSchoolById(id: string | number): Observable<School> {
    return this.http.get<School>(Config.schools.getById(id));
  }

  createSchool(payload: CreateSchoolRequest): Observable<School> {
    return this.http.post<School>(Config.schools.create, payload);
  }

  updateSchool(id: string | number, payload: UpdateSchoolRequest): Observable<School> {
    return this.http.put<School>(Config.schools.update(id), payload);
  }

  deleteSchool(id: string | number): Observable<void> {
    return this.http.delete<void>(Config.schools.delete(id));
  }
}
