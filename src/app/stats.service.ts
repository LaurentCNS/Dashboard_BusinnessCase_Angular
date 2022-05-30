import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stats } from './class/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  apiUrl: string = environment.api;

  constructor( private  httpClient : HttpClient) { }



  getStats() : Observable<Stats>{
    return this.httpClient.get<Stats>(this.apiUrl + `stats`)
  }

}

