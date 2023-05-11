import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from "@angular/core";
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements AfterViewInit, OnInit {
  @ViewChild('files') files: ElementRef | undefined;
  @ViewChild('uploadBtn') uploadBtn: ElementRef | undefined;
  @ViewChild('newLabelBtn') newLabelBtn: ElementRef | undefined;
  @ViewChild('nameInput') nameInput: ElementRef | undefined;
  @ViewChild('modal') modal: ElementRef | undefined;
  @ViewChild('newBtn') newBtn: ElementRef | undefined;
  @ViewChild('cancel') cancel: ElementRef | undefined;
  @ViewChild('labelChanges') labelChanges: ElementRef | undefined;
  @ViewChild('loadingIndicator') loadingIndicator: ElementRef | undefined;
  @ViewChild('labelInput') labelInput: ElementRef | undefined;
  @ViewChild('newBtnText') newBtnText: ElementRef | undefined;
  @ViewChildren('labelClose') labelItem: any;
  @ViewChild('inputText') inputText: ElementRef | undefined;
  isNewLabelAlreadyClicked: boolean = false;
  isEditingCancelled = false
  labelObj: any;
  labels: string[] = [];
  failedFiles: any = {}
  uploadCompletedVisibility = false

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  uploadFunc() {
    let files = this.files?.nativeElement
    let nameElement = this.nameInput?.nativeElement
    let formData: FormData = new FormData()
    let loadingIndicator = this.loadingIndicator?.nativeElement
    loadingIndicator.style.visibility = 'visible'
    for (let i = 0; i < files.files.length; i++) {
      let currentFile = files.files[i]
      formData.append('file', currentFile)
    }

    this.labels.forEach(label => formData.append('labels', label))

    if (nameElement.value != "") {
      formData.append('name', nameElement.value)
    }
    let uploadBtn = this.uploadBtn?.nativeElement
    let newLabelBtn = this.newLabelBtn?.nativeElement
    newLabelBtn.disabled = true
    uploadBtn.disabled = true
    this.labelItem._results.forEach((currentItem: ElementRef) => {
      let item = currentItem.nativeElement
      item.style.visibility = 'hidden'
    })
    files.disabled = true
    nameElement.disabled = true

    this.apiService.postData(serverAddress + '/upload/', formData).subscribe(any => this.uploadData = any)
  }

  set uploadData(data: any) {
    let uploadBtn = this.uploadBtn?.nativeElement
    let nameElement = this.nameInput?.nativeElement
    let files = this.files?.nativeElement
    let loadingIndicator = this.loadingIndicator?.nativeElement
    let newLabelBtn = this.newLabelBtn?.nativeElement

    this.failedFiles = data.failedFiles
    console.log(data)
    uploadBtn.disabled = false
    files.disabled = false
    nameElement.value = ''
    files.value = null
    this.labels = []
    loadingIndicator.style.visibility = 'hidden'
    newLabelBtn.disabled = false
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
    let inputElement = this.inputText?.nativeElement
    if (this.isEditingCancelled) {
      this.isEditingCancelled = false
    }
    else {
      if (!this.isNewLabelAlreadyClicked) {
        this.isNewLabelAlreadyClicked = true
        labelInput.style.display = 'flex'
        inputElement.focus()
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
    let inputElement = this.inputText?.nativeElement
    inputElement.value = ''
  }

  addLabelToArray(label: any) {
    if (!this.labels.includes(label)){
      this.labels.push(label)
    }

  }

  closeUploadComplete() {

  }

  closeLabelSelector() {
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
