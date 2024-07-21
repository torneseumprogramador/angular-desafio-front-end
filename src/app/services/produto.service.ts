import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Produto } from '../models/produto';
import env from '../config/env';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = env.host;
  private token = LoginService.getToken();

  constructor(private http: HttpClient) { }

  async getProdutos(): Promise<Produto[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });

    try {
      const response = await firstValueFrom(this.http.get<Produto[]>(`${this.apiUrl}/produtos`, { headers }));
      return response;
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
      throw error;
    }
  }

  async salvar(produto: Produto): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });

    try {
      if(produto.id){
        await firstValueFrom(this.http.put(`${this.apiUrl}/produto/${produto.id}`, produto, { headers }));
      }
      else{
        await firstValueFrom(this.http.post(`${this.apiUrl}/produto`, produto, { headers }));
      }
    } catch (error) {
      console.error('Erro ao salvar produto', error);
      throw error;
    }
  }

  async buscarPorId(produtoId: number): Promise<Produto> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });

    try {
      return await firstValueFrom(this.http.get<Produto>(`${this.apiUrl}/produto/${produtoId}`, { headers }));
    } catch (error) {
      console.error('Erro ao buscar produtos por id', error);
      throw error;
    }
  }

  async apagar(produtoId: number): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });

    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/produto/${produtoId}`, { headers }));
    } catch (error) {
      console.error('Erro ao apagar produto', error);
      throw error;
    }
  }
}
