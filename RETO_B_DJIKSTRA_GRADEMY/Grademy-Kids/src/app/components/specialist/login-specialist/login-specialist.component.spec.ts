import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSpecialistComponent } from './login-specialist.component';

describe('LoginSpecialistComponent', () => {
  let component: LoginSpecialistComponent;
  let fixture: ComponentFixture<LoginSpecialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
