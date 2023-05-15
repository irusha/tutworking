import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {angularAddress, serverAddress} from "../../environments/environment";
import {pagesArrayCreator} from "../common-methods";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  videos: any;
  urlFormat = angularAddress + '/manage/?page='
  address = angularAddress
  maxPages: any;
  pages: number[] = [];
  pageNumber: number = 1;
  constructor(private route: ActivatedRoute, private apiService: DataGrabberService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          if (params['page'] != null) {
            this.pageNumber = parseInt(params['page']);
            if (isNaN(this.pageNumber)) {
              this.pageNumber = 1
            }
          }
        }
      );

    let secondDataSetObj: any;
    this.apiService.getData(serverAddress + "/library/?max=24&page=" + this.pageNumber).subscribe(res => {
      secondDataSetObj = res
      this.videos = secondDataSetObj.data
      this.maxPages = secondDataSetObj.pages
      if (secondDataSetObj.pages > 7) {
        this.pages.push(...pagesArrayCreator(this.pageNumber, secondDataSetObj.pages))
      } else {
        for (let i = 1; i <= secondDataSetObj.pages; i++) {
          this.pages?.push(i)
        }
      }
    })
  }


}
