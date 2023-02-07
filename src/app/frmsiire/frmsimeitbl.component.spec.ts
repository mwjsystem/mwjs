import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmsimeitblComponent } from './frmsimeitbl.component';

describe('FrmsimeitblComponent', () => {
  let component: FrmsimeitblComponent;
  let fixture: ComponentFixture<FrmsimeitblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmsimeitblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmsimeitblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
