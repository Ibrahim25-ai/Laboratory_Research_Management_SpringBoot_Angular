import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getStudents() {
    return this.httpClient.get(this.url + '/membres/etudiants');
  }
  add(data: any) {
    return this.httpClient.post(this.url + '/membres/etudiant', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  update(data: any, id: any) {
    return this.httpClient.put(this.url + '/membres/etudiant/' + id, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  delete(id: any) {
    return this.httpClient.delete(this.url + '/membres/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  affecterEncadrant(id_etd: any, id_ens: any) {
    return this.httpClient.put(
      this.url + '/membres/affecterEtudiantEnseignant/' + id_etd + '/' + id_ens,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  getDetails() {
    return this.httpClient.get(this.url + '/membres/details');
  }
}
