import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Classe } from '../modeles/classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private baseUrl = 'http://localhost:8080';     

  constructor(private http: HttpClient) { }            

  getAllClasse(): Observable<Classe[]> {       
    return this.http.get<Classe[]>(`${environment.baseurl}/classe/all`);
  }

  addClasse(Classe:Classe): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-classe`, Classe); 

  }

  updateClasse(Classe:Classe, id: number): Observable<Classe> {
    return this.http.put<Classe>(`${this.baseUrl}/update-classe/${id}`, Classe);
  }

  deleteClasse(id: number): Observable<Classe> {
    return this.http.delete<Classe>(`${this.baseUrl}/deleteClasse/${id}`, { responseType: 'text' as 'json' });
  }

 
}

