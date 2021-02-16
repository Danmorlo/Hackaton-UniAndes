import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterKidComponent } from './register-kid.component';

describe('RegisterKidComponent', () => {
  let component: RegisterKidComponent;
  let fixture: ComponentFixture<RegisterKidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterKidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
