import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamefullComponent } from './gamefull.component';

describe('GamefullComponent', () => {
  let component: GamefullComponent;
  let fixture: ComponentFixture<GamefullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamefullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamefullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
