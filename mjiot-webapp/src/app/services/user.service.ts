import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  private localStorageKey : string = "mjIoTApiToken";

  isLoggedId() : boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getToken() : string {
    return localStorage.getItem(this.localStorageKey);
  }

}
