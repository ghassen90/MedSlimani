import { Component, OnInit } from '@angular/core';
import { EventResponseModel, UserCommentModel } from '../../model/event.model.response';
import { EventService } from 'src/app/service/event.service';
import { EventModel } from '../../model/event.model';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit {
  listeEvents: EventResponseModel[] = [];
  userCommentNumber: number = 0;
  likeNumber: number = 0;
  role: string | undefined;
  formEvent: any;
  constructor(    private eventService :EventService ) { }
    selectedFile: File | null = null;
    imageFile: File | null = null;
    onImageError(event: any) {
      event.target.src = 'assets/images/images/notfound/No-Image-Placeholder.svg';
    }
  ngOnInit(): void {
    if(localStorage.getItem('roles')){
      this.role = localStorage.getItem('roles')+"";
    }
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
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formEvent.patchValue({
        imageFile: file
      });
      this.formEvent.get('imageFile')?.updateValueAndValidity();
    }
  }
  addEvent() { 
    const imageFile: File = this.formEvent.get('imageFile')?.value;
    const even: EventModel = this.formEvent.value;
    this.eventService.addEvent(even, imageFile).subscribe(value => {
      if(event){
       // location.reload();
      }
    });
  }
}
