import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {

    //name validation:-
    if (this.name === '') {
      alert('Name is mandatory !!!');
      return;
    }

    if (this.name.length < 3) {
      alert('Name must be at least 3 characters long !!!');
      return;
    }

    const namePattern = /^[A-Za-z ]+$/;
if (!namePattern.test(this.name)) {
  alert('Name must contain only letters A-Z or a-z and spaces only !!!');
  return;
}


    // Email validation
    if (this.email === '') {
      alert('Email is mandatory !!!');
      return;
    }

    if (this.email.length < 8) {
      alert('Email must be at least 8 characters long !!!');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      alert('Please enter a valid email address !!!');
      return;
    }

//validations for password :-
if (this.password === '') {
  alert('Password is mandatory !!!');
  return;
}
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
if (!passwordPattern.test(this.password)) {
  alert('Password must be at least 6 characters long and include a letter, a number, and a special character !!!');
  return;
}

    const user = { username: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe({

      next: (res) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: () => alert('Registration failed'),
    });
  }
}
