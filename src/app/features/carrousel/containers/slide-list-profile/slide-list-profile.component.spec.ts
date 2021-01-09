import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideListProfileComponent } from './slide-list-profile.component';

describe('SlideListProfileComponent', () => {
  let component: SlideListProfileComponent;
  let fixture: ComponentFixture<SlideListProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideListProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideListProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
