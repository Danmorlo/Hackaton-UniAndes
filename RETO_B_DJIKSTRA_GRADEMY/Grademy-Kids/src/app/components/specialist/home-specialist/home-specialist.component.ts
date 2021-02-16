import { Component, OnInit } from '@angular/core';
import { SpecialistModel } from 'src/app/models/specialist.model';

@Component({
  selector: 'app-home-specialist',
  templateUrl: './home-specialist.component.html',
  styleUrls: ['./home-specialist.component.css']
})
export class HomeSpecialistComponent implements OnInit {
  specialist: SpecialistModel;
  todo: any[];

  constructor() {
    this.specialist = new SpecialistModel();
  }

  ngOnInit() {
    this.getData();
    this.toDo();
  }

  getData() {
    this.specialist = {
      name: 'Valentina',
      lastname: 'Bernal',
      email: 'correo@gmail.com',
      description: 'La psicologia es una',
      password: 'password',
      career: 'Psicología'
    };
  }

  toDo() {
    this.todo = [
      { img: 'assets/img/kids-draw.jpg' },
      { img: 'assets/img/kids-draw.jpg' },
      { img: 'assets/img/kids-draw.jpg' },
      { img: 'assets/img/kids-draw.jpg' },
      { img: 'assets/img/kids-draw.jpg' },
      { img: 'assets/img/kids-draw.jpg' },
      { img: 'assets/img/kids-draw.jpg' }
    ];
  }
}
