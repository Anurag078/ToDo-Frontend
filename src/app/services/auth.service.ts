import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `http://localhost:8080/api/users`;

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  clearStorage():void{
    localStorage.clear();
  }
  isUserLoggedIn():boolean{
    let isAuth=false;
    if (typeof localStorage !== 'undefined') {
    const id=localStorage.getItem("id");
    isAuth= id!==null ?true:false;

  }
  return isAuth;
}
}
