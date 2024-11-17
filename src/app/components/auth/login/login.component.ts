import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MaisonJeunesService} from "../../../service/maison-jeunes.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginModel } from './loginModel';
import { AuthModel } from '../../model/auth.model';
import { Router } from '@angular/router';
import {MaisonModel} from "../../model/maison.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    
  formLogin: any; 
  error = false;
  
  constructor(private formBuilder:  FormBuilder, private router: Router, 
    private maisonJeunesService: MaisonJeunesService,
    private loginService: LoginService,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      tel: '',
      password: ''
    });
  }

  login(){
   //{'tel':'+21651120639','password':'ayajaddi'}
  this.loginService.login(this.formLogin.value as LoginModel).subscribe((value: AuthModel) => {
 
    this.error = false;
    // localStorage.setItem('accessToken', 'Bearer ' + value.accessToken);
 
    localStorage.setItem('idUser', value.id_user+"");
    localStorage.setItem('nom', value.nom);
    localStorage.setItem('prenom', value.prenom);
    localStorage.setItem('tel', value.tel);
    localStorage.setItem('roles', value.roles);
    localStorage.setItem('accessToken', value.token );
    if(!(value.roles[0] === 'ROLE_ADMIN_GENERAL')){
      this.maisonJeunesService.getMaisonJeunesByIdUser(value.id_user+"")
        .subscribe(maisonJeune =>{
        if(maisonJeune){
          let maison: MaisonModel = {...maisonJeune as MaisonModel};
          localStorage.setItem('idMaison', value + '');
        }
      });
    }
    this.router.navigate(['/espace/profile']);
  },
  (err) => {
    this.error = true;
  });
  }

}

