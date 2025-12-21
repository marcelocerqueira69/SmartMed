import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {Medication} from "../../model/Medication";

@Component({
  selector: 'app-medication-creation',
  templateUrl: './medication-creation.component.html',
  styleUrls: ['./medication-creation.component.css']
})
export class MedicationCreationComponent {
  medication = this._formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1), Validators.max(1000)]],
    timesPerDay: [0, [Validators.required, Validators.min(1), Validators.max(4)]]
  });
  categories = [
    {code: 'analgesic', label: 'Analgesic'},
    {code: 'antiInflamatory', label: 'Anti-inflammatory'},
    {code: 'antipyretic', label: 'Antipyretic'},
    {code: 'analgesic', label: 'Analgesic'},
    {code: 'antibiotic', label: 'Antibiotic'},
    {code: 'antiviral', label: 'Antiviral'},
    {code: 'antifungal', label: 'Antifungal'},
    {code: 'antiparasitic', label: 'Antiparasitic'},
    {code: 'antidepressant', label: 'Antidepressant'},
    {code: 'anxiolytic', label: 'Anxiolytic'},
  ]


  constructor(private _formBuilder: FormBuilder, private toastr: ToastrService) {

  }

  submit(): void {
    if (this.medication.valid) {
      console.log(this.medication.get('category'))
      /*let medications = JSON.parse(localStorage.getItem('medications') || '[]');
      let medication: Medication = {
        id: medications.length,
        name: this.medication.get('name')?.value || '',
        category: this.medication.get('category')?.value || '',
        quantity: this.medication.get('quantity')?.value || 0,
        timesPerDay: this.medication.get('timesPerDay')?.value || 0,
        userCreated: 'Creation user',
        dateCreated: new Date().toISOString(),
        userUpdated: null,
        dateUpdated: null,
      }

      medications.push(medication)
      localStorage.setItem('medications', JSON.stringify(medications))
      this.toastr.success('Medication added with success', 'Success')
      this.medication.reset()*/
    } else {
      this.medication.markAllAsTouched();
    }
  }
}
