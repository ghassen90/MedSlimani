import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaisonService } from 'src/app/service/maisons.service';

@Component({
  selector: 'app-maison-by-id',
  templateUrl: './maison-by-id.component.html',
  styleUrls: ['./maison-by-id.component.scss']
})
export class MaisonByIdComponent implements OnInit {
  events: any[] = [];
  commentForm: FormGroup;
  token: string = 'your-auth-token-here'; // Remplacez avec votre token si nécessaire

  constructor(
    private route: ActivatedRoute,
    private maisonService: MaisonService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      description: ['']
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getEvents(id);
      }
    });
  }

  getEvents(id: string): void {
    this.maisonService.getEventsByMaisonId(id).subscribe((events: any[]) => {
      this.events = events;
    });
  }

  addComment(eventId: number): void {
    const commentData = {
      description: this.commentForm.value.description,
      id_event: eventId
    };
    this.maisonService.addComment(commentData ).subscribe(newComment => {
      const event = this.events.find(e => e.id_event === eventId);
      event?.userComments.push(newComment);
      this.commentForm.reset();
    });
  }

  addLike(eventId: number): void {
    this.maisonService.addLike(eventId ).subscribe(() => {
      const event = this.events.find(e => e.id_event === eventId);
      if (event) {
        event.userLikes += 1;
      }
    });
  }

  
}
