import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Graph } from '../class/graph';
import { Stats } from '../class/stats';
import { GraphService } from '../graph.service';
import { StatsService } from '../stats.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statsReturn : Stats = new Stats
  graphReturn : Graph[] = []
  average ?: number;

  
  
  constructor(private auth : AuthService,
              private stats : StatsService,
              ) { }



  ngOnInit(): void {
    
  }


  logOut() : void{
   this.auth.doLogout();
  }


}