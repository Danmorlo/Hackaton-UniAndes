import { Component, OnInit } from '@angular/core';
import { SpecialistModel } from 'src/app/models/specialist.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-specialist',
  templateUrl: './login-specialist.component.html',
  styleUrls: ['./login-specialist.component.css']
})
export class LoginSpecialistComponent implements OnInit {

  specialist: SpecialistModel;
  constructor() {
    this.specialist = new SpecialistModel();
   }

  ngOnInit() {
  }
  
  onSubmitspecialist(form: NgForm){
    console.log(this.specialist)
  }

}
