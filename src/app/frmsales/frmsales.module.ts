import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeJa from '@angular/common/locales/ja';

import { FrmsalesRoutingModule } from './frmsales-routing.module';
import { FrmsalesComponent } from './frmsales.component';
import { JmeitblComponent } from './jmeitbl.component';
import { JmzaitblComponent } from './jmzaitbl.component';
import { JdnohelpComponent } from '../share/jdnohelp/jdnohelp.component';
import { SpdethelpComponent } from '../share/spdethelp/spdethelp.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    FrmsalesComponent,
    JmeitblComponent,
    JmzaitblComponent,
    JdnohelpComponent,
    SpdethelpComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FrmsalesRoutingModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ja-JP' }
  ]
})
export class FrmsalesModule { }
