import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) { }

  loginForm: FormGroup;

  async onLoginClicked() {
    console.log(this.loginForm.value);
    let result = await this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password);
    console.log(result);
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
