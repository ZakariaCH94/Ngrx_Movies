import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTabObjectComponent } from './select-tab-object.component';

describe('SelectTabObjectComponent', () => {
  let component: SelectTabObjectComponent;
  let fixture: ComponentFixture<SelectTabObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTabObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTabObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
