import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Cour } from '../modeles/cour';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private baseUrl = 'http://localhost:8080';     

  constructor(private http: HttpClient) { }            

  getAllCours(): Observable<Cour[]> {       
    return this.http.get<Cour[]>(`${environment.baseurl}/cours/all`);
  }

  addCour(cour:Cour): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-cour`, cour); 

  }

  updateCour(cour: Cour, id: number): Observable<Cour> {
    return this.http.put<Cour>(`${this.baseUrl}/update-cour/${id}`, cour);
  }

  deleteCour(id: number): Observable<Cour> {
    return this.http.delete<Cour>(`${this.baseUrl}/deleteCour/${id}`, { responseType: 'text' as 'json' });
  }

  getCourById(id: number): Observable<Cour> {
    return this.http.get<Cour>(`${this.baseUrl}/cours/${id}`);
  }
}
