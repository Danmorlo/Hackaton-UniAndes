import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingGameComponent } from './drawing-game.component';

describe('DrawingGameComponent', () => {
  let component: DrawingGameComponent;
  let fixture: ComponentFixture<DrawingGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
