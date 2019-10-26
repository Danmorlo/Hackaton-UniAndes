import { Component, OnInit } from '@angular/core';
import { ParentModel } from 'src/app/models/parent.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-parent',
  templateUrl: './login-parent.component.html',
  styleUrls: ['./login-parent.component.css']
})
export class LoginParentComponent implements OnInit {
  parent: ParentModel;

  constructor() {
    this.parent = new ParentModel();
  }

  ngOnInit() {}

  onSubmitparent(form: NgForm) {
    console.log(this.parent);
    document.location.href = 'http://localhost:4200/home-parent';
  }
}
