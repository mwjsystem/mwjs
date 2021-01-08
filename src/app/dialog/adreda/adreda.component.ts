import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-adreda',
  templateUrl: './adreda.component.html',
  styleUrls: ['./adreda.component.scss']
})
export class AdredaComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AdredaComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.form.addControl('base', new FormGroup({
      eda: new FormControl('', Validators.required)
    }));
    
  }

  close() {
    this.dialogRef.close();
  }
}
