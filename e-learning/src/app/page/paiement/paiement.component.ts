// paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { Paiement } from '../../Modeles/paiement';
import { PaiementService } from '../../services/paiement.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-paiement',
  standalone: true,
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']


})
export class PaiementComponent implements OnInit {
  paiementDetails: Paiement | undefined;
  code: string = '';
  montant: number | undefined;
  nombreDeTranches: number | undefined;
  montantTotal: number | undefined;
  message: string | undefined;

  constructor(private paiementService: PaiementService,
    private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loadPaiementDetails();
  }

  loadPaiementDetails(): void {
    this.paiementService.getPaiementDetails().subscribe(
      (data) => {
        this.paiementDetails = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du paiement:', error);
      }
    );
  }

  payer(): void {
    if (this.code && this.montant) {
      this.paiementService.payer(this.code, this.montant).subscribe(
        (message) => {
          this.message = message;
          this.loadPaiementDetails(); // Recharger les détails après le paiement
        },
        (error) => {
          console.error('Erreur lors du paiement:', error);
        }
      );
    }
  }

  setNombreTranche(): void {
    if (this.nombreDeTranches !== undefined) {
      this.paiementService.setNombreTranche(this.nombreDeTranches).subscribe(() => {
        this.loadPaiementDetails();
      });
    }
  }

  setMontantTotale(): void {
    if (this.montantTotal !== undefined) {
      this.paiementService.setMontantTotale(this.montantTotal).subscribe((message) => {
        this.message = message;
        this.loadPaiementDetails();
      });
    }
  }
}
