import { Component, OnInit } from '@angular/core';
import { KidModel } from 'src/app/models/kid.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-kid',
  templateUrl: './register-kid.component.html',
  styleUrls: ['./register-kid.component.css']
})
export class RegisterKidComponent implements OnInit {

  kid: KidModel;

  constructor() {

    this.kid = new KidModel()

   }

  ngOnInit() {
  }

  onSubmitKid(form: NgForm){
    console.log(this.kid)
  }

}
