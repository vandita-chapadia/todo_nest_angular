import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  //get register user data
  registerUser(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }
    const { username, password } = registerForm.value;
    this.apiService.register(username, password).subscribe((res) => {
      console.log(res);
    });
  }
}
