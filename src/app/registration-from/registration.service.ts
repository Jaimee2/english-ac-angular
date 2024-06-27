import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'https://english-academy-spring-boot-function.azurewebsites.net/api/registrations';

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl, data, {headers, responseType: 'text'});
  }


}
