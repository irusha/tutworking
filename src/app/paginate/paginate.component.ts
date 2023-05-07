import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements AfterViewInit{
  @Input() dataSet: any;
  @Input() currentPage: string | undefined;
  @Input() urlFormat: string | undefined;
  pages: string[] | undefined;

  ngAfterViewInit(): void {

  }

}
