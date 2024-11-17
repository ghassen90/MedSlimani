import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { MaisonModel } from "../components/model/maison.model";
import { environment } from "../../environments/environment";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MaisonJeunesService {
  private httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      })
    };
  }

  getMaisonJeunesByIdUser(id: string): Observable<any> {
    return this.httpClient.get<any>(`${base_url}/getMaisonJeunesByIdUser/${id}`, this.httpOptions);
  }
  getMaisonJeunesByIdUser1(): Observable<any> {
    return this.httpClient.get<any>(`${base_url}/getMaisonJeunesByIdUser`, this.httpOptions);
  }

  statMaison(): Observable<any> {
    return this.httpClient.get<any>(`${base_url}/statMaison`);
  }

  getListMaisons(): Observable<any> {
    return this.httpClient.get<any>(`${base_url}/listMaisonJeunes`, this.httpOptions);
  }

  addMaisons_(maison: MaisonModel): Observable<any> {
    return this.httpClient.post(`${base_url}/addMaisonJeunes`, maison);
  }

  getGouvernerat(): Observable<any> {
    return this.httpClient.get<any>(`${base_url}/getGouvernerat`, this.httpOptions);
  }

  getDelegation(idWilaya: string): Observable<any> {
    return this.httpClient.get<any>(`${base_url}/getDelgation/${idWilaya}`);
  }

  // Helper method to append MaisonModel data to FormData
  private createMaisonFormData(maison: MaisonModel): FormData {
    const formData = new FormData();
    formData.append('nom_maisonJeunes', maison.nom_maison_jeunes);
    formData.append('tel_fixe', maison.tel_fixe);
    formData.append('adresse', maison.adresse);
    formData.append('gouvernorat', maison.gouvernorat);
    formData.append('delegation', maison.delegation);
    formData.append('id_user', maison.id_user);
    return formData;
  }

  addMaisons(maison: MaisonModel): Observable<any> {
    const formData = this.createMaisonFormData(maison);
    return this.httpClient.post(`${base_url}/addMaisonJeunes`, formData, this.httpOptions);
  }

  addMaisonsToUser(idUser: BigInteger, idMaison: BigInteger): Observable<any> {
    const url = `${base_url}/addMaisonsToUser`; // Adjust URL endpoint as necessary
    const body = { idUser, idMaison };
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  addMaisonWithImage(maison: MaisonModel, imageFile: File): Observable<any> {
    const formData = this.createMaisonFormData(maison);

    // Append the image file if it exists
    if (imageFile) {
      formData.append('imageMaison', imageFile, imageFile.name);
    }

    return this.httpClient.post(`${base_url}/addMaisonJeunes`, formData, this.httpOptions);
  }
}
