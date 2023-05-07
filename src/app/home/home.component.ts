import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  apiDataObj: any;
  apiData: any;

  secondDataSet: any;
  secondDataSetObj: any;

  constructor(private apiService: DataGrabberService) {  }

  ngOnInit(): void {
    this.apiService.getData(serverAddress + "/recom/").subscribe(res => {
      this.apiDataObj = res
      this.apiData = this.apiDataObj.data
    })
  }

  ngAfterViewInit(): void {
    this.apiService.getData(serverAddress + "/library/?page=1").subscribe(res => {
      this.secondDataSetObj = res
      this.secondDataSet = this.secondDataSetObj.data
    })
  }
}
