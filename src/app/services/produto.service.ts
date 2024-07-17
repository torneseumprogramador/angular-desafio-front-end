import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  async getProdutos(): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzIxMjI1NjY1LCJleHAiOjE3MjEzMTIwNjV9.z9hHvJZfGuNlkU_imtw4SczNVZLWRWAjmkRnZEV6bIw',
      'Accept': 'application/json'
    });

    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/produtos`, { headers }));
  }

  async excluir(produtoId: number): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzIxMjI1NjY1LCJleHAiOjE3MjEzMTIwNjV9.z9hHvJZfGuNlkU_imtw4SczNVZLWRWAjmkRnZEV6bIw',
      'Accept': 'application/json'
    });

    firstValueFrom(this.http.delete(`${this.apiUrl}/produto/${produtoId}`, { headers }));
  }
}
