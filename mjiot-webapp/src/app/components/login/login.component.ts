import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  loginForm: FormGroup;
  wrongCredentials: boolean;
  waitingForLogin: boolean;

  async onLoginClicked() {
    this.waitingForLogin = true;
    console.log(this.loginForm.value);
    let isLoggedIn = await this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password);
    this.waitingForLogin = false;

    if (isLoggedIn)
      this.letUserIn();
    else {
      this.loginForm.reset();
      this.wrongCredentials = true;
    }
  }

  letUserIn() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
    console.log('Login Init');

    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    //this.authenticationService.login("user1", "pass1");
  }

}
