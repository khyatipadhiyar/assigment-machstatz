import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://gitlab.com/snippets/1872645/raw")
    .pipe(map(result => result));
  }

  dailyForecast1() {
    return this._http.get("https://gitlab.com/snippets/1872662/raw")
    .pipe(map(result => result));
  }
}
