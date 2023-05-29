import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data.service';
import { IDetailItem, IWeather } from '../../current-weather.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {
  weather!: IWeather;
  cashedWeather: IWeather[] = [];

  constructor(weatherDataService: WeatherDataService, private ref: ChangeDetectorRef) {
    weatherDataService.getWeatherData().subscribe(data => {
      this.weather = data;
      if (data.detail.length) {
        this.cashedWeather.push(data);
      }
      this.ref.markForCheck();
    });
  }

  trackById(_index: number, value: IWeather) {
    return value.id;
  }

  displaySelectedWeather(selectedWeather: IWeather) {
    this.weather = selectedWeather;
  }
}
