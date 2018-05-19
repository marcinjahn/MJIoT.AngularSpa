import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-bar',
  templateUrl: './brand-bar.component.html',
  styleUrls: ['./brand-bar.component.css']
})
export class BrandBarComponent implements OnInit {

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) { }

  activeTab: string;

  ngOnInit() {
    this.activeTab = "devices";
  }

  logoutClicked(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  devicesClicked(): void {
    this.router.navigate(['/devices']);
    this.activeTab = "devices";
  }

  connectionsClicked(): void {
    this.router.navigate(['/connections']);
    this.activeTab = "connections";
  }

}
