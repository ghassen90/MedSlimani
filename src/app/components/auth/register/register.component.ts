import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  secondes: number = 60;
  click = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  compterCode() {
    this.secondes = 60;
    if (this.secondes > -1) {
      setInterval(() => {
        this.secondes--;
      }, 1000);
    }
  }

}
