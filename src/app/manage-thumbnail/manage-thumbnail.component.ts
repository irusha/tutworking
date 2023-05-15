import {Component, Input} from '@angular/core';
import {angularAddress, serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-manage-thumbnail',
  templateUrl: './manage-thumbnail.component.html',
  styleUrls: ['./manage-thumbnail.component.css']
})
export class ManageThumbnailComponent {
  address: string = angularAddress;
  @Input() videoThumbObj: any
}
