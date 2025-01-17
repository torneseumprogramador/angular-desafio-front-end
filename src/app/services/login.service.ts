import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { Login } from '../models/login';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

const KEY_LOGIN: string = "DesafioFrontAngularLoginToken"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = env.host;

  constructor(private http: HttpClient) { }

  async login(email: string, senha: string): Promise<Login> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    try {
      const response = await firstValueFrom(this.http.post<Login>(`${this.apiUrl}/login`, {
        "email": email,
        "senha": senha
      }, { headers }));

      return response;
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error;
    }
  }

  static setLocalStorage(token:string) {
    const minutosExpiracao = 22*60; // token expira em 22 horas
    const now = new Date();
    const item = {
      value: token,
      expiry: now.getTime() + minutosExpiracao * 60000, // Convert minutes to milliseconds
    };
    localStorage.setItem(KEY_LOGIN, JSON.stringify(item));
  }

  static getToken(runProdDev: boolean = true): string {
    if(runProdDev){ // neste cenário estou rodando em modo dev ou prod
      const platformId = inject(PLATFORM_ID);
      if(!isPlatformBrowser(platformId)) return "";
    }

    const itemStr = window.localStorage.getItem(KEY_LOGIN);
    if (!itemStr) {
      return "";
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      LoginService.clearLocalStorage();
      return "";
    }

    return item.value;
  }

  static clearLocalStorage() {
    window.localStorage.removeItem(KEY_LOGIN);
  }

  static tokenValido(runProdDev: boolean = true): boolean {
    const token: string = LoginService.getToken(runProdDev);
    return token ? true : false;
  }
}
