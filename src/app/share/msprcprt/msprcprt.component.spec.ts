import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsprcprtComponent } from './msprcprt.component';

describe('MsprcprtComponent', () => {
  let component: MsprcprtComponent;
  let fixture: ComponentFixture<MsprcprtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsprcprtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsprcprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
