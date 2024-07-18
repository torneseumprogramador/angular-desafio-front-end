import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3001';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzIxMjk0NDg4LCJleHAiOjE3MjEzODA4ODh9.TmeGQ5aH8blo-xmqsFG-XvuDTQZzDDZLqNpDKypMgpk';

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
}
