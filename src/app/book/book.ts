export interface Book {
  _id: any;
  title: string;
  genre: string;
  author: string;
  read: boolean;
  links?: any;
}

export interface BookResolved {
  book: Book;
  error?: any;
}
