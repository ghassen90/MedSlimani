import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarteModel} from "../components/model/carte.model.";
import {environment} from "../../environments/environment";
import {MaisonModel} from "../components/model/maison.model";
const base_url= environment.baseUrl;
@Injectable({
  providedIn: 'root'
})


export class CarteService {
  httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json', Authorization: 'my-auth-token'})};


  constructor(private httpClient: HttpClient) { }

  demandeCarte(carte: CarteModel): Observable<any> {
    return this.httpClient.post( base_url+'addCarte', carte);
  }

  getCarteByIdUser(idUser: string): Observable<any> {
    return this.httpClient.get<any>(  base_url+'/getCarteByIdUser/' + idUser);
  }

  getListeCart(idUser: string): Observable<any> {
    return this.httpClient.get<any>( base_url+'/listeCartes');
  }


  getListCartes(): Observable<any> {
    return this.httpClient.get<any>( base_url+'/listeCartes');
  }

  acceptCarte(idCarte: string): Observable<any> {
    return this.httpClient.get<any>(  base_url+'/acceptCarte/' + idCarte);
  }
  addMaisonWithImage(cart: CarteModel, imageFile: File): Observable<any> {
    const formData = new FormData();
    // Append the form data
    formData.append('nom', cart.nom);
    formData.append('prenom', cart.prenom);
    formData.append('date_naissance', cart.date_naissance); // Ensure the field name matches
    formData.append('matricule', cart.matricule);
    // Append the image file
    if (imageFile) {
      formData.append('imageCart', imageFile, imageFile.name);
    }
    return this.httpClient.post(base_url + '/addCarte', formData);
  }


}
