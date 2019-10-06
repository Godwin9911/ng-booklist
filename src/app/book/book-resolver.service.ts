import { Injectable } from '@angular/core';
import { BookResolved } from './book';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BookService } from './book.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookResolverService implements Resolve<BookResolved>{

  constructor(private bookService: BookService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookResolved> {
    const id = route.paramMap.get('id');
    /*if (isNaN(+id)) {
            const message = `Book id was not a number: ${id}`;
            return of({book: null, error: message});
        }*/
    return this.bookService.getBook(id)
            .pipe(
                map(book => ({book})),
                catchError(error => {
                    const message = `Retrieval error: ${error}`;
                    console.log(message);
                    return of({book: null, error: message});
                })
            );
  }
}
