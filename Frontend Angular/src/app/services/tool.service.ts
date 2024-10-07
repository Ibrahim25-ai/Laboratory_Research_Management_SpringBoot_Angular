import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  url = environment.toolapiUrl;
  constructor(private httpClient: HttpClient) {}

  getTools() {
    return this.httpClient.get(this.url + '/outils');
  }
  add(data: any) {
    return this.httpClient.post(this.url + '/outils/save', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  update(data: any, id: any) {
    return this.httpClient.put(this.url + '/outils/update/' + id, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  delete(id: any) {
    return this.httpClient.delete(this.url + '/outils/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
