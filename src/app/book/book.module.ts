import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BookResolverService } from './book-resolver.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import {FormsModule} from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { RatingComponent } from '../common/rating/rating.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  {
    path: ':id', component: BookDetailComponent,
    resolve: {resolvedData: BookResolverService}
  },
  {
    path: ':id/edit', component: BookEditComponent,
    resolve: {resolvedData: BookResolverService}
  },
];

@NgModule({
  declarations: [
    RatingComponent,
    BookDetailComponent,
    BookEditComponent,
    BookListComponent,
    ModalComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BookRoutingModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RatingComponent
  ]
})
export class BookModule { }
