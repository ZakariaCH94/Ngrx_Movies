import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddMovieComponent } from './form-add-movie.component';

describe('FormAddMovieComponent', () => {
  let component: FormAddMovieComponent;
  let fixture: ComponentFixture<FormAddMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
