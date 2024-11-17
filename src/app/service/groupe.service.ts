import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { GroupeModel } from '../components/model/groupe.model';
import {GroupUserModel} from "../components/model/group.user.model";
import {environment} from "../../environments/environment";

const base_url= environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

 
  private httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      })
    };
  }

  statGroup(): Observable<any> {
    return this.httpClient.get<any>(  base_url+'/statGroup');
  }

  getListeGroupe(): Observable<any> {
    return this.httpClient.get<any>(  base_url+'/listGroupes', this.httpOptions);
  }
  listGroupeUserbyId(): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listGroupeUserbyId', this.httpOptions);
  }
  listGroupeAdminbyId(): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listGroupeAdminbyId', this.httpOptions);
  }
  Allgroupe(): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listGroupeUser', this.httpOptions);
  }
  acceptUserGroup(id_group_user: string): Observable<any> {
    return this.httpClient.get<any>(  base_url+'/acceptUserGroup/' + id_group_user);
  }

saveGroupe(requestData: { group: GroupeModel }): Observable<any> {
  return this.httpClient.post<any>(base_url + '/addGroupe', requestData, this.httpOptions);
}

  delete(id_groupe: string): Observable<any> {
    return this.httpClient.delete( base_url+'/deleteGroupe/'+ id_groupe);
  }

  update(groupe: GroupeModel): Observable<any> {
    return this.httpClient.put(base_url+'/updateGroupe', groupe);
  }

  rejoindreGroupe(groupUser: GroupUserModel): Observable<any> {
    return this.httpClient.post(base_url+'/rejoindre', groupUser);
  }
  listGroupeUser(): Observable<any> {
    return this.httpClient.get<any>(base_url+'/listGroupUser', this.httpOptions);
  }
 
}
