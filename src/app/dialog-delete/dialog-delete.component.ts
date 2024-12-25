import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and return true for confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog without confirmation
  }
}
