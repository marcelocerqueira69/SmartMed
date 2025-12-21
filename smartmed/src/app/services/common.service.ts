import {Injectable} from '@angular/core';
import {Medication} from "../model/Medication";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) {
  }

  getAllMedications(): Medication[] {
    return JSON.parse(localStorage.getItem('medications') || '[]');
  }

  saveAll(medications: Medication[]): void {
    localStorage.setItem('medications', JSON.stringify(medications));
  }

  update(updatedMedication: Medication): void {
    const medications = this.getAllMedications();

    const index = medications.findIndex(m => m.id === updatedMedication.id);
    if (index == null) {
      this.toastr.error('Unable to edit Medication', 'Medication Not Found')
    }

    medications[index] = updatedMedication

    this.saveAll(medications);
  }

  delete(id: number): void {
    const medications = this.getAllMedications().filter(m => m.id !== id);
    this.saveAll(medications);
  }

  getMedication(id: number) {
    const medications = this.getAllMedications();
    const medication = medications.find(m => m.id === id);
    if (!medication) {
      this.toastr.error('Medication not found')
    }
    return medication;
  }

  filterMedications(searchTerm: string | null): Medication[] {
    let medications = this.getAllMedications()
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return medications.filter(med =>
        med.name.toLowerCase().includes(term)
      );
    } else {
      return medications
    }
  }
}
