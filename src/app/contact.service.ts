import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact/contact';
import { ContactPage } from './contact/pageContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl: string = environment.apiUrl + '/api/contact'

  constructor(
    private httpClient: HttpClient
  ) { }

  save(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.apiUrl, contact);
  }

  getAll(page: number, size: number): Observable<ContactPage> {
    const params = new HttpParams()
                      .append('page', page)
                      .append('size', size)
    return this.httpClient.get<ContactPage>(`${this.apiUrl}?${params.toString()}`)
  }

  getById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${this.apiUrl}/${id}`)
  }

  favorite(contact: Contact): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/${contact.id}/favorite`, null)
  }

  deleteById(contact: Contact): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${contact.id}`)
  }

  uploadPhoto(contact: Contact, photo: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${contact.id}/photo`, photo, { responseType: 'blob' as 'json'})
  }
}
