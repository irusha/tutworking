import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {Title} from "@angular/platform-browser";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements AfterViewInit, OnInit {
  query: string = '';
  searchData: any;
  filters: any = []

  ngAfterViewInit(): void {
    this.titleService.setTitle('Search results: ' + this.query + ' - HomeHub')
  }

  buildString(filters: any, query: string) {
    let str = '/search/'
    str += '?q=' + encodeURIComponent(query)
    for (let i = 0; i < filters.length; i++) {
      str += '&filter=' + encodeURIComponent(filters[i])
    }
    return str
  }

  ngOnInit() {
    let queries: any = []

    this.route.queryParams
      .subscribe(params => {
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

    this.apiService.getData(serverAddress + this.buildString(this.filters, this.query)).subscribe(res => {
      let result: any = res
      this.searchData = result.data
      console.log(result.data)
    })
  }

  constructor(private route: ActivatedRoute, private apiService: DataGrabberService, private titleService: Title) {
  }
}
