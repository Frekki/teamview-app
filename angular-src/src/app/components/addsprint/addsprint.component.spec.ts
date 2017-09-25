import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsprintComponent } from './addsprint.component';

describe('AddsprintComponent', () => {
  let component: AddsprintComponent;
  let fixture: ComponentFixture<AddsprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
