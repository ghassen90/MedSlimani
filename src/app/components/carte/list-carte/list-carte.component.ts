import {Component, OnInit} from '@angular/core';
import {GroupeService} from "../../../service/groupe.service";
import {GroupUserModel} from "../../model/group.user.model";
import {CarteService} from "../../../service/carte.service";
import {CarteModel} from "../../model/carte.model.";
import {DemandeModel} from "../../model/demande.model";
import {AdminService} from "../../../service/admin.service";
import {UserModel} from "../../model/user.mode";

@Component({
  selector: 'app-list-carte',
  templateUrl: './list-carte.component.html',
  styleUrls: ['./list-carte.component.scss']
})
export class ListCarteComponent implements OnInit {

  listGroupUsers: GroupUserModel[] = [];
  listCartes: CarteModel[] = [];
  listeDemande: DemandeModel[] = [];

  constructor(private groupUserService: GroupeService,
              private userService: AdminService,
              private carteService: CarteService) {
  }

  ngOnInit(): void {
    this.groupUserService.listGroupeUser().subscribe((list: GroupUserModel[]) => {
      if (list) {
        this.listGroupUsers = [...list];
        list.forEach(groupUser => {
          this.listeDemande = [...this.listeDemande, {id_group: groupUser.id_groupe, id_group_user: groupUser.id_group_user, status: groupUser.status, time: "", type: "Demande rejoindre de group"}];
        });
      }
    });

    this.carteService.getListCartes().subscribe((list: CarteModel[]) => {
      if (list) {
        this.listCartes = [...list];
        list.forEach(carte => {
          this.listeDemande = [...this.listeDemande, {
            id_cart: carte.id_carte,
            id_user: carte.id_user,
            status: carte.etat, time: "", type: "Demande e carte "
          }];
        });
      }
    });
  }

  acceptDemande(demande: DemandeModel) {
    if (demande.id_cart) {
      this.carteService.acceptCarte(demande.id_cart).subscribe(carte=>{
        if(carte){
          location.reload();
        }
      });
    } else {
      this.groupUserService.acceptUserGroup(demande.id_group_user).subscribe(groupUser=>{
        if(groupUser){
          location.reload();
        }
      });
    }
  }
  getNomPrenoUsert(idUsre: any){
    let nomPrenom = "";
    this.userService.getUsersById(idUsre).subscribe((user: UserModel)=>{
      if (user){
        nomPrenom = (localStorage.getItem('nom') ? localStorage.getItem('nom') : '' ) +' '+ (localStorage.getItem('prenom') ? localStorage.getItem('prenom') : '' );
       // this.role = localStorage.getItem('roles') +"";
       // nomPrenom = user.nom +" " + user.prenom;
      }
    });
  }
}
