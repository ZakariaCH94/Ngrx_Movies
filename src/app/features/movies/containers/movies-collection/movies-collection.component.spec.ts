import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCollectionComponent } from './movies-collection.component';

describe('MoviesCollectionComponent', () => {
  let component: MoviesCollectionComponent;
  let fixture: ComponentFixture<MoviesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
