import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-bar',
  templateUrl: './brand-bar.component.html',
  styleUrls: ['./brand-bar.component.css']
})
export class BrandBarComponent implements OnInit {

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logoutClicked(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
