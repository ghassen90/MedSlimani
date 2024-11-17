import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaisonService } from 'src/app/service/maisons.service';
import { MaisonJeunesService } from 'src/app/service/maison-jeunes.service';
import { GroupeModel } from '../model/groupe.model';
import { MaisonModel } from '../model/maison.model';
import { GroupUserModel } from '../model/group.user.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaisonsModel } from '../model/maisons.model';

@Component({
  selector: 'app-maisons',
  templateUrl: './maisons.component.html',
  styleUrls: ['./maisons.component.scss']
})
export class MaisonsComponent implements OnInit {
  ListaMaisons: MaisonsModel[] = [];
  formGroupe: any;
  role = "";
  userId: string = localStorage.getItem('idUser') || '';
  page: number = 1; // Initialize the page number
  onImageError(event: any) {
    event.target.src = 'assets/images/images/notfound/No-Image-Placeholder.svg';
  }
  constructor(
    private MaisonService: MaisonService,
    private maisonJeunesService: MaisonJeunesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.formGroupe = this.formBuilder.group({
      nom_groupe: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    // Fetch user role
    this.role = localStorage.getItem('roles') || '';

    // Fetch groups
    this.loadGroupes();
  }

  loadGroupes(): void {
    this.MaisonService.AllMaisons().subscribe((group: GroupeModel[]) => {
      this.ListaMaisons = group; // Assign fetched groups
    });
  }

  regoindreGroup(groupe: GroupeModel): void {
    if (this.userId) {
      const groupUser: GroupUserModel = {
        id_user: this.userId,
        id_groupe: groupe.id_groupe,
        status: "encours"
      };

      this.MaisonService.rejoindreGroupe(groupUser).subscribe(() => {
        // Fetch updated list of groups after joining
        this.loadGroupes();
      });
    }
  }
}
