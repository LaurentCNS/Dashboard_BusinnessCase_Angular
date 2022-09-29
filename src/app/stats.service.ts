import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AllStats,} from './class/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  apiUrl: string = environment.api;

  constructor( private  httpClient : HttpClient) { }



  getMontantTotalVentes(dateStart?:Date, dateEnd?:Date) : Observable<number>{
    if(dateStart && dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString()+`&dateEnd=`+dateEnd?.toString());
    }else if(dateStart){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString());
    }else if(dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=`+`&dateEnd=`+dateEnd?.toString());
    }else{
      return this.httpClient.get<number>(this.apiUrl + `panier/MontantTotalVentes`);
    }
  }

  getNbCommande(dateStart?:Date, dateEnd?:Date) : Observable<number>{
    if(dateStart && dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString()+`&dateEnd=`+dateEnd?.toString());
    }else if(dateStart){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString());
    }else if(dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=`+`&dateEnd=`+dateEnd?.toString());
    }else{
      return this.httpClient.get<number>(this.apiUrl + `panier/nbCommandes`);
    }
  }

  getNbPanier(dateStart?:Date, dateEnd?:Date) : Observable<number>{
    if(dateStart && dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString()+`&dateEnd=`+dateEnd?.toString());
    }else if(dateStart){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString());
    }else if(dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=`+`&dateEnd=`+dateEnd?.toString());
    }else{
      return this.httpClient.get<number>(this.apiUrl + `panier/nbPaniers`);
    }
  }

  getPrixPanierMoyen(dateStart?:Date, dateEnd?:Date) : Observable<number>{
    if(dateStart && dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString()+`&dateEnd=`+dateEnd?.toString());
    }else if(dateStart){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=` +
      dateStart?.toString());
    }else if(dateEnd){
      return this.httpClient.get<number>(this.apiUrl + `stats?dateStart=`+`&dateEnd=`+dateEnd?.toString());
    }else{
      return this.httpClient.get<number>(this.apiUrl + `panier/valeurPanierMoyen`);
    }
  }

}

