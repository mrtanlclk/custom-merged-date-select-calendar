import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMergedDateSelectLib } from './merged-months-calendar';

describe('CustomMergedDateSelectLib', () => {
  let component: CustomMergedDateSelectLib;
  let fixture: ComponentFixture<CustomMergedDateSelectLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMergedDateSelectLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMergedDateSelectLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
