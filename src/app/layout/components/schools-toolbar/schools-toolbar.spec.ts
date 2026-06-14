import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsToolbar } from './schools-toolbar';

describe('SchoolsToolbar', () => {
  let component: SchoolsToolbar;
  let fixture: ComponentFixture<SchoolsToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
