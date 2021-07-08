import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDimentionalScannerComponent } from './one-dimentional-scanner.component';

describe('OneDimentionalScannerComponent', () => {
  let component: OneDimentionalScannerComponent;
  let fixture: ComponentFixture<OneDimentionalScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDimentionalScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDimentionalScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
