import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPageComponent } from './research-page.component';

describe('ResearchPageComponent', () => {
  let component: ResearchPageComponent;
  let fixture: ComponentFixture<ResearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchPageComponent]
    });
    fixture = TestBed.createComponent(ResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
