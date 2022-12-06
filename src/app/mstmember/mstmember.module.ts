import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MstmemberRoutingModule } from './mstmember-routing.module';
import { MstmemberComponent } from './mstmember.component';


@NgModule({
  declarations: [
    MstmemberComponent
  ],
  imports: [
    CommonModule,
    MstmemberRoutingModule
  ]
})
export class MstmemberModule { }
