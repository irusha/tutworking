import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-labels-editor',
  templateUrl: './labels-editor.component.html',
  styleUrls: ['./labels-editor.component.css']
})
export class LabelsEditorComponent implements OnInit, AfterViewInit {
  isEditingMode: boolean = false;
  @Input() labels: any;
  @Input() videoId: any;
  prevLabels: string[] = [];
  @ViewChild('labelChanges') labelChanges: ElementRef | undefined;
  @ViewChild('labelInput') labelInput: ElementRef | undefined;
  @ViewChild('newBtnText') newBtnText: ElementRef | undefined;
  @ViewChild('newLabelButton') newLabelButton: ElementRef | undefined;
  @ViewChild('inputText') inputText: ElementRef | undefined;
  @ViewChild('newBtn') newBtn: ElementRef | undefined;
  @ViewChild('cancel') cancel: ElementRef | undefined;
  @ViewChild('modal') modal: ElementRef | undefined;
  @ViewChildren('labelClose') labelItem: any;
  isNewLabelAlreadyClicked: boolean = false;
  isEditingCancelled = false
  labelObj: any;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  close() {
    this.isNewLabelAlreadyClicked = false
    let modal = this.modal?.nativeElement
    modal.style.display = 'none'
    let labelInput = this.labelInput?.nativeElement
    let newBtnText = this.newBtnText?.nativeElement
    labelInput.style.display = 'none'
    newBtnText.style.display = 'flex'
    this.labelItem._results.forEach((currentItem: ElementRef) => {
      let item = currentItem.nativeElement
      item.style.visibility = 'visible'
    })
  }

  removeLabels(currentLabel: any) {
    let arrayIndex = this.labels.indexOf(currentLabel)
    if (arrayIndex > -1) {
      this.labels.splice(arrayIndex, 1)
    }
  }

  constructor(private apiService: DataGrabberService) {  }

  cancelEditing() {
    let labelInput = this.labelInput?.nativeElement
    let newBtnText = this.newBtnText?.nativeElement
    labelInput.style.display = 'none'
    newBtnText.style.display = 'flex'
    this.isEditingCancelled = true
    this.isNewLabelAlreadyClicked = false
    console.log("ok")
  }

  doneEditing() {
    let inputText = this.inputText?.nativeElement

    if (inputText.value == "") {
      this.cancelEditing()
    }

    else {
      if (!this.labelObj.includes(inputText.value)) {
        this.labelObj.push(inputText.value)
      }

      this.cancelEditing()
    }
  }

  addLabelToArray(label: any) {
    if (!this.labels.includes(label)){
      this.labels.push(label)
      this.labelItem.last.nativeElement.style.visibility = 'visible'
    }

  }

  newLabelSwitch() {
    let labelInput = this.labelInput?.nativeElement
    let newBtnText = this.newBtnText?.nativeElement
    if (this.isEditingCancelled) {
      this.isEditingCancelled = false
    }
    else {
      if (!this.isNewLabelAlreadyClicked) {
        this.isNewLabelAlreadyClicked = true
        labelInput.style.display = 'flex'
        newBtnText.style.display = 'none'
      }
    }

  }

  allowEditing() {
    let labelChangeBtn = this.labelChanges?.nativeElement
    let newBtn = this.newBtn?.nativeElement
    let cancelBtn = this.cancel?.nativeElement

    this.prevLabels = [...this.labels]

    if (!this.isEditingMode) {
      this.isEditingMode = true
      labelChangeBtn.innerText = 'Save'
      labelChangeBtn.classList.remove('btn-primary')
      cancelBtn.style.visibility = 'visible'
      labelChangeBtn.classList.add('btn-success')
      newBtn.style.display = 'flex'
      this.labelItem._results.forEach((currentItem: ElementRef) => {
        let item = currentItem.nativeElement
        item.style.visibility = 'visible'
      })
    } else {
      this.prevLabels = [...this.labels]

      this.saveLabels()
      this.cancelFunction()
    }
  }

  saveLabels() {
    let str: string = ''
    this.labels.forEach((label: string) => {
      str += '&labels=' + encodeURIComponent(label)
    })

    let url = serverAddress + "/labels/?video-id=" + this.videoId + str
    this.apiService.getData(url).subscribe()
    console.log(url)
  }

  cancelFunction() {
    let labelChangeBtn = this.labelChanges?.nativeElement
    let newBtn = this.newBtn?.nativeElement
    let cancelBtn = this.cancel?.nativeElement

    this.labels = [...this.prevLabels]

    labelChangeBtn.classList.add('btn-primary')
    cancelBtn.style.visibility = 'hidden'
    labelChangeBtn.innerText = 'Edit'
    this.isEditingMode = false
    labelChangeBtn.classList.remove('btn-success')
    newBtn.style.display = 'none'
    this.labelItem._results.forEach((currentItem: ElementRef) => {
      let item = currentItem.nativeElement
      item.style.visibility = 'hidden'
    })
  }

  newLabel() {
    let modal = this.modal?.nativeElement
    modal.style.display = 'block'
    this.loadLabels()
  }

  loadLabels() {
    let objData: any;
    this.apiService.getData(serverAddress + "/labels/").subscribe(res => {
      objData = res
      this.labelObj = objData.labels
    })
  }

}
