import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsContainerComponent } from './movie-details-container.component';

describe('MovieDetailsContainerComponent', () => {
  let component: MovieDetailsContainerComponent;
  let fixture: ComponentFixture<MovieDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
