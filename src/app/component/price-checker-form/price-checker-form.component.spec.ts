import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCheckerFormComponent } from './price-checker-form.component';

describe('PriceCheckerFormComponent', () => {
  let component: PriceCheckerFormComponent;
  let fixture: ComponentFixture<PriceCheckerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCheckerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCheckerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
