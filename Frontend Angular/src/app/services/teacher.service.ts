import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getTeachers() {
    return this.httpClient.get(this.url + '/membres/teachers');
  }
  add(data: any) {
    return this.httpClient.post(this.url + '/membres/enseignant', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  update(data: any, id: any) {
    return this.httpClient.put(this.url + '/membres/enseignant/' + id, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  delete(id: any) {
    return this.httpClient.delete(this.url + '/membres/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  affecterauteurTopublication(id_aut: any, id_pub: any) {
    return this.httpClient.post(
      this.url +
        '/membres/affecterauteurTopublication/' +
        id_aut +
        '/' +
        id_pub,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  desaffecterauteurTopublication(id_aut: any, id_pub: any) {
    return this.httpClient.delete(
      this.url + '/publications/desaffecter/' + id_aut + '/' + id_pub,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
}
