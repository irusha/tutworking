import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataGrabberService} from "./data-grabber.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {angularAddress, serverAddress} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'HomeHub';
  address: string | undefined;


  constructor(private apiService: DataGrabberService) {  }

  ngOnInit(): void {
    this.address = angularAddress
  }

}
