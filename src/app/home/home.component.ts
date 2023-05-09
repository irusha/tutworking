import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataGrabberService} from "../data-grabber.service";
import {angularAddress, serverAddress} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  apiDataObj: any;
  maxPages: number | undefined;
  urlFormat = angularAddress + '/?page='
  recommendationData: any;
  pageNumber: number = 1;
  secondDataSet: any;
  pages: number[] = [];
  @ViewChild('recommendationTitle') recommendationTitle: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private apiService: DataGrabberService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          if (params['page'] != null) {
            this.pageNumber = parseInt(params['page']);
            if (isNaN(this.pageNumber)) {
              console.log(this.pageNumber)
              window.location.href = "/";
            }
          }
        }
      );

    let secondDataSetObj: any;
    this.apiService.getData(serverAddress + "/library/?max=12&page=" + this.pageNumber).subscribe(res => {
      secondDataSetObj = res
      this.secondDataSet = secondDataSetObj.data
      this.maxPages = secondDataSetObj.pages
      if (secondDataSetObj.pages > 7) {
        this.pages.push(...this.pagesArrayCreator(this.pageNumber, secondDataSetObj.pages))
      } else {
        for (let i = 1; i <= secondDataSetObj.pages; i++) {
          this.pages?.push(i)
        }
      }

      console.log(this.pages)
    })
  }

  ngAfterViewInit(): void {
    if (this.pageNumber == 1) {
      this.apiService.getData(serverAddress + "/recom/").subscribe(res => {
        this.apiDataObj = res
        this.recommendationData = this.apiDataObj.data
      })
    } else {
      this.recommendationData = []
      let recommTitle = this.recommendationTitle?.nativeElement
      recommTitle.style.display = 'none'
    }
  }

  pagesArrayCreator(page: number, maxPages: number) {
    let pages = []
    if (page == maxPages || page == maxPages - 1) {
      for (let i = page - 4; i <= maxPages; i++) {
        if (i > 0) {
          pages.push(i)
        }
      }
    }

    else if (page == 1 || page == 2) {
      for (let i = 1; i <= 5; i++) {
        if (i <= maxPages) {
          pages.push(i)
        }
      }
    }

    else {
      for (let i = page - 2; i <= page + 2; i++) {
        if (i <= maxPages) {
          pages.push(i)
        }
      }
    }
    return pages
  }
}
