import { Component, OnInit } from '@angular/core';
import {MaisonJeunesService} from "../../../service/maison-jeunes.service";
import {LoginService} from "../../../service/login.service";
import {StorieService} from "../../../service/storie.service";
import {AdminService} from "../../../service/admin.service";
import {EventService} from "../../../service/event.service";
import {CommentService} from "../../../service/comment.service";
import {FormBuilder} from "@angular/forms";
import {UserModel} from "../../model/user.mode";
import {MaisonModel} from "../../model/maison.model";
import {CarteModel} from "../../model/carte.model.";
import {CarteService} from "../../../service/carte.service";

@Component({
  selector: 'app-download-carte',
  templateUrl: './download-carte.component.html',
  styleUrls: ['./download-carte.component.scss']
})
export class DownloadCarteComponent implements OnInit {

  currentUser: UserModel = {};
  currentMaison: MaisonModel = {};
  carteJeune: CarteModel = {};
  constructor( private userService: AdminService,
               private carteService: CarteService,
               private maisonJeunesService: MaisonJeunesService) { }

  ngOnInit(): void {
    if(localStorage.getItem('idUser')){
      this.carteService.getCarteByIdUser(localStorage.getItem('idUser') + "").subscribe((carte: CarteModel) =>{
        if (carte){
          this.carteJeune = {...carte}
        }
      });
    }
  }

  demandeCarte(){
    this.userService.getUsersById(localStorage.getItem('idUser')+"").subscribe((user: UserModel) =>{
      if(user){
        this.currentUser = {...user};
        this.maisonJeunesService.getMaisonJeunesByIdUser(user.id_user).subscribe(
          (maison: MaisonModel) =>{

            this.currentMaison = maison;
            this.carteJeune.id_user = user.id_user;
            this.carteJeune.etat = "encours";
            this.carteJeune.date_naissance = "02/02/2022";
            this.carteJeune.id_maisonjeunes = maison.id_maisonjeunes;

            this.carteService.demandeCarte(this.carteJeune).subscribe((carte: CarteModel) =>{
              if (carte){
                this.carteJeune = {...carte}
              }
            });
          });
      }

      });
  }

}
