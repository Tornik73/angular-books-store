import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDataComponent } from './edit-user-data.component';

describe('EditUserDataComponent', () => {
  let component: EditUserDataComponent;
  let fixture: ComponentFixture<EditUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
