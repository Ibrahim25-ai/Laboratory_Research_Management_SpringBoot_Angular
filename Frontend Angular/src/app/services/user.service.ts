import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  login(data: any) {
    return this.httpClient.post(this.url + '/membres/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  changePassword(data: any) {
    return this.httpClient.post(this.url + '/membres/changePassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
