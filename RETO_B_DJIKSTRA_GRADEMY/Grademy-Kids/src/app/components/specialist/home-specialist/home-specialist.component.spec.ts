import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSpecialistComponent } from './home-specialist.component';

describe('HomeSpecialistComponent', () => {
  let component: HomeSpecialistComponent;
  let fixture: ComponentFixture<HomeSpecialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
