import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDataComponent } from './add-user-data.component';

describe('AddUserDataComponent', () => {
  let component: AddUserDataComponent;
  let fixture: ComponentFixture<AddUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
