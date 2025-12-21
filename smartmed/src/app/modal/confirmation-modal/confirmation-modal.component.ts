import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  action: string = ''

  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.action = data.action
  }

  closeModal(action: boolean) {
    this.dialogRef.close(action);
  }
}
