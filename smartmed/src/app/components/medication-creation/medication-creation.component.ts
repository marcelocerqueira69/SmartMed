import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {Medication} from "../../model/Medication";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-medication-creation',
  templateUrl: './medication-creation.component.html',
  styleUrls: ['./medication-creation.component.css']
})
export class MedicationCreationComponent {
  receivedMedication: Medication | undefined
  editMode: boolean = false

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


  constructor(private _formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,
              private commonService: CommonService, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id')

    if (id !== null) {
      this.receivedMedication = this.commonService.getMedication(Number(id))
      if (this.receivedMedication) {
        this.setMedication(this.receivedMedication)
        this.editMode = true;
      }
    }

    if (!this.editMode) {
      this.medication.reset({
        name: '',
        category: '',
        quantity: 0,
        timesPerDay: 0
      });
    }
  }

  setMedication(medication: Medication) {
    this.medication.patchValue({
      name: medication.name,
      category: medication.category,
      quantity: medication.quantity,
      timesPerDay: medication.timesPerDay
    })
  }

  add(): void {
    if (this.medication.valid) {
      let medications = this.commonService.getAllMedications()
      let medication = this.createMedication(medications.length)

      medications.push(medication)

      this.commonService.saveAll(medications)
      this.toastr.success('Medication added with success', 'Success')
      this.medication.reset()
    } else {
      this.medication.markAllAsTouched();
    }
  }

  edit() {
    if (this.medication.valid) {
      let medication = this.createMedication(1)
      this.commonService.update(medication)
      this.router.navigate(['medication', 'list'])
      this.medication.reset({
        name: '',
        category: '',
        quantity: 0,
        timesPerDay: 0
      });
      this.toastr.success('Medication updated with success', 'Success')
    }
  }

  createMedication(medicationsSize: number): Medication {
    return {
      id: this.receivedMedication ? this.receivedMedication.id : medicationsSize,
      name: this.medication.get('name')?.value || '',
      category: this.medication.get('category')?.value || '',
      quantity: this.medication.get('quantity')?.value || 0,
      timesPerDay: this.medication.get('timesPerDay')?.value || 0,
      userCreated: this.receivedMedication ? this.receivedMedication.userCreated : 'Creation user',
      dateCreated: this.receivedMedication ? this.receivedMedication.dateCreated : new Date().toISOString(),
      userUpdated: this.receivedMedication ? 'Update user' : null,
      dateUpdated: this.receivedMedication ? new Date().toISOString() : null,
    }
  }
}
