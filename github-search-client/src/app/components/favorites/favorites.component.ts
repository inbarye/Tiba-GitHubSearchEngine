import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { RepositoryCardComponent } from '../repository-card/repository-card.component';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RepositoryCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: Repository[] = [];
  isLoading = false;
  isRemoving = false;
  error: string | null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.error = null;

    this.githubService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load favorites. Please try again.';
        this.isLoading = false;
      },
    });
  }

  removeFromFavorites(repo: Repository): void {
    if (
      confirm('Are you sure you want to remove this repository from favorites?')
    ) {
      this.isRemoving = true;
      this.githubService.removeFromFavorites(repo.id).subscribe({
        next: () => {
          this.isRemoving = false;
          this.favorites = this.favorites.filter((f) => f.id !== repo.id);
        },
        error: () => {
          this.isRemoving = false;
          alert('Failed to remove from favorites. Please try again.');
        },
      });
    }
  }
}
