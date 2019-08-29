import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorOptionsComponent } from './visitor-options.component';

describe('VisitorOptionsComponent', () => {
  let component: VisitorOptionsComponent;
  let fixture: ComponentFixture<VisitorOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
