import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Mcd,McdService } from './mcd.service';

@Component({
  selector: 'app-mcdhelp',
  templateUrl: './mcdhelp.component.html',
  styleUrls: ['./mcdhelp.component.scss']
})
export class McdhelpComponent implements OnInit {

  constructor(public mcdsrv:McdService,
              private dialogRef: MatDialogRef<McdhelpComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.mcdsrv.filtx = data.filter;
  }

  ngOnInit(): void {
  }

  sel_mcd(selected:Mcd ) {
    // console.log("select",selected);
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }



}
