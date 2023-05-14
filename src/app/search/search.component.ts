import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  labels: string[] = [];
  labelObj: any;
  @ViewChild('modal') modal: ElementRef | undefined;
  @ViewChild('filtersFlyOut') filtersFlyOut: ElementRef | undefined;
  close(isFlyOut: boolean) {
    if (isFlyOut) {
      let filtersFlyOut = this.filtersFlyOut?.nativeElement
      filtersFlyOut.style.display = 'none'
    }
    else {
      let modal = this.modal?.nativeElement
      modal.style.display = 'none'
    }
  }

  constructor(private apiService: DataGrabberService) {  }

  showFiltersFlyOut() {
    console.log("Filter shown")
    let filtersFlyOut = this.filtersFlyOut?.nativeElement
    filtersFlyOut.style.display = 'block'
  }

  newLabel() {
    let modal = this.modal?.nativeElement
    modal.style.display = 'block'
    this.loadLabels()
  }

  removeLabels(currentLabel: any) {
    let arrayIndex = this.labels.indexOf(currentLabel)
    if (arrayIndex > -1) {
      this.labels.splice(arrayIndex, 1)
    }
  }

  loadLabels() {
    let objData: any;
    this.apiService.getData(serverAddress + "/labels/").subscribe(res => {
      objData = res
      this.labelObj = objData.labels
    })
  }


  addLabelToArray(label: string) {
    if (!this.labels.includes(label)){
      this.labels.push(label)
    }
  }
}
