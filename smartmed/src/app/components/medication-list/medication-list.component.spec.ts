import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationListComponent } from './medication-list.component';

describe('MedicationListComponent', () => {
  let component: MedicationListComponent;
  let fixture: ComponentFixture<MedicationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationListComponent]
    });
    fixture = TestBed.createComponent(MedicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
