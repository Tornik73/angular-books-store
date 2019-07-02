import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookDataComponent } from './add-book-data.component';

describe('AddBookDataComponent', () => {
  let component: AddBookDataComponent;
  let fixture: ComponentFixture<AddBookDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
