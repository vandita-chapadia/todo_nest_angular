
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo app';
  showMenu: boolean = true;
  username: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.JwtUserToken.subscribe((token) => {
      if (token) {
        const decode: any = jwtDecode(token);
        this.username = decode.username;
      }
      if (this.username) {
        this.showMenu = false;
      }
      else {
        this.showMenu = true;
      }
    })
  }

  logout() {
    this.username = "";
    this.username = this.apiService.logout()
  }
}
