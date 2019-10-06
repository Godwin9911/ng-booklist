import { Component, OnInit } from '@angular/core';
import { Book, BookResolved } from '../book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  pageTitle = 'Book Detail';
  book: Book;
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: BookResolved = this.route.snapshot.data.resolvedData;
    this.errorMessage = resolvedData.error;
    console.log(resolvedData.book);
    this.onBookRetrieved(resolvedData.book);
  }

  onBookRetrieved(book: Book): void {
    this.book = book;

    if (this.book !== null) {
      this.pageTitle = `Book Detail: ${this.book.title}`;
    } else {
      this.pageTitle = 'No Book found';
    }
  }

}
