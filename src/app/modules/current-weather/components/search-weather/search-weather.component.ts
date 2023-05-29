import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherDataService } from '../../services/weather-data.service';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWeatherComponent {
  constructor(private weatherDataService: WeatherDataService) {}
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.weatherDataService.updateWeatherByCity(form.value['city']);
    }
  }
}
