
import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../model/user.mode";
import { AdminService } from "../../../service/admin.service";
import { FormBuilder } from "@angular/forms";
import { MaisonModel } from "../../model/maison.model";
import { MaisonJeunesService } from "../../../service/maison-jeunes.service";

@Component({
  selector: 'app-list-maison-jeunes',
  templateUrl: './list-maison-jeunes.component.html',
  styleUrls: ['./list-maison-jeunes.component.scss']
})
export class ListMaisonJeunesComponent implements OnInit {

  listMaison: MaisonModel[] = [];
  listUsers: UserModel[] = [];
  formMaison: any;
  formUser: any;
  constructor(private userService: AdminService,
              private maisonService: MaisonJeunesService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formMaison = this.formBuilder.group({
      nom_maison_jeunes: "",
      tel_fixe: "",
      adresse: "",
      gouvernorat: "",
      delegation: "",
      id_user: "",  // Add id_user if needed
      imageMaison: null // This will hold the file object
    });


    this.formUser = this.formBuilder.group({
      id_user: ""
    });

    this.userService.getListeUsers().subscribe(users => {
      if (users) {
        this.listUsers = [...users];

      }
    });

    this.maisonService.getListMaisons().subscribe(maisons => {
      if (maisons) {
        this.listMaison = [...maisons];
      }
    });
  }
  refreshListMaison() {
    this.maisonService.getListMaisons().subscribe(maisons => {
      if (maisons) {
        this.listMaison = [...maisons];
      }
    });
  }
  /************************Ajouter maison********************* */
  // Method to handle image selection
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formMaison.patchValue({
        imageMaison: file
      });
      this.formMaison.get('imageMaison')?.updateValueAndValidity();
    }
  }
  submitMaisonJeune() {
    const maison: MaisonModel = this.formMaison.value;
    const imageFile: File = this.formMaison.get('imageMaison')?.value;

    this.maisonService.addMaisonWithImage(maison, imageFile).subscribe(value => {
      if (value) {
        this.refreshListMaison();
      }
    });
  }


  /***************************************** */
  getNomePrenom(idUser: any): any {
    let np = "";
    this.userService.getUsersById(idUser).subscribe((user: UserModel) => {
      if (user) {
        np = user.prenom + " " + user.nom;

      }
    });
    return np;
  }

  addMaisonJeune() {
    let maison: MaisonModel = this.formMaison.value;
    this.maisonService.addMaisons(maison).subscribe(value => {
      if (value) {
        this.refreshListMaison();
      }
    });
  }
  selMaison: MaisonModel = {};
  selectMaison(maison: MaisonModel) {
    this.selMaison = maison;
  }
  attrbUser() {
    const idUser = this.formUser.value.id_user;
    const idMaison = this.selMaison.id_maisonjeunes;
    console.log(idMaison + "***" + idUser);
    this.maisonService.addMaisonsToUser(idUser, idMaison).subscribe(value => {
      if (value) {
        this.refreshListMaison();
      }
    });
  }


}
