import { Injectable } from '@angular/core';
import { UserSchema } from '../schemas/user';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private storage: Storage) { }

  async signOut(): Promise<any> {
    await this.storage.set(TOKEN_KEY, null)
    await this.storage.set(USER_KEY, null)
  }

  public async saveToken(token: string): Promise<any> {
    return await this.storage.set(TOKEN_KEY, token)
  }

  public async getToken(): Promise<String> {
    return await this.storage.get(TOKEN_KEY)
  }

  public async saveUserSchema(data:UserSchema): Promise<any> {
    return await this.storage.set(USER_KEY, JSON.stringify(data))
  }

  public async getUserSchema(): Promise<UserSchema> {
    return JSON.parse(await this.storage.get(USER_KEY)) as UserSchema
  }

}