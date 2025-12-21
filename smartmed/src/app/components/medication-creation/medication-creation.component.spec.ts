import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationCreationComponent } from './medication-creation.component';

describe('MedicationCreationComponent', () => {
  let component: MedicationCreationComponent;
  let fixture: ComponentFixture<MedicationCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationCreationComponent]
    });
    fixture = TestBed.createComponent(MedicationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
