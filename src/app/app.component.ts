import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
  //  imports: [RouterModule,FormsModule,CommonModule,HttpClientModule],
  //  providers:[AuthService]
})
export class AppComponent implements OnInit{
  title = 'todo';
  isUserLoggedIn:boolean=false;

  constructor(private router: Router,private aservice:AuthService) {}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {

this.isUserLoggedIn=this.aservice.isUserLoggedIn();
console.log("@@@@@@@@@@@@@@@",this.isUserLoggedIn);
    })
  }

  // routeToLink(s : string) {

  //   this.router.navigate(["/"+s])

  // }




}
