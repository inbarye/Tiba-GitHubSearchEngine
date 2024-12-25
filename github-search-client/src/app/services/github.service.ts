import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://localhost:7010/api';

  constructor(private http: HttpClient) {}

  searchRepositories(query: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.apiUrl}/search`, {
      params: { query },
    });
  }

  getFavorites(): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.apiUrl}/favorites`);
  }

  addToFavorites(repo: Repository): Observable<any> {
    console.log("add service")
    return this.http.post(`${this.apiUrl}/favorites/${repo.id}`, repo);
  }

  removeFromFavorites(repoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${repoId}`);
  }
}
