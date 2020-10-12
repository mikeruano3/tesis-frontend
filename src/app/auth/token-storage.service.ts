import { Injectable } from '@angular/core';
import { UserSchema } from '../schemas/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:UserSchema): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserSchema {
    return JSON.parse(sessionStorage.getItem(USER_KEY)) as UserSchema;
  }

  public getUserData(): UserSchema {
    let rawData = sessionStorage.getItem(USER_KEY)
    if(!rawData){
      return null
    }
    let tokenData = JSON.parse(rawData)
    return tokenData.userData as UserSchema;
  }
}