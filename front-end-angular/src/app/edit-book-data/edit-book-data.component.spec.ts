import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookDataComponent } from './edit-book-data.component';

describe('EditBookDataComponent', () => {
  let component: EditBookDataComponent;
  let fixture: ComponentFixture<EditBookDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
