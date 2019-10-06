import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookResolved, Book } from '../book';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  pageTitle = 'Edit Book';
  errorMessage: string;
  book: Book;

  fakeBook: Book = {...this.book};

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: BookResolved = data.resolvedData;
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.book);
    });

  }

  save(bookForm: NgForm) {
    if (bookForm.valid) {
      if (this.book._id === 0) {
        this.bookService.createBook(this.book).subscribe({
          next: () => this.onSaveComplete(`The new ${this.book.title} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.bookService.updateBook(this.book).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.book.title} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  handleDelete(data): void {
    if (this.book._id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.book.title} was not saved`);
    } else {
      if (data) {
        this.bookService.deleteBook(this.book._id).subscribe({
          next: () => this.onSaveComplete(`${this.book.title} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  handleRateClick(data) {
    /*let book = {...this.book};
    book.rating = data;*/
    console.log(data);
  }

  onSaveComplete(message?: string): void {
    if (message) {
      // toaster message
      //this.toastr.success(`${message}`, 'Success');
      console.log(message);
    }
    this.book = null;
    // Navigate back to the product list
    // TODO find a way to pass the data to books page
    this.router.navigate(['/books']);
  }

  onProductRetrieved(book: Book) {
    this.book = book;

    if (!this.book) {
      this.pageTitle = 'No Book found';
    } else {
      if (this.book._id === 0) {
        this.pageTitle = 'Add New Book';
      } else {
        this.pageTitle = `Edit Book: ${this.book.title}`;
      }
    }
  }

}
