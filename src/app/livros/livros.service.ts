import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livros } from './livros.model';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private url = 'http://localhost:3000/livros';

  constructor(private httpClient: HttpClient) {}

  getLivros(): Observable<Livros[]> {
    return this.httpClient.get<Livros[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getLivro(id: number): Observable<Livros> {
    return this.httpClient.get<Livros>(`${this.url}/${id}`);
  }

  private adicionar(livros: Livros) {
    return this.httpClient.post(this.url, livros);
  }

  private atualizar(livros: Livros) {
    return this.httpClient.put(`${this.url}/${livros.id}`, livros);
  }

  salvar(livros: Livros) {
    if (livros.id) {
      return this.atualizar(livros);
    } else {
      return this.adicionar(livros);
    }
  }
}
