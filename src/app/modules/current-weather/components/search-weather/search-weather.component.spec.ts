import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDenySymbolsDirective } from 'src/app/shared/directive/input-deny-symbols.directive';
import { SearchWeatherComponent } from './search-weather.component';

describe('SearchWeatherComponent', () => {
  let component: SearchWeatherComponent;
  let fixture: ComponentFixture<SearchWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWeatherComponent]
    });
    fixture = TestBed.createComponent(SearchWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
