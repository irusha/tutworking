import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pageNumber = 1
  @Input() pages: number[] = [];
  @Input() urlFormat = ''
  @Input() maxPages: number | undefined
}
