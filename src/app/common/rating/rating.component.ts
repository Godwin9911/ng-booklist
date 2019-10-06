import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  template: `
  <ngb-rating
  [(rate)]="rating" (hover)="hovered=$event" (leave)="hovered=0" [readonly]="readonly" (click)="handleRating()">
  </ngb-rating>
  `,
  styles: ['* {color: #EDA800; font-size: 1.5rem;}'],
  providers: [NgbRatingConfig]
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() readable: boolean;
  @Output() eventClick = new EventEmitter();
  selected = 0;
  hovered = 0;
  readonly = true;

  ngOnInit() {
    if (typeof(this.readable) !== 'undefined') {
      this.readonly = this.readable;
    }
  }
  constructor(config: NgbRatingConfig) {
    config.max = 5;
  }

  handleRating() {
    console.log(this.rating);
    //this.eventClick.emit(`${this.selected}`);
  }
}
