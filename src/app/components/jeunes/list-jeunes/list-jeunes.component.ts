import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { UserModel } from '../../model/user.mode';
import {RoleModel} from "../../model/role.model";

@Component({
  selector: 'app-list-jeunes',
  templateUrl: './list-jeunes.component.html',
  styleUrls: ['./list-jeunes.component.scss']
})
export class ListJeunesComponent implements OnInit {

  listUsers: UserModel[] = [];
  formAdmin: any; 
  constructor(private adminService: AdminService, private formBuilder:  FormBuilder) { }

  ngOnInit(): void {
    this.formAdmin = this.formBuilder.group({
      nom: '',
      password: 'admin',
      prenom: '',
      tel: ''
    });

    this.adminService.getListeAdministrateur().subscribe((value: UserModel[])=>{
      this.listUsers = value;
    });
    
  }

  addAdministrateur(){
    this.adminService.saveAdmin(this.formAdmin.value as UserModel).subscribe((value: any)=>{
      if(value){
        this.adminService.getListeAdministrateur().subscribe((value: UserModel[])=>{
          this.listUsers = [...value];
        });
      }
    });
  }
  getRole(roles: any): any{
    return roles[0]?.name+"" ? roles[0].name+"" : "PAS ROLE";
  }
}
