import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3001';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzIxMzgzMjE1LCJleHAiOjE3MjE0Njk2MTV9.0rIkcXoDKUdDjbSTZ3kM0IX8fjp1GCeFVaV5TFC_n4c';

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
      if(produto.id === 0){
        await firstValueFrom(this.http.post(`${this.apiUrl}/produto`, produto, { headers }));
      }
      else{
        await firstValueFrom(this.http.put(`${this.apiUrl}/produto/${produto.id}`, produto, { headers }));
      }
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
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
      console.error('Erro ao buscar produtos', error);
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
      console.error('Erro ao buscar produtos', error);
      throw error;
    }
  }
}
