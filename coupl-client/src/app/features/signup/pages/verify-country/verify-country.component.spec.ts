import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCountryComponent } from './verify-country.component';

describe('VerifyCountryComponent', () => {
  let component: VerifyCountryComponent;
  let fixture: ComponentFixture<VerifyCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
