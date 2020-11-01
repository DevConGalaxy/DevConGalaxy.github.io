import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resume-dialog',
  template: `
    <h2 mat-dialog-title>Resume Tutorial</h2>
    <mat-dialog-content>We noticed you have already started this tutorial. Do you want to continue it?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button (click)="close('restart')">Restart</button>
      <button mat-raised-button color="primary" (click)="close('resume')">Continue</button>
    </mat-dialog-actions>
  `
})
export class ResumeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ResumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(val: string) {
    this.dialogRef.close(val);
  }
}
