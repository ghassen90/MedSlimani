import { Component, OnInit } from '@angular/core';
import { GroupeService } from "../../../service/groupe.service";
import { FormBuilder, Validators } from "@angular/forms";
import { GroupeModel } from '../../model/groupe.model';
import { GroupUserModel } from "../../model/group.user.model";
import { MaisonModel } from "../../model/maison.model";
import { MaisonJeunesService } from "../../../service/maison-jeunes.service";

@Component({
  selector: 'app-list-groupe',
  templateUrl: './list-groupe.component.html',
  styleUrls: ['./list-groupe.component.scss']
})
export class ListGroupeComponent implements OnInit {



  constructor(private groupeService: GroupeService,
    private maisonJeunesService: MaisonJeunesService,
    private formBuilder: FormBuilder) { }
  listGroupes: GroupeModel[] = [];
  formGroupe: any;
  updateGroup: any;
  role = "";
  maison: MaisonModel = {};
  listGroupUser: GroupUserModel[] = [];
  userId: string = localStorage.getItem('idUser') || '';

  ngOnInit(): void {
    this.formGroupe = this.formBuilder.group({
      nom_groupe: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    /*this.groupeService.getListeGroupe().subscribe((group: GroupeModel[])=>{
      if(group?.length){
        this.listGroupes = [...group];
      }
    });*/

    this.role = localStorage.getItem('roles') + "";
    this.formGroupe = this.formBuilder.group({
      nom_groupe: '',
      description: '',
      category: ''
    });
    if (this.role == "ROLE_ADMIN") {
      if (localStorage.getItem('idUser')) {
        this.groupeService.listGroupeAdminbyId().subscribe((group: GroupeModel[]) => {
          this.listGroupes = [...group];

        });
      }
    }
    else {
      this.groupeService.Allgroupe().subscribe((group: GroupeModel[]) => {
        this.listGroupes = [...group];
      });
    }

  }

  addGroupe() {
    if (localStorage.getItem('roles') && localStorage.getItem('idUser')) {
      this.groupeService.listGroupeAdminbyId().subscribe(
        (groupeModel: GroupeModel) => {
          if (groupeModel) {
            const group: GroupeModel = {
              ...this.formGroupe.value,
              //   id_maisonjeunes: this.maisonJeune?.id_maisonjeunes, // Make sure maisonJeune is properly defined
              //  userId: localStorage.getItem('idUser') || '', // Default to an empty string if null
              ///   status: '1'
            };

            const requestData = { group };

            this.groupeService.saveGroupe(requestData).subscribe(
              (response: any) => {
                if (response) {
                  // Update the list of groups on successful save
                  this.groupeService.listGroupeAdminbyId().subscribe(
                    (group: GroupeModel[]
                      
                    ) => {
                    this.listGroupes = [...group];

                  });
                }
              },
              (error: any) => {
                console.error('Failed to save group:', error);
              }
            );
          }
        },
        (error: any) => {
          console.error('Error fetching group admin by ID:', error);
        }
      );
    }
  }

  addGroupe1() {
    if (localStorage.getItem('roles') && localStorage.getItem('idUser')) {
      this.maisonJeunesService.getMaisonJeunesByIdUser(localStorage.getItem('idUser') + "")
        .subscribe((maisonJeune: MaisonModel) => {
          if (maisonJeune) {
            const group: GroupeModel = {
              ...this.formGroupe.value,
              id_maisonjeunes: maisonJeune.id_maisonjeunes,
              userId: localStorage.getItem('idUser'),
              status: '1'
            };

            const requestData = {
              group

            };

            this.groupeService.saveGroupe(requestData).subscribe((response: any) => {
              if (response) {
                this.groupeService.getListeGroupe().subscribe((groups: GroupeModel[]) => {
                  this.listGroupes = [...groups];
                });
              }
            });
          }
        });
    }
  }


  deleteGroupe(id: number) {
    this.groupeService.delete(id + "").subscribe(value => {
      if (value) {
        this.groupeService.getListeGroupe().subscribe((groups: GroupeModel[]) => {
          this.listGroupes = [...groups];
        });
      }
    });
  }

  regoindreGroup(groupe: GroupeModel) {
    if (localStorage.getItem('idUser')) {
      let groupUser: GroupUserModel = {};

      groupUser.id_user = localStorage.getItem('idUser') + "";
      groupUser.id_groupe = groupe.id_groupe;
      groupUser.status = "encours";
      this.groupeService.rejoindreGroupe(groupUser).subscribe((groupUser: GroupUserModel) => {
        if (groupUser) {

          if (localStorage.getItem('idUser')) {
            this.groupeService.listGroupeUserbyId().subscribe((group: GroupeModel[]) => {
              this.listGroupes = [...group];

            });
          }
        }
      });
    }
  }

  updateGroupe(group: any) {
    this.updateGroup = group;

  }

  upgroup() {
    let group = {
      id_groupe: this.updateGroup.id_groupe,
      nom_groupe: this.formGroupe.value.nom_groupe,
      description: this.formGroupe.value.description,
      category: this.formGroupe.value.category
    }
    this.groupeService.update(group as GroupeModel).subscribe((value: any) => {
      if (value) {
        this.groupeService.getListeGroupe().subscribe((value: GroupeModel[]) => {
          this.listGroupes = [...value];
        });
      }
    });
  }

}
