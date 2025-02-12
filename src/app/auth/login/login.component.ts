import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    // Implement your login logic here
    console.log('Login submitted:', this.loginRequest);
  }
}