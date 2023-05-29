import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IWeather } from '../../current-weather.interface';

@Component({
  selector: 'app-preview-weather',
  templateUrl: './preview-weather.component.html',
  styleUrls: ['./preview-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewWeatherComponent {
  @Input() weather!: IWeather;
  @Output() weatherClicked = new EventEmitter<IWeather>();

  constructor() {}
  
  onClick(): void {
    this.weatherClicked.emit(this.weather);
  }
}
