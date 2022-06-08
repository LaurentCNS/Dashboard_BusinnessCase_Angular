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



  getStats(dateStart?:Date, dateEnd?:Date) : Observable<Stats>{
    if(dateStart && dateEnd){
      return this.httpClient.get<Stats>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString()+`&dateEnd=`+dateEnd?.toString());
    }else if(dateStart){
      return this.httpClient.get<Stats>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString());
    }else if(dateEnd){
      return this.httpClient.get<Stats>(this.apiUrl + `stats?dateStart=`+`&dateEnd=`+dateEnd?.toString());
    }else{
      return this.httpClient.get<Stats>(this.apiUrl + `stats`);
    }
    
  }

}

