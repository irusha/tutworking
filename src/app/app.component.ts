import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataGrabberService} from "./data-grabber.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'HomeHub';
  apiDataObj: any;
  apiData: any;
  address: string | undefined;

  secondDataSet: any;
  secondDataSetObj: any;

  constructor(private apiService: DataGrabberService) {  }

  ngOnInit(): void {
    this.address = "http://" + window.location.host.split(':')[0]
    this.apiService.getData(this.address + ":5000/recom/").subscribe(res => {
      this.apiDataObj = res
      this.apiData = this.apiDataObj.data
    })
  }

  ngAfterViewInit(): void {
    this.apiService.getData(this.address + ":5000/library/?page=1").subscribe(res => {
      this.secondDataSetObj = res
      this.secondDataSet = this.secondDataSetObj.data
    })
  }
}
