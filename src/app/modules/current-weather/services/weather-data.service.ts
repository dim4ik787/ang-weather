import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { IDetailItem, IWeather, IWeatherDTO } from '../current-weather.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class WeatherDataService {
  private initWeatherData: IWeather = {
    id: 0,
    name: 'Enter the city name in the input field',
    temperature: null,
    description: 'For example, "Moscow"',
    detail: []
  }

  private weatherData$ = new BehaviorSubject<IWeather>(this.initWeatherData);

  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private imgBase = 'https://openweathermap.org/img/w/'
  private apiKey = '4c94a206e188350763e158ba04ae7674'; //refactor
  private id: number = 1;

  constructor(private http: HttpClient) {
 
    const storedPosition = localStorage.getItem('coordinates');

    if (storedPosition) {
      const position = JSON.parse(storedPosition);
      this.updateWeatherByCoords(position);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          localStorage.setItem('coordinates', JSON.stringify(coordinates));
          this.updateWeatherByCoords(position.coords);
        },
        (error: GeolocationPositionError) => {
          console.log('Okay :(', error.message);
        }
      );
    }
  }

  getWeatherData(): Observable<IWeather> {
    return this.weatherData$.asObservable();
  }

  setWeatherData(weatherData: IWeather): void {
    this.weatherData$.next(weatherData);
  }
  
  updateWeatherByCoords({latitude, longitude}: GeolocationCoordinates): void {
    const queryParams = new HttpParams()
    .set('lat', latitude.toString())
    .set('lon', longitude.toString())

    this.updateWeatherFromApi(queryParams);
  }

  updateWeatherByCity(city: string, country?: string): void {
    const queryParams = new HttpParams()
    .set(
      'q',
      country ? `${city},${country}` : city
    )

    this.updateWeatherFromApi(queryParams);
  }

  private updateWeatherFromApi(queryParams: HttpParams): void {
    queryParams = queryParams
      .set('appid', this.apiKey)
      .set('units', 'metric');

    this.http
      .get<IWeatherDTO>(this.apiUrl, { params: queryParams })
      .subscribe({
        next: (weatherData: IWeatherDTO) => {
        const parsedData = this.parseWeatherData(weatherData);
        this.setWeatherData(parsedData);
      },
        error: (err) => {
          this.setWeatherData({
            id: ++this.id,
            name: `${err?.error.message}`,
            temperature: null,
            description: 'Enter the city name in the input field. For example, "Moscow"',
            detail: []
          });
        }});
  }

  private parseWeatherData(weatherDTO: IWeatherDTO): IWeather {
    const detail: IDetailItem[] = [];

    this.addDetailsFromWeatherDTO(weatherDTO.main, detail);
    this.addDetailsFromWeatherDTO(weatherDTO.wind, detail, 'Wind: ');

    return {
      id: ++this.id,
      name: weatherDTO.name,
      temperature: weatherDTO.main.temp,
      description: weatherDTO.weather[0].description,
      detail,
      image: `${this.imgBase}${weatherDTO.weather[0].icon}.png`
    }
  }

  private addDetailsFromWeatherDTO(obj: object, detail: IDetailItem[], prefix = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null) {
        detail.push({
          label: prefix + key[0].toLocaleUpperCase() + key.slice(1).replace('_', ' '),
          value: value.toString(),
        });
      }
    })
  }
}
