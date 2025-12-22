import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import {Medication} from "../model/Medication";

describe('CommonService', () => {
  let service: CommonService;
  const mockMedications: Medication[] = [
    { id: 1, name: 'Paracetamol', category: 'analgesic', quantity: 10, timesPerDay: 2, userCreated: '', dateCreated: '', userUpdated: null, dateUpdated: null },
    { id: 2, name: 'Ibuprofen', category: 'antiInflamatory', quantity: 5, timesPerDay: 3, userCreated: '', dateCreated: '', userUpdated: null, dateUpdated: null },
    { id: 3, name: 'Aspirin', category: 'antipyretic', quantity: 7, timesPerDay: 1, userCreated: '', dateCreated: '', userUpdated: null, dateUpdated: null }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);


    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'medications') return JSON.stringify(mockMedications);
      return null;
    });
  });


  it('should return all medications if search term is empty', () => {
    const result: Medication[] = service.filterMedications('');
    expect(result.length).toBe(3);
  });

  it('should filter medications by name', () => {
    const result = service.filterMedications('ibu');
    expect(result).toEqual([{ id: 2, name: 'Ibuprofen', category: 'antiInflamatory', quantity: 5, timesPerDay: 3, userCreated: '', dateCreated: '', userUpdated: null, dateUpdated: null }]);
  })

  it('should filter medications by name', () => {
    const result = service.filterMedications('para');
    expect(result).toEqual([{ id: 1, name: 'Paracetamol', category: 'analgesic', quantity: 10, timesPerDay: 2, userCreated: '', dateCreated: '', userUpdated: null, dateUpdated: null }]);
  })

  it('should return empty array if no match', () => {
    const result = service.filterMedications('xyz');
    expect(result).toEqual([]);
  });
});
