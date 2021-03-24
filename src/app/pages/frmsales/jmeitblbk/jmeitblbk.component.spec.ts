import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JmeitblbkComponent } from './jmeitblbk.component';

describe('JmeitblbkComponent', () => {
  let component: JmeitblbkComponent;
  let fixture: ComponentFixture<JmeitblbkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JmeitblbkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JmeitblbkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
