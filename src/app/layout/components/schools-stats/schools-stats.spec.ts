import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsStats } from './schools-stats';

describe('SchoolsStats', () => {
  let component: SchoolsStats;
  let fixture: ComponentFixture<SchoolsStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsStats],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
