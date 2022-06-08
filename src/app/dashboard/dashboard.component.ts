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


  dateStart ?: Date;
  dateEnd ?: Date;
  statsReturn : Stats = new Stats
  graphReturn : Graph[] = []
  average ?: number;

  
  
  constructor(private auth : AuthService,
              private stats : StatsService,
              ) { }



  ngOnInit(): void {
    this.stats.getStats().subscribe(data => {
      this.statsReturn = data;    
      this.average = data.montantVenteTotal/data.nbCommand  
    });
  }

  refreshData(){
    this.stats.getStats(this.dateStart, this.dateEnd).subscribe(data => {
      this.statsReturn = data;
      this.average = data.montantVenteTotal/data.nbCommand;
      if(!this.average){
        this.average = 0;
      }
      console.log(this.average);
  }); }
  

  print() {
    window.print();
  }

  logOut() : void{
    this.auth.doLogout();
   }
}
