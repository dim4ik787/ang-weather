import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewWeatherComponent } from './preview-weather.component';

describe('PreviewWeatherComponent', () => {
  let component: PreviewWeatherComponent;
  let fixture: ComponentFixture<PreviewWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewWeatherComponent]
    });
    fixture = TestBed.createComponent(PreviewWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
