import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(@Inject(HttpClient) public http: HttpClient) { }
  url: any = "https://localhost:7135/api/";

  getContactData(): Observable<any> {
    return this.http.get<any>(this.url + `api/Contacts/GetContacts`)
  }
  addUpdateContact(data: any): Observable<any> {
    return this.http.post<any>(this.url + `api/Contacts/AddUpdateContact`, data)
  }
  deleteContact(id: any): Observable<any> {
    return this.http.delete<any>(this.url + `api/Contacts/DeleteContact?id=` + id);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + `api/Account/Login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.url + `api/Account/Register`, data);
  }

}
