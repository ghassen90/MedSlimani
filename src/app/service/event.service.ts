import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { EventModel } from '../components/model/event.model';
import {environment} from "../../environments/environment";
const base_url =environment.baseUrl;
const port = 3001;
@Injectable({
  providedIn: 'root'
})

export class EventService {
 
  private httpOptions: { headers: HttpHeaders };
  formEvent: any;
  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      })
    };
  }

// event.service.ts
addEvent1(even: EventModel, imageFile: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', imageFile);
  formData.append('titre', even.titre ?? '');
  formData.append('description', even.description ?? '');
  formData.append('id_maisonjeunes', even.id_maisonjeunes ?? '');
  formData.append('id_user', even.id_user ?? '');

  return this.httpClient.post(base_url + '/addEvent', formData);
}
getListEvents (): Observable<any>{
  return this.httpClient.get<any>(base_url+'/event/list',this.httpOptions);
}
// event.service.ts
addEvent(even: EventModel, imageFile: File): Observable<any> {
  const formData: FormData = new FormData();
  // Debugging lines
  formData.append('titre', even.titre ?? '');
  formData.append('description', even.description ?? '');
  formData.append('id_maisonjeunes', even.id_maisonjeunes ?? '');
 
  if (imageFile) {
    formData.append('imageFile', imageFile, imageFile.name);
    
  }

  return this.httpClient.post(base_url + '/addEvent', formData,this.httpOptions);
}
 
  statEvent(): Observable<any>{
    return this.httpClient.get<any>(base_url+'/statEvent');
  }

}
