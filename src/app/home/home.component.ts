import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  apiDataObj: any;
  recommendationData: any;
  pageNumber: string = '1';
  secondDataSet: any;
  @ViewChild('recommendationTitle') recommendationTitle: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private apiService: DataGrabberService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          if (params['page'] != null) {
            this.pageNumber = params['page'];
          }
        }
      );
  }

  ngAfterViewInit(): void {
    if (this.pageNumber == '1') {
      this.apiService.getData(serverAddress + "/recom/").subscribe(res => {
        this.apiDataObj = res
        this.recommendationData = this.apiDataObj.data
      })
    }

    else {
      this.recommendationData = []
      let recommTitle = this.recommendationTitle?.nativeElement
      recommTitle.style.display = 'none'
    }

    let secondDataSetObj: any;
    this.apiService.getData(serverAddress + "/library/?page=" + this.pageNumber).subscribe(res => {
      secondDataSetObj = res
      this.secondDataSet = secondDataSetObj.data
    })
  }
}
