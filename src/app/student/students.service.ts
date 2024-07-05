import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiUrl = 'https://english-academy-spring-boot-function.azurewebsites.net/api';

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl + '/registrations', data, {headers, responseType: 'text'});
  }

  getAllStudents(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl + '/students', {headers});
  }

  //TODO wtf int ?
  deleteStudent(id: number): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(`${this.apiUrl}/students/${id}`, {headers});
  }

  getStudentDetail(id: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiUrl}/students/${id}`, {headers});
  }

  addClassRoomToStudent(studentId: string, classRoomId: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`${this.apiUrl}/student/${studentId}/addClass/${classRoomId}`, {headers});
  }

  getAllClassRooms(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl + '/classRooms', {headers});
  }

}
