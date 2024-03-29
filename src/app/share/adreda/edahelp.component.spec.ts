import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdahelpComponent } from './edahelp.component';

describe('EdahelpComponent', () => {
  let component: EdahelpComponent;
  let fixture: ComponentFixture<EdahelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdahelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdahelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
