import { Component } from '@angular/core';
import {Medication} from "../../model/Medication";

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent {
  medications: Medication[] = []

  constructor() {
    this.medications = JSON.parse(localStorage.getItem('medications') || '[]');
  }

  categories: Record<string, string> = {
    analgesic: 'Analgesic',
    antiInflamatory: 'Anti-inflammatory',
    antipyretic: 'Antipyretic',
    antibiotic: 'Antibiotic',
    antiviral: 'Antiviral',
    antifungal: 'Antifungal',
    antiparasitic: 'Antiparasitic',
    antidepressant: 'Antidepressant',
    anxiolytic: 'Anxiolytic'
  };
}
