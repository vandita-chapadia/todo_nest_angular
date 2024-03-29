import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.JwtUserToken.subscribe((token) => {
      if (token) {
        this.router.navigateByUrl('/').then();
      }
    });
  }

  //get login user data
  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const { username, password } = loginForm.value;
    this.apiService.login(username, password);
    return loginForm.reset();
  }
}
