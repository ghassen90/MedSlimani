import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { PointcadeauxModel } from '../components/model/pointcadeaux.model';
import {environment} from "../../environments/environment";
const base_url =environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PointCadeauxService {
  getPointCadeaux(id_pointCadeaux: any) {
    throw new Error('Method not implemented.');
  }
  httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json', Authorization: localStorage.getItem('accessToken') + ""})};


  constructor(private httpClient: HttpClient) { }

  getPointCadeauxById(id_pointCadeaux: any): Observable<any> {
    return this.httpClient.get<any>( base_url+'/pointCadeaux/' + id_pointCadeaux);
  }


  update(Pointcadeaux: PointcadeauxModel): Observable<any> {  
    return this.httpClient.post(base_url+'/updatePointCadeaux', Pointcadeaux);
  }  
}
