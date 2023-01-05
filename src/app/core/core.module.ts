import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPipe } from './pipes/blank.pipe';
import { JdatePipe } from './pipes/jdate.pipe';
import { McdtxtPipe } from './pipes/mcdtxt.pipe';
import { ModetxtPipe } from './pipes/modetxt.pipe';
import { StaffPipe } from './pipes/staff.pipe';
import { VcdtxtPipe } from './pipes/vcdtxt.pipe';
import { NuminputDirective } from './directives/numinput.directive';
import { TabDirective } from './directives/tab/tab.directive';
import { TmstmpComponent } from './tmstmp/tmstmp.component';


@NgModule({
  declarations: [
    BlankPipe,
    JdatePipe,
    McdtxtPipe,
    ModetxtPipe,
    StaffPipe,
    VcdtxtPipe,
    NuminputDirective,
    TabDirective,
    TmstmpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NuminputDirective,
    TabDirective,
    StaffPipe,
    JdatePipe,
    McdtxtPipe,
    VcdtxtPipe,
    ModetxtPipe,
    BlankPipe,
    TmstmpComponent
  ],
})
export class CoreModule { }
