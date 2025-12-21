import {Component, OnDestroy, OnInit} from '@angular/core';
import {Medication} from "../../model/Medication";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime, Subscription} from "rxjs";
import {ConfirmationModalComponent} from "../../modal/confirmation-modal/confirmation-modal.component";
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent implements OnInit, OnDestroy {
  medications: Medication[] = []
  searchControl = new FormControl('');
  showTable: boolean = false
  protected subscriptionList: Subscription = new Subscription();

  constructor(protected readonly dialog: MatDialog, private commonService: CommonService, private router: Router,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.retrieveMedications()
    this.showTable = true

    this.subscriptionList.add(this.searchControl.valueChanges
      .pipe(debounceTime(200)) // wait 200ms after user stops typing
      .subscribe(searchTerm => {
        this.showTable = false
        this.medications = this.commonService.filterMedications(searchTerm);
        this.showTable = true
      }))
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

  retrieveMedications(): void {
    this.medications = JSON.parse(localStorage.getItem('medications') || '[]');
  }

  edit(id: number): void {
    this.router.navigate(['medication', 'edit', id],)
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent,
      {disableClose: false, panelClass: 'confirmation-modal', width: '35vw', height: 'auto', data: {action: 'delete'}}
    );
    this.subscriptionList.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.delete(id)

        this.showTable = false
        this.retrieveMedications()
        this.showTable = true
        this.toastr.success('Medication deleted with success', 'Success')
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe()
  }
}
