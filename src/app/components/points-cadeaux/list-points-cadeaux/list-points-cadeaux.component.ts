import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { PointCadeauxService } from 'src/app/service/point-cadeaux.service';
import { PointcadeauxModel } from '../../model/pointcadeaux.model';
import { UserModel } from '../../model/user.mode';

@Component({
  selector: 'app-list-points-cadeaux',
  templateUrl: './list-points-cadeaux.component.html',
  styleUrls: ['./list-points-cadeaux.component.scss']
})
export class ListPointsCadeauxComponent implements OnInit {

  listPointsCadeaux: PointcadeauxModel[] = [];
  pointsCadeaux: PointcadeauxModel = {};
  users: UserModel[] = [];
  formPointCadeaux: any;
  updatepointCadeaux :any;

  constructor( private pointCadeauxService: PointCadeauxService,
               private formBuilder: FormBuilder,
               private adminService: AdminService) { }

  ngOnInit(): void {
    this.formPointCadeaux = this.formBuilder.group({
      point_cadeaux: ''
    });
  /*  this.adminService.getListeUsers().forEach((users: UserModel[])=>{
      if(users?.length){
        users.forEach((user: UserModel)=>{
            this.pointCadeauxService.getPointCadeauxById(user.id_pointCadeaux).subscribe((pointCadeaux: PointcadeauxModel)=>{
              user.pointcadeaux = {...user.pointcadeaux ,...pointCadeaux};
            });
        });
      }
      this.users = [...users]
    }); */
    this.adminService.getListeUsers().forEach((users: UserModel[])=>{ 
      this.users = [...users]
    }); 
    
  }
  getPointCadeaux(id_pointCadeaux: number): number{
    let pc = 0;
    this.pointCadeauxService.getPointCadeauxById(id_pointCadeaux).subscribe((pointCadeaux: PointcadeauxModel)=>{
      pc = pointCadeaux.point_cadeaux;
    });
    return pc;
  }

  updatePointCadeaux(idPointCadeaux: any){
    this.pointCadeauxService.getPointCadeauxById(idPointCadeaux).subscribe(point =>{
      if(point){
        this.pointsCadeaux = {...this.pointsCadeaux, ...point};
      }
    });
  }
    
  upPointCadeaux(){
    if (this.pointsCadeaux){
      this.pointCadeauxService.update({...this.pointsCadeaux, point_cadeaux: this.formPointCadeaux.value.point_cadeaux}).subscribe((point: PointcadeauxModel)=> {
        if(point){
          this.pointsCadeaux = {...point};
       //   location.reload();
        }
      });
    }
  }
    
}
    
    
    
