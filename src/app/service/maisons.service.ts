import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupUserModel} from "../components/model/group.user.model";
import {environment} from "../../environments/environment";

const base_url= environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MaisonService {

 
  private httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      })
    };
  }

 /*****************************************************************/
  getEventsByMaisonId(id: string): Observable<any[]> {
    return this.httpClient.get<any>(base_url+'/event/list/'+id, this.httpOptions);
  }
  addComment(commentData: any): Observable<any> { 
    return this.httpClient.post<any>(base_url+`/add-comment`,commentData, this.httpOptions);
  }
  
  addLike(eventId: number ): Observable<any> { 
    return this.httpClient.post<any>(base_url+`/add-like/${eventId}`, this.httpOptions);
  }
 /*****************************************************************/
  AllMaisons(): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listMaisonUser', this.httpOptions);
  }
  getMaisonById(idMaison: string): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listMaisonUser/'+idMaison, this.httpOptions);
  }
  getMaisonidId(idMaison: string): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listMaisonUser/'+idMaison, this.httpOptions);
  }
  acceptUserGroup(id_group_user: string): Observable<any> {
    return this.httpClient.get<any>(  base_url+'/acceptUserGroup/' + id_group_user);
  } 
  rejoindreGroupe(groupUser: GroupUserModel): Observable<any> {
    return this.httpClient.post(base_url+'/rejoindres', groupUser);
  }
 
 
}
