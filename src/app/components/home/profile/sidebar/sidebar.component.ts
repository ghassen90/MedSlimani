import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  show: number = 1;
  role: string = "";

  @Input()
  set selected(show: number){
    if(show){
      this.show = show;
    }
  }

  @Input()
  set roleUser(role: string){
    if(role){
      this.role = role;
    }
  }
  
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  routing(url: string, index: number){
    this.show = index;
    this.router.navigate([url]);
  }
}
