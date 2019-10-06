import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  pageTitle = 'Book List';
  errorMessage: string;
  books: Book[];
  filteredBooks: Book[] = [];
  message: string;

  // tslint:disable-next-line: variable-name
  _bookFilter = '';

  get bookFilter(): string {
    return this._bookFilter;
  }

  set bookFilter(value: string) {
    this._bookFilter = value;
    this.filteredBooks = this.bookFilter ? this.performFilter(this.bookFilter) : this.books;
  }

  performFilter(filterBy: string): Book[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: Book) =>
      book.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: books => {
        this.books = books;
        this.filteredBooks = this.books;
      },
      error: err => this.errorMessage = err
    });
  }

}
