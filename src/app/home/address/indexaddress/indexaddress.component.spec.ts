import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexaddressComponent } from './indexaddress.component';

describe('IndexaddressComponent', () => {
  let component: IndexaddressComponent;
  let fixture: ComponentFixture<IndexaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
