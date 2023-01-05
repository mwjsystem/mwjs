import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdredaComponent } from './adreda.component';

describe('AdredaComponent', () => {
  let component: AdredaComponent;
  let fixture: ComponentFixture<AdredaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdredaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdredaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
