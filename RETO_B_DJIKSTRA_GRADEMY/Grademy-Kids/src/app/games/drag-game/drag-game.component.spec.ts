import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragGameComponent } from './drag-game.component';

describe('DragGameComponent', () => {
  let component: DragGameComponent;
  let fixture: ComponentFixture<DragGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
