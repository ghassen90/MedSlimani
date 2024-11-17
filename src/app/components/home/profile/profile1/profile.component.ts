import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import {EventResponseModel, UserCommentModel} from 'src/app/components/model/event.model.response';
import { UserModel } from 'src/app/components/model/user.mode';
import { AdminService } from 'src/app/service/admin.service';
import { EventService } from 'src/app/service/event.service';
import { StorieService } from 'src/app/service/storie.service';
import {MaisonJeunesService} from "../../../../service/maison-jeunes.service";
import {MaisonModel} from "../../../model/maison.model";
import {CommentModel} from "../../../model/comment.model";
import {CommentService} from "../../../../service/comment.service";
import { EventModel } from 'src/app/components/model/event.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Profile1Component implements OnInit {
  nomPrenom = '';
  role = '';
  show = false;
  file: any;
  selectedFiles!: FileList;
  currentFile!: File;
  progress = 0;
  message = '';
  fileInfos!: Observable<any>;
  formEvent: any;
  formModifUser: any;
  formAddComment: any;
  listeEvents: EventResponseModel[] = [];
  listeMaison: MaisonModel[] = [];
  listUsers: UserModel[] = [];
  currentUser: UserModel = {};
  currentMaison: MaisonModel[] = [];
  userCommentNumber: number = 0;
  likeNumber: number = 0;
  comment: CommentModel = {};

  constructor( private storieService :StorieService,
    private userService: AdminService,
    private maisonJeunesService: MaisonJeunesService,
    private eventService :EventService,
    private commentService :CommentService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.eventService.getListEvents().subscribe(
      (evnts: EventResponseModel[]) =>{
        this.listeEvents = [...evnts as EventResponseModel[]];
         this.listeEvents.forEach(value => {
           if(value){
             let liste: UserCommentModel[] = value.userComments as UserCommentModel[];
             this.userCommentNumber  =value.usercommentsCount ;
             this.likeNumber = value.userLikes;
           }
         });
    });

    if(localStorage.getItem('idUser')){

      this.maisonJeunesService.getMaisonJeunesByIdUser1().subscribe(
        (maison) =>{
         this.currentMaison = maison ;

        });
    }

    this.maisonJeunesService.getListMaisons().subscribe(
      (maison) =>{
        this.listeMaison = [...maison];
      },
      (error) => {
        console.error('Error fetching list of maisons:', error);
      });
console.log(this.listeMaison);
    this.userService.getListeUsers().subscribe(
      (users: UserModel[]) =>{

        this.listUsers = [...users];

    });

    if(localStorage.getItem('idUser')){
      this.userService.getUsersById(localStorage.getItem('idUser')+"").subscribe(
        (user: UserModel) =>{
          this.currentUser = {...user};

          this.nomPrenom = (localStorage.getItem('nom') ? localStorage.getItem('nom') : '' ) +' '+ (localStorage.getItem('prenom') ? localStorage.getItem('prenom') : '' );

      });
      if(localStorage.getItem('roles')){
        this.role = localStorage.getItem('roles')+"";
      }
    }

    this.formEvent = this.formBuilder.group({
      titre: '',
      description: '',
      id_maisonjeunes: "",
      id_user: "",
    });

    this.formAddComment = this.formBuilder.group({
      description : '',
    });

    this.formModifUser = this.formBuilder.group({
      nom: '',
      prenom: ''
    });
  }

  modiProfileUser() {
    if(localStorage.getItem('idUser')){
      let user = this.formModifUser.value as UserModel;
      this.currentUser.id_user = localStorage.getItem('idUser');
      this.currentUser.prenom = user.prenom;
      this.currentUser.nom = user.nom;
      this.userService.updateUser(this.currentUser).subscribe(user=>{
        localStorage.setItem('nom', user.nom);
        localStorage.setItem('prenom', user.prenom);
        window.location.reload();
      });
    }
  }

  getUserName(idUser: string): string{
    let userName: string = "";
      this.userService.getUsersById(idUser).subscribe((user: UserModel) =>{
        if(user){
          userName = user.nom +" "+ user.prenom;
        }
      });
    return userName;
  }

  addComment(eventResponse: EventResponseModel){
    this.comment.description = this.formAddComment.value.description;
    this.comment.id_user = this.currentUser.id_user;
    this.comment.id_event = eventResponse.id_event;
    this.commentService.addCmment(this.comment).subscribe(value=>{
      this.eventService.getListEvents().subscribe(
        (evnts) =>{
          this.listeEvents = [...evnts as EventResponseModel[]];
          this.listeEvents.forEach(value => {
            if(value){
              this.userCommentNumber ++;
            }
          });
        });
    });
  }

  addLike(eventResponse: EventResponseModel){
  }

  addEvent() {
    let event: EventModel = this.formEvent.value as EventModel;
    this.eventService.addEvent(event).subscribe(event=>{
      if(event){
        location.reload();
      }
    });
}
}
