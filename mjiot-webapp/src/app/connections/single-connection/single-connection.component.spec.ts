import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleConnectionComponent } from './single-connection.component';

describe('SingleConnectionComponent', () => {
  let component: SingleConnectionComponent;
  let fixture: ComponentFixture<SingleConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
