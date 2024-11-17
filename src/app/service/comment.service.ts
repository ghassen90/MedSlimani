import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentModel} from "../components/model/comment.model";
import {UserModel} from "../components/model/user.mode";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json', Authorization: 'my-auth-token'})};


  constructor(private httpClient: HttpClient) { }

  addCmment(comment: CommentModel): Observable<any> {
    return this.httpClient.post<any>( 'http://localhost:8081/api/addComment', comment);
  }

}
