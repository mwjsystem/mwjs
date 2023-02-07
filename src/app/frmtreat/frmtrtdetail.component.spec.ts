import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmtrtdetailComponent } from './frmtrtdetail.component';

describe('FrmtrtdetailComponent', () => {
  let component: FrmtrtdetailComponent;
  let fixture: ComponentFixture<FrmtrtdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmtrtdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmtrtdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
