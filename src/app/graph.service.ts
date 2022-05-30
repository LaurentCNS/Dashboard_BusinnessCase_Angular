import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Graph } from './class/graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  apiUrl: string = environment.api;

  constructor( private httpClient : HttpClient) { }
  

  
  getGraph() : Observable<Graph[]>{
    return this.httpClient.get<Graph[]>(this.apiUrl + `graph-1`)
  }


}


