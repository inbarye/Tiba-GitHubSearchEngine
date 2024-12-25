import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repository-card',
  standalone: true,
  imports: [],
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.scss',
})
export class RepositoryCardComponent {
  @Input() repository!: Repository;
  @Input() isFavorite: boolean = false; // TODO
  @Input() isLoading: boolean = false;
  @Output() actionClick = new EventEmitter<Repository>();

  constructor(private githubService: GithubService) {}

  getActionButtonText(): string {
    if (this.isLoading) {
      return this.isFavorite ? 'Removing...' : 'Adding...';
    }
    return this.isFavorite ? 'Remove' : 'Add to Favorites';
  }

  onActionClick(): void {
    this.actionClick.emit(this.repository);
  }
}
