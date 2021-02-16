import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() name;
  constructor() {}

  ngOnInit() {}
  goToLogin() {
    document.location.href = 'http://localhost:4200/login';
  }
}
