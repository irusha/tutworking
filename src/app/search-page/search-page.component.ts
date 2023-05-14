import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {Title} from "@angular/platform-browser";
import {angularAddress, serverAddress} from "../../environments/environment";
import {pagesArrayCreator} from "../common-methods";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements AfterViewInit, OnInit {
  query: string = '';
  searchData: any;
  pageNumber: number = 1;

  filters: any = []
  maxPages: number | undefined;
  pages: number[] = [];
  urlFormat: string = ''

  ngAfterViewInit(): void {
    this.titleService.setTitle('Search results: ' + this.query + ' - HomeHub')
  }

  buildString(filters: any, query: string) {
    let str = '/search/'
    str += '?max=24&q=' + encodeURIComponent(query)
    for (let i = 0; i < filters.length; i++) {
      str += '&filter=' + encodeURIComponent(filters[i])
    }
    return str
  }

  ngOnInit() {
    let queries: any = []

    this.route.queryParams
      .subscribe(params => {
        if (params['page'] != null) {
          this.pageNumber = parseInt(params['page']);
          if (isNaN(this.pageNumber)) {
            console.log(this.pageNumber)
            window.location.href = "/";
          }
        }

        if (params['q'] != null) {
          if (Array.isArray(params['q'])) {
            queries.push(...params['q'])
          } else {
            queries.push(params['q'])
          }
        }

        this.query = queries[0]

        if(params['filter'] != null) {
          if (Array.isArray(params['filter'])) {
            this.filters.push(...params['filter'])
          } else {
            this.filters.push(params['filter'])
          }
        }
      });

    this.apiService.getData(serverAddress + this.buildString(this.filters, this.query) + '&page=' + this.pageNumber).subscribe(res => {
      this.urlFormat = angularAddress + this.buildString(this.filters, this.query) + '&page='
      let result: any = res
      this.maxPages = result.pages
      this.searchData = result.data
      if (result.pages > 7) {
        this.pages.push(...pagesArrayCreator(this.pageNumber, result.pages))
      } else {
        for (let i = 1; i <= result.pages; i++) {
          this.pages?.push(i)
        }
      }
      console.log(result.data)
    })
  }

  constructor(private route: ActivatedRoute, private apiService: DataGrabberService, private titleService: Title) {
  }


}
