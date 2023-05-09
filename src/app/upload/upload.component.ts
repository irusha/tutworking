import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements AfterViewInit, OnInit {
  @ViewChild('files') files: ElementRef | undefined;
  @ViewChild('uploadedMsg') uploadedMsg: ElementRef | undefined;
  @ViewChild('uploadBtn') uploadBtn: ElementRef | undefined;
  @ViewChild('nameInput') nameInput: ElementRef | undefined;
  @ViewChild('modal') modal: ElementRef | undefined;
  @ViewChild('newBtn') newBtn: ElementRef | undefined;
  @ViewChild('cancel') cancel: ElementRef | undefined;
  @ViewChild('labelChanges') labelChanges: ElementRef | undefined;
  @ViewChild('labelInput') labelInput: ElementRef | undefined;
  @ViewChild('newBtnText') newBtnText: ElementRef | undefined;
  @ViewChildren('labelClose') labelItem: any;
  @ViewChild('inputText') inputText: ElementRef | undefined;
  isNewLabelAlreadyClicked: boolean = false;
  isEditingCancelled = false
  labelObj: any;
  labels: string[] = [];

  uploadFunc() {
    let files = this.files?.nativeElement.files
    let nameElement = this.nameInput?.nativeElement
    let formData: FormData = new FormData()
    for (let i = 0; i < files.length; i++) {
      let currentFile = files[i]
      formData.append('file', currentFile)
    }

    this.labels.forEach(label => formData.append('labels', label))

    if (nameElement.value != "") {
      formData.append('name', nameElement.value)
    }

    this.apiService.postData(serverAddress + '/upload/', formData).subscribe(any => this.uploadData = any)
  }

  set uploadData(data: any) {
    console.log(data)
    let uploadedMsg = this.uploadedMsg?.nativeElement
    uploadedMsg.style.disabled = false
  }

  removeLabels(currentLabel: any) {
    let arrayIndex = this.labels.indexOf(currentLabel)
    if (arrayIndex > -1) {
      this.labels.splice(arrayIndex, 1)
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
  cancelEditing() {
    let labelInput = this.labelInput?.nativeElement
    let newBtnText = this.newBtnText?.nativeElement
    labelInput.style.display = 'none'
    newBtnText.style.display = 'flex'
    this.isEditingCancelled = true
    this.isNewLabelAlreadyClicked = false
  }

  addLabelToArray(label: any) {
    if (!this.labels.includes(label)){
      this.labels.push(label)
    }

  }

  close() {
    this.isNewLabelAlreadyClicked = false
    let modal = this.modal?.nativeElement
    modal.style.display = 'none'
  }
  newLabel() {
    let modal = this.modal?.nativeElement
    modal.style.display = 'block'
  }

  filesSelected() {
    let files = this.files?.nativeElement.files
    let nameInput = this.nameInput?.nativeElement
    let uploadBtn = this.uploadBtn?.nativeElement

    nameInput.disabled = files.length != 1;
    uploadBtn.disabled = files.length == 0;
  }

  constructor(private apiService: DataGrabberService){
  }

  ngOnInit() {
    let objData: any;
    this.apiService.getData(serverAddress + "/labels/").subscribe(res => {
      objData = res
      this.labelObj = objData.labels
    })
  }

  ngAfterViewInit(): void {
  }
}
