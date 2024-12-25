export interface Repository {
    id: number;
    name: string;
    url: string;
    description: string | null;
    stars: number;
    language?: string;
  }