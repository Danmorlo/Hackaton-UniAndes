import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  goToDraw() {
    document.location.href = 'http://localhost:4200/draw';
  }
  goToImagine() {
    document.location.href = 'http://localhost:4200/drag';
  }
}
