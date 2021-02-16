import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KidModel } from 'src/app/models/kid.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  kid: KidModel;

  constructor() {
    this.kid = new KidModel();
  }

  ngOnInit() {}

  onSubmitKid(form: NgForm) {
    console.log(this.kid);
    console.log(form);
    document.location.href = 'http://localhost:4200/home';
  }

  parents() {}
}
