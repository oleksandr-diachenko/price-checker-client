import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCheckerInputComponent } from './price-checker-input.component';

describe('PriceCheckerInputComponent', () => {
  let component: PriceCheckerInputComponent;
  let fixture: ComponentFixture<PriceCheckerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCheckerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCheckerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
