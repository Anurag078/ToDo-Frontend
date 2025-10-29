import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  login() {

    //name validation:-
    if (this.username === '') {
      alert('Name is mandatory !!!');
      return;
    }

    if (this.username.length < 3) {
      alert('Name must be at least 3 characters long !!!');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.username)) {
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



      const user = {username:'', email: this.username, password: this.password };
      this.authService.login(user).subscribe({
        next: (res:any) => {
          console.log("$$$$$$$$",res);
          if(res && res?.id){
            alert('Login successful');
          localStorage.setItem("id",res?.id);
          localStorage.setItem("username",res?.username);
          localStorage.setItem("email",res?.email);
            this.router.navigate(['/dashboard']);
          }

        },
        error: () => alert('login failed'),
      });

  }
}
