import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../model/user.mode";
import {AdminService} from "../../../service/admin.service";
import {PointCadeauxService} from "../../../service/point-cadeaux.service";
import {PointcadeauxModel} from "../../model/pointcadeaux.model";

@Component({
  selector: 'app-add-jeunes',
  templateUrl: './add-jeunes.component.html',
  styleUrls: ['./add-jeunes.component.scss']
})
export class AddJeunesComponent implements OnInit {

  point: PointcadeauxModel = {};

  constructor(private userService: AdminService, private pointCadaux: PointCadeauxService) { }

  ngOnInit(): void {
    if(localStorage.getItem('idUser')){
      this.userService.getUsersById(localStorage.getItem('idUser')+"").subscribe((user: UserModel)=>{
        if(user){
          if(user.id_pointCadeaux === 0){
            this.point.point_cadeaux = 0;
          }else{
            this.pointCadaux.getPointCadeauxById(user.id_pointCadeaux)
              .subscribe(point=>{
                if (point){
                  this.point = {...point};
                }
              });
          }
        }
      });
    }
  }

  datasets = [
    {
      label: 'Traffic',
      data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
    },
  ];

  labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

}
