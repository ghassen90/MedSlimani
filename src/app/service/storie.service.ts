import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { StorieModel } from '../components/model/storie.model';
@Injectable({
  providedIn: 'root'
})
export class StorieService {
  httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json', Authorization: localStorage.getItem('accessToken') + ""})};

  constructor(private httpClient: HttpClient) {
  }
  saveStory(file:File): Observable<any> {
    const formData:FormData = new FormData();
    formData.append('file',file);
   


  
    return this.httpClient.post<any>( 'http://localhost:8081/api/add', formData);
  }

}
