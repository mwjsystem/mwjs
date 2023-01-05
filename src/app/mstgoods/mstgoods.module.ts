import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MstgoodsRoutingModule } from './mstgoods-routing.module';
import { MstgoodsComponent } from './mstgoods.component';
import { GrpcdhelpComponent } from '../share/grpcdhelp/grpcdhelp.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GdstblComponent } from './gdstbl.component';
import { GtnktblComponent } from './gtnktbl.component';
import { GdsimageComponent } from '../share/gdsimage/gdsimage.component';
import { GcdhelpComponent } from '../share/gcdhelp/gcdhelp.component';
import { GzaiComponent } from '../share/gzai/gzai.component';

@NgModule({
  declarations: [
    MstgoodsComponent,
    GrpcdhelpComponent,
    GdstblComponent,
    GtnktblComponent,
    GdsimageComponent,
    GcdhelpComponent,
    GzaiComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MstgoodsRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule
  ]
})
export class MstgoodsModule { }
