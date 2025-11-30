export interface IGenre {
  id: number;
  name: string;
  icon: string;
  showOnMenu: boolean;
}

export type GenreResponse = Omit<IGenre, 'showOnMenu'>;
