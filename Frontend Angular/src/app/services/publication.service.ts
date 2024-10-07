import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  url = environment.apiUrl;
  puburl = environment.pubapiUrl;
  constructor(private httpClient: HttpClient) {}

  getPublications() {
    return this.httpClient.get(this.url + '/fullpubs');
  }
  add(data: any) {
    return this.httpClient.post(this.puburl + '/publications/save', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  update(data: any, id: any) {
    return this.httpClient.put(
      this.puburl + '/publications/update/' + id,
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  delete(id: any) {
    return this.httpClient.delete(this.puburl + '/publications/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  deletemempub(id: any) {
    return this.httpClient.delete(this.url + '/publications/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
