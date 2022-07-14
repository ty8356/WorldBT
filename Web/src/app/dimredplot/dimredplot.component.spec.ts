import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimRedPlotComponent } from './dimredplot.component';

describe('DimRedPlotComponent', () => {
  let component: DimRedPlotComponent;
  let fixture: ComponentFixture<DimRedPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimRedPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimRedPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
