import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const base_url= environment.baseUrl;
/*const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'mon-entete-personnalise':'maValeur'
  })
};*/
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
   httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json', Authorization: 'my-auth-token'})};

  constructor(private httpClient: HttpClient) {
  }

  login(login: any): Observable<any>{

    return this.httpClient.post<any>(base_url+'/login', login );
  }
}
