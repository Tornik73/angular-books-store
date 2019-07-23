import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookDataComponent } from './delete-book-data.component';

describe('DeleteBookDataComponent', () => {
  let component: DeleteBookDataComponent;
  let fixture: ComponentFixture<DeleteBookDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBookDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
