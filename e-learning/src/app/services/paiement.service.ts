// paiement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../Modeles/paiement';


@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private baseUrl= 'http://localhost:8080/paiements'; 

  constructor(private http: HttpClient) {}

  payer(code: string, montant: number): Observable<string> {
    const params = { code, montant: montant.toString() };
    return this.http.post(`${this.baseUrl}/payer`, {},
       { params, responseType: 'text' });
  }

  setNombreTranche(nombre: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/set-nombre-tranche`, {},
       { params: { nombre: nombre.toString() } });
  }

  getPaiementDetails(): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.baseUrl}/details`);
  }

  setMontantTotale(montant: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/set-montant-totale`, {},
       { params: { montant: montant.toString() }, responseType: 'text' });
  }
}

