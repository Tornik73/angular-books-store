import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksTableComponent } from './books-table.component';

describe('BooksTableComponent', () => {
  let component: BooksTableComponent;
  let fixture: ComponentFixture<BooksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
