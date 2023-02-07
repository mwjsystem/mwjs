import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmhmeitblComponent } from './frmhmeitbl.component';

describe('FrmhmeitblComponent', () => {
  let component: FrmhmeitblComponent;
  let fixture: ComponentFixture<FrmhmeitblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmhmeitblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmhmeitblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
