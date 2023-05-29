import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from './containers/current-weather/current-weather.component';
import { WeatherDataService } from './services/weather-data.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { SearchWeatherComponent } from './components/search-weather/search-weather.component';
import { FormsModule } from '@angular/forms';
import { PreviewWeatherComponent } from './components/preview-weather/preview-weather.component';




@NgModule({
  declarations: [
    DetailItemComponent,
    CurrentWeatherComponent,
    SearchWeatherComponent,
    PreviewWeatherComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  exports: [CurrentWeatherComponent],
  providers: [WeatherDataService]
})
export class CurrentWeatherModule { }
