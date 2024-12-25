import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { RepositoryCardComponent } from '../repository-card/repository-card.component';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RepositoryCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchQuery = '';
  repositories: Repository[] = [];
  isLoading = false;
  isSaving = false;
  error: string | null = null;
  hasSearched = false;

  constructor(private githubService: GithubService) {}

  onSearch(): void {
    if (!this.searchQuery || this.searchQuery.length < 2) {
      return;
    }

    this.hasSearched = true;
    this.isLoading = true;
    this.error = null;

    this.githubService.searchRepositories(this.searchQuery).subscribe({
      next: (data) => {
        this.repositories = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to fetch repositories. Please try again.';
        this.isLoading = false;
      },
    });
  }

  addToFavorites(repo: Repository): void {
    this.isSaving = true;
    this.githubService.addToFavorites(repo).subscribe({
      next: () => {
        this.isSaving = false;
        alert('Added to favorites!');
      },
      error: (error) => {
        this.isSaving = false;
        alert('Failed to add to favorites. Please try again.');
      },
    });
  }
}
