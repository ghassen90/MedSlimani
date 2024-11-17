import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nomprenom: string = '';
  role: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nomprenom = (localStorage.getItem('nom') ? localStorage.getItem('nom') : '' ) +' '+ (localStorage.getItem('prenom') ? localStorage.getItem('prenom') : '' );
    this.role = localStorage.getItem('roles') +"";
  }

  logOut(){
 
    localStorage.removeItem('idUser');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('idMaisonJeuns');
    localStorage.removeItem('tel');
    this.router.navigate(['/login']);
  }

}
