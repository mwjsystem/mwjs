import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  imports: [
      MatButtonModule
     ,MatCardModule
     ,MatCheckboxModule
     ,MatDatepickerModule
     ,MatDialogModule
     ,MatFormFieldModule
     ,MatIconModule
     ,MatInputModule
     ,MatMenuModule
     ,MatPaginatorModule
    //  ,MatProgressSpinnerModule
    //  ,MatSpinner
     ,MatSelectModule
     ,MatStepperModule
     ,MatTableModule
     ,MatTabsModule
     ,MatToolbarModule
     ,MatNativeDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'}
  ],
  exports: [
      MatButtonModule
     ,MatCardModule
     ,MatCheckboxModule
     ,MatDatepickerModule
     ,MatDialogModule
     ,MatFormFieldModule
     ,MatIconModule
     ,MatInputModule
     ,MatMenuModule
     ,MatPaginatorModule
    //  ,MatProgressSpinnerModule
    //  ,MatSpinner
     ,MatSelectModule
     ,MatStepperModule
     ,MatTableModule
     ,MatTabsModule
     ,MatToolbarModule
     ,MatNativeDateModule
  ]
})
export class MaterialModule { }
