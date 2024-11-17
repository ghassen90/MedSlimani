import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserModel } from '../components/model/user.mode';
import {environment} from "../../environments/environment";
//  const base_url ='https://173.212.235.56:';

const base_url =environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AdminService {
   //httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json', Authorization: localStorage.getItem('accessToken') + ""})};

   private httpOptions: { headers: HttpHeaders };

   constructor(private httpClient: HttpClient) {
     const accessToken = localStorage.getItem('accessToken');
     this.httpOptions = {
       headers: new HttpHeaders({
         'Authorization': `Bearer ${accessToken}`
       })
     };
   }

  getListeAdministrateur(): Observable<any> {
    return this.httpClient.get<any>( base_url+'/listeAdministrateur');
  }

  statUser(): Observable<any> {
    return this.httpClient.get<any>( base_url+'/api/statUser');
  }

  getListeUsers(): Observable<any> {
    return this.httpClient.get<any>( base_url+'/listeUsers',this.httpOptions);
  }

  getUsersById(idUser: string): Observable<any> {
    return this.httpClient.get<any>( base_url+'/getUSerByid/' + idUser);
  }

  saveAdmin(user: UserModel): Observable<any> {
    user.id_pointCadeaux = 4;
    return this.httpClient.post<any>( base_url+'/signup_admin', user,this.httpOptions);
  }

  updateUser(user: UserModel): Observable<any> {
    user.id_pointCadeaux = 4;
    return this.httpClient.post<any>( base_url+'/api/update', user);
  }


}
