import { Component, OnInit } from '@angular/core';
import { SpecialistModel } from 'src/app/models/specialist.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-specialist',
  templateUrl: './register-specialist.component.html',
  styleUrls: ['./register-specialist.component.css']
})
export class RegisterSpecialistComponent implements OnInit {
  specialist: SpecialistModel;

  constructor() {
    this.specialist = new SpecialistModel();
  }

  ngOnInit() {}

  onSubmitSpecialist(form: NgForm) {
    console.log(this.specialist);
  }
}
