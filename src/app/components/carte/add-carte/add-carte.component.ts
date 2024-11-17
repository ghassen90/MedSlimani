import { Component, OnInit } from '@angular/core';
import {CarteModel} from "../../model/carte.model.";
import {CarteService} from "../../../service/carte.service";
import {MaisonModel} from "../../model/maison.model";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-carte',
  templateUrl: './add-carte.component.html',
  styleUrls: ['./add-carte.component.scss']
})
export class AddCarteComponent implements OnInit {
  formCart: any;
  listCartes: CarteModel[] = [];
  constructor(private carteService: CarteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formCart = this.formBuilder.group({
      nom: "",
      prenom: "",
      matricule:  "",
      dateDeNaissance:  "",
      imageCart: ""
    });

    this.carteService.getListCartes().subscribe((list: CarteModel[]) => {
      if (list) {
        this.listCartes = [...list];
      }
    });
  }

  onImageSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.formCart.patchValue({
        imageCart: file
      });
    }
  }

  refreshListCart() {
    this.carteService.getListCartes().subscribe((list: CarteModel[]) => {
      if (list) {
        this.listCartes = [...list];
      }
    });
  }
  submitCart() {
    const cart: CarteModel = this.formCart.value;
    const imageFile: File = this.formCart.get('imageCart')?.value;

    this.carteService.addMaisonWithImage(cart, imageFile).subscribe(value => {
      if (value) {
        //this.refreshListCart();
      }
    });
  }


}
