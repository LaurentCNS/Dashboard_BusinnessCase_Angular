import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Graph} from '../class/graph';
import {AllStats} from '../class/stats';
import {GraphService} from '../graph.service';
import {StatsService} from '../stats.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserModule} from '@angular/platform-browser';
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  dateStart ?: Date;
  dateEnd ?: Date;
  allStats: AllStats = new AllStats;
  graphReturn: Graph[] = []
  isLoaded : boolean = false;


  constructor(private auth: AuthService,
              private stats: StatsService,
  ) {
  }


  ngOnInit(): void {
    forkJoin([
      this.stats.getMontantTotalVentes(),
      this.stats.getNbCommande(),
      this.stats.getNbPanier(),
      this.stats.getPrixPanierMoyen()]).subscribe(([montantTotalVentes, nbCommande, nbPanier, prixPanierMoyen]) => {
      this.allStats.nbTotalVentes = montantTotalVentes;
      this.allStats.nbCommande = nbCommande;
      this.allStats.nbPanier = nbPanier;
      this.allStats.prixPanierMoyen = prixPanierMoyen;
      this.isLoaded = true;
    });

  }

  refreshData() {
    forkJoin([
      this.stats.getMontantTotalVentes(this.dateStart, this.dateEnd),
      this.stats.getNbCommande(this.dateStart, this.dateEnd),
      this.stats.getNbPanier(this.dateStart, this.dateEnd),
      this.stats.getPrixPanierMoyen(this.dateStart, this.dateEnd)]).subscribe(([montantTotalVentes, nbCommande, nbPanier, prixPanierMoyen]) => {
      this.allStats.nbTotalVentes = montantTotalVentes;
      this.allStats.nbCommande = nbCommande;
      this.allStats.nbPanier = nbPanier;
      this.allStats.prixPanierMoyen = prixPanierMoyen;
      this.isLoaded = true;
    });
  }

  print() {
    window.print();
  }

  logOut(): void {
    this.auth.doLogout();
  }
}
