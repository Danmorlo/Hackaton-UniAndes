import { Component, OnInit } from '@angular/core';
import { ParentModel } from 'src/app/models/parent.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-parent',
  templateUrl: './register-parent.component.html',
  styleUrls: ['./register-parent.component.css']
})
export class RegisterParentComponent implements OnInit {

  parent: ParentModel;

  constructor() { 

    this.parent = new ParentModel();

  }

  ngOnInit() {
  }

  onSubmitparent(form: NgForm){
    console.log(this.parent)
  }

}
