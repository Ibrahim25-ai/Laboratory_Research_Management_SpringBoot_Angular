import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  url = environment.eventapiUrl;
  constructor(private httpClient: HttpClient) {}

  getEvents() {
    return this.httpClient.get(this.url + '/evenements');
  }
  add(data: any) {
    return this.httpClient.post(this.url + '/evenements/save', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  update(data: any, id: any) {
    return this.httpClient.put(this.url + '/evenements/update/' + id, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  delete(id: any) {
    return this.httpClient.delete(this.url + '/evenements/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
