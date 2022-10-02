import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Graph} from '../class/graph';
import {AllStats, Produits} from '../class/stats';
import {StatsService} from '../stats.service';
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
  isLoaded: boolean = false;
  conversionCommandeChart: number = 0;
  conversionPanierChart: number = 0;
  retourProduitsVendus: Produits[] = [];


  // Charts
  ChartsData1 = [{'name': 'paniers convertis', 'value': 0}
    , {'name': 'abandonnés', 'value': 0}];
  ChartsData2 = [{'name': 'panier/visiteur', 'value': 0}
    , {'name': 'sans panier', 'value': 0}];
  ChartsData3 = [{'name': 'produit 1', 'value': 0}
    , {'name': 'produit 2', 'value': 0}
    , {'name': 'produit 3', 'value': 0}
    , {'name': 'produit 4', 'value': 0}
    , {'name': 'produit 5', 'value': 0}];


  constructor(private auth: AuthService,
              private stats: StatsService,
  ) {
  }

  ngOnInit(): void {
    forkJoin([
      this.stats.getMontantTotalVentes(),
      this.stats.getNbCommande(),
      this.stats.getNbPanier(),
      this.stats.getPrixPanierMoyen(),
      this.stats.getConversionCommande(),
      this.stats.getConversionPanier(),
      this.stats.getTotalProduitsVendus()
    ]).subscribe(([montantTotalVentes, nbCommande, nbPanier, prixPanierMoyen, conversionCommande, conversionPanier, produitsVendus]) => {
      this.allStats.nbTotalVentes = montantTotalVentes;
      this.allStats.nbCommande = nbCommande;
      this.allStats.nbPanier = nbPanier;
      this.allStats.prixPanierMoyen = prixPanierMoyen;
      this.conversionCommandeChart = conversionCommande;
      this.conversionPanierChart = conversionPanier;
      this.retourProduitsVendus = produitsVendus;
      this.isLoaded = true;

      // Conversion des commandes
      this.ChartsData1[0].value =
        // Si la conversion est supérieure à 100, on affiche 100
        this.conversionCommandeChart > 100 ? 100 : this.conversionCommandeChart;
      this.ChartsData1[1].value = 100 - this.ChartsData1[0].value;

      // Conversion des paniers
      this.ChartsData2[0].value =
        // Si la valeur est supérieure à 100, on la met à 100
        this.conversionPanierChart > 100 ? 100 : this.conversionPanierChart;
      this.ChartsData2[1].value = 100 - this.ChartsData2[0].value;

      // Boucle pour afficher les produits les plus vendus avec libelle et quantité
      for (let i = 0; i < this.retourProduitsVendus.length; i++) {
        this.ChartsData3[i].name = this.retourProduitsVendus[i].libelle;
        this.ChartsData3[i].value = this.retourProduitsVendus[i].quantite;
      }
    });
  }

  refreshData() {
    forkJoin([
      this.stats.getMontantTotalVentes(this.dateStart, this.dateEnd),
      this.stats.getNbCommande(this.dateStart, this.dateEnd),
      this.stats.getNbPanier(this.dateStart, this.dateEnd),
      this.stats.getPrixPanierMoyen(this.dateStart, this.dateEnd),
      this.stats.getConversionCommande(this.dateStart, this.dateEnd),
      this.stats.getConversionPanier(this.dateStart, this.dateEnd),
      this.stats.getTotalProduitsVendus(this.dateStart, this.dateEnd)

    ]).subscribe(([montantTotalVentes, nbCommande, nbPanier, prixPanierMoyen, conversionCommande, conversionPanier, produitsVendus]) => {
      this.allStats.nbTotalVentes = montantTotalVentes;
      this.allStats.nbCommande = nbCommande;
      this.allStats.nbPanier = nbPanier;
      this.allStats.prixPanierMoyen = prixPanierMoyen;
      this.conversionCommandeChart = conversionCommande;
      this.conversionPanierChart = conversionPanier;
      this.retourProduitsVendus = produitsVendus;
      this.isLoaded = true;

      // Conversion des commandes
      this.ChartsData1[0].value =
        // Si la conversion est supérieure à 100, on affiche 100
        this.conversionCommandeChart > 100 ? 100 : this.conversionCommandeChart;
      this.ChartsData1[1].value = 100 - this.ChartsData1[0].value;

      // Conversion des paniers
      this.ChartsData2[0].value =
        // Si la valeur est supérieure à 100, on la met à 100
        this.conversionPanierChart > 100 ? 100 : this.conversionPanierChart;
      this.ChartsData2[1].value = 100 - this.ChartsData2[0].value;

      // Boucle pour afficher les produits les plus vendus avec libelle et quantité
      for (let i = 0; i < this.retourProduitsVendus.length; i++) {
        this.ChartsData3[i].name = this.retourProduitsVendus[i].libelle;
        this.ChartsData3[i].value = this.retourProduitsVendus[i].quantite;
      }
    });
  }

  print() {
    window.print();
  }

  logOut(): void {
    this.auth.doLogout();
  }
}
